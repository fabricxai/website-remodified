'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AMBER, INK, SPINES } from '@/lib/data';

interface Props {
  reduced: boolean;
  /** strand colour for the non-amber strands — ink in light, off-white in dark */
  ink?: string;
  onRevealed: () => void;
  onFallback: () => void;
}

interface Strand {
  a: THREE.Vector3; b: THREE.Vector3;
  target: THREE.Vector3[]; seed: THREE.Vector3[]; pts: THREE.Vector3[];
  mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; si: number;
}

/**
 * The hero "weave": eight tube strands that drift from a loose field into the
 * FabricX mark, then unravel again as the hero scrolls away. Ported 1:1 from
 * the original Three.js scene (r128 API, compatible with current three).
 */
export default function HeroWeave({ reduced, onRevealed, onFallback, ink = INK }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const inkMats = useRef<THREE.MeshBasicMaterial[]>([]);

  useEffect(() => { inkMats.current.forEach((m) => m.color.set(ink)); }, [ink]);
  const cbs = useRef({ onRevealed, onFallback });
  cbs.current = { onRevealed, onFallback };

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    } catch {
      cbs.current.onFallback();
      return;
    }
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory && nav.deviceMemory < 2) {
      renderer.dispose();
      cbs.current.onFallback();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    cam.position.set(0, 0, 6.4);
    const group = new THREE.Group();
    scene.add(group);

    const S = 0.031, CX = 49.5, CY = 52.5, P = 26;
    const map = (x: number, y: number) => new THREE.Vector3((x - CX) * S, -(y - CY) * S, 0);
    const rnd = (n: number) => (Math.sin(n * 127.1) * 43758.5453) % 1;

    const strands: Strand[] = SPINES.map((sp, si) => {
      const a = map(sp[0], sp[1]), b = map(sp[2], sp[3]);
      const target: THREE.Vector3[] = [], seed: THREE.Vector3[] = [];
      for (let i = 0; i < P; i++) {
        const u = i / (P - 1);
        target.push(new THREE.Vector3().lerpVectors(a, b, u));
        seed.push(new THREE.Vector3(rnd(si * 9 + i * 3.1), rnd(si * 5 + i * 7.7 + 2), rnd(si * 3 + i * 2.3 + 5)));
      }
      const mat = new THREE.MeshBasicMaterial({ color: sp[4] ? AMBER : ink, transparent: true, opacity: 1 });
      if (!sp[4]) inkMats.current.push(mat);
      const mesh = new THREE.Mesh(new THREE.BufferGeometry(), mat);
      group.add(mesh);
      return { a, b, target, seed, mesh, mat, si, pts: target.map((v) => v.clone()) };
    });

    // ambient loose threads that never join the mark
    const amb = new THREE.Group();
    group.add(amb);
    for (let i = 0; i < 14; i++) {
      const pts: THREE.Vector3[] = [];
      const ox = (rnd(i * 3.3) - 0.5) * 7, oy = (rnd(i * 5.1 + 1) - 0.5) * 5, oz = -1.6 - rnd(i * 2.2 + 3) * 2.4;
      for (let j = 0; j < 8; j++) {
        pts.push(new THREE.Vector3(ox + j * 0.42 + rnd(i + j) * 0.3, oy + Math.sin(j * 0.9 + i) * 0.34, oz + rnd(i * j + 7) * 0.5));
      }
      const g = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 22, 0.008, 4, false);
      const m = new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? AMBER : ink, transparent: true, opacity: 0.16 });
      if (i % 3 !== 0) inkMats.current.push(m);
      amb.add(new THREE.Mesh(g, m));
    }

    const t0 = performance.now();
    let heroScroll = 0, mx = 0, my = 0, lw = 0, lh = 0, raf = 0, revealed = false, scrollRaf = 0;

    const resize = () => {
      const w = cv.clientWidth || 1, h = cv.clientHeight || 1;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.fov = w < 520 ? 46 : 38;
      cam.updateProjectionMatrix();
    };

    const draw = (w: number, el: number) => {
      const loose = 1 - w;
      strands.forEach((s) => {
        const pts = s.pts;
        const spread = 1 + loose * 2.1;
        const mid = new THREE.Vector3().addVectors(s.a, s.b).multiplyScalar(0.5);
        for (let i = 0; i < pts.length; i++) {
          const u = i / (pts.length - 1);
          const t = s.target[i], sd = s.seed[i];
          const bow = Math.sin(u * Math.PI);
          pts[i].set(
            mid.x + (t.x - mid.x) * spread + (sd.x - 0.5) * 2.6 * loose + Math.sin(el * 0.9 + u * 7 + s.si) * 0.26 * loose * bow,
            mid.y + (t.y - mid.y) * spread + (sd.y - 0.5) * 2.2 * loose + Math.cos(el * 1.1 + u * 6 + s.si * 2) * 0.26 * loose * bow,
            (sd.z - 0.5) * 2.4 * loose + Math.sin(el * 0.7 + u * 5 + s.si) * 0.34 * loose * bow,
          );
        }
        const curve = new THREE.CatmullRomCurve3(pts);
        const radius = 0.028 - 0.012 * loose;
        const geo = new THREE.TubeGeometry(curve, 40, Math.max(0.008, radius), 5, false);
        s.mesh.geometry.dispose();
        s.mesh.geometry = geo;
        s.mat.opacity = 0.28 + 0.72 * w;
      });
      amb.rotation.z = el * 0.012;
      amb.children.forEach((c) => {
        ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0.16 * (0.35 + 0.65 * (1 - w)) + 0.04;
      });
      const rx = my * 0.10, ry = mx * 0.10;
      group.rotation.x += (rx - group.rotation.x) * 0.06;
      group.rotation.y += (ry - group.rotation.y) * 0.06;
      group.position.y = -heroScroll * 0.9;
      renderer.render(scene, cam);
    };

    const anim = () => {
      raf = requestAnimationFrame(anim);
      const r = cv.getBoundingClientRect();
      if (r.bottom < -40 || r.top > window.innerHeight + 40) return;
      if (cv.clientWidth !== lw || cv.clientHeight !== lh) { lw = cv.clientWidth; lh = cv.clientHeight; resize(); }
      const el = (performance.now() - t0) / 1000;
      const build = Math.min(1, Math.max(0, (el - 0.25) / 2.4));
      const eased = 1 - Math.pow(1 - build, 3);
      const weave = Math.max(0, eased - heroScroll * 1.35);
      draw(weave, el);
      if (build >= 1 && !revealed) { revealed = true; cbs.current.onRevealed(); }
    };

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const tickScroll = () => {
      scrollRaf = 0;
      const r = cv.getBoundingClientRect();
      heroScroll = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height * 0.9)));
    };
    const onScroll = () => { if (!scrollRaf) scrollRaf = requestAnimationFrame(tickScroll); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    if (!reduced) window.addEventListener('mousemove', onMove, { passive: true });

    resize();
    if (reduced) { draw(1, 0); cbs.current.onRevealed(); }
    else raf = requestAnimationFrame(anim);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('mousemove', onMove);
      strands.forEach((s) => { s.mesh.geometry.dispose(); s.mat.dispose(); });
      amb.children.forEach((c) => { const m = c as THREE.Mesh; m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      renderer.dispose();
      inkMats.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />;
}
