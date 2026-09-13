import type { JSX, ReactNode } from 'react';
import type { DocKey } from './papers';

/**
 * The raw papers Marbim reads — plain HTML sheets, no images. Every value that
 * ends up in the extracted table is wrapped in `.src` so it lights up once read;
 * the one value Marbim is unsure about is `.src.warn`.
 */
const Src = ({ children, warn = false }: { children: ReactNode; warn?: boolean }) => <span className={'src' + (warn ? ' warn' : '')}>{children}</span>;

function PurchaseOrder() {
  return (
    <div className="mb-paper po">
      <div className="ph">
        <div><div className="big">PURCHASE ORDER</div><div className="co"><Src>Nordic Apparel AB</Src> · Sveavägen 44, Stockholm, <Src>Sweden</Src></div></div>
        <div className="r"><div>PO No. <b>NA-2044</b></div><div>Date 18 Aug 2026</div><div>Page 1 / 2</div></div>
      </div>
      <div className="blk"><b>Supplier:</b> Meghna Knitwear Ltd, Plot 12, Konabari, Gazipur, Bangladesh</div>
      <table>
        <thead><tr><th>Style</th><th>Description</th><th className="n">Qty (pcs)</th><th className="n">Unit</th><th className="n">Amount</th></tr></thead>
        <tbody>
          <tr><td><Src>NA-2044</Src></td><td><Src>Men’s piqué polo</Src>, 220 GSM, navy</td><td className="n"><Src>36,000</Src></td><td className="n"><Src>$4.78</Src></td><td className="n">$172,080.00</td></tr>
        </tbody>
      </table>
      <div className="blk"><b>Size breakdown:</b> <Src>S 5,562 · M 16,578 · L 11,016 · XL 2,844</Src></div>
      <div className="grid3">
        <div><b>Ship date</b><br /><Src>12 Nov 2026</Src></div>
        <div><b>Port of loading</b><br /><Src>Chattogram</Src></div>
        <div><b>Terms</b><br /><Src>FOB</Src> · L/C at sight</div>
      </div>
      <div className="foot"><span className="sig">A. Lindqvist</span><span>Authorised signatory · Nordic Apparel AB</span></div>
    </div>
  );
}

const LC_LINES: [string, ReactNode][] = [
  [':27:', '1/1'], [':40A:', 'IRREVOCABLE'], [':20:', <Src key="a">021/26</Src>], [':31C:', '260825'],
  [':31D:', <><Src key="b">261125 DHAKA</Src></>], [':50:', 'NORDIC APPAREL AB, STOCKHOLM'], [':59:', 'MEGHNA KNITWEAR LTD, GAZIPUR, BANGLADESH'],
  [':32B:', <Src key="c">USD172080,00</Src>], [':39A:', <Src key="d">05/05</Src>], [':41A:', 'ANY BANK BY NEGOTIATION'], [':42C:', <Src key="e">AT SIGHT</Src>],
  [':44E:', <Src key="f">CHATTOGRAM</Src>], [':44F:', <Src key="g">GOTHENBURG</Src>], [':44C:', <Src key="h" warn>261110</Src>],
  [':45A:', '36000 PCS MENS PIQUE POLO 220 GSM AS PER PO NA-2044'], [':43P:', 'NOT ALLOWED'], [':43T:', 'NOT ALLOWED'],
];

function LetterOfCredit() {
  return (
    <div className="mb-paper lc">
      <div className="ph"><div><div className="big">MT700 · ISSUE OF A DOCUMENTARY CREDIT</div><div className="co">Issuing bank: <Src>Skandia Trade Bank, Stockholm</Src> · Advising bank: Dhaka</div></div></div>
      <div className="swift">
        {LC_LINES.map(([tag, v]) => <div key={tag}><span className="tag">{tag}</span><span>{v}</span></div>)}
      </div>
      <div className="foot"><span>Authenticated · MAC OK</span><span>{"-}"}</span></div>
    </div>
  );
}

function TechPack() {
  return (
    <div className="mb-paper tp">
      <div className="ph">
        <div><div className="big">TECH PACK</div><div className="co">Style NA-2044 · <Src>Men’s piqué polo</Src> · Season <Src>SS27</Src></div></div>
        <div className="r"><div>Rev 3</div><div>Sample size M</div></div>
      </div>
      <div className="grid3">
        <div><b>Fabric</b><br /><Src>100% cotton piqué · 220 GSM</Src></div>
        <div><b>Colour</b><br /><Src>Navy · 19-3933 TCX</Src></div>
        <div><b>Sizes</b><br /><Src>S · M · L · XL</Src></div>
      </div>
      <table>
        <thead><tr><th>POM</th><th className="n">S</th><th className="n">M</th><th className="n">L</th><th className="n">XL</th><th className="n">Tol</th></tr></thead>
        <tbody>
          <tr><td>Chest ½, 1″ below armhole</td><td className="n">50</td><td className="n"><Src>52</Src></td><td className="n">54</td><td className="n">56</td><td className="n"><Src>±1</Src></td></tr>
          <tr><td>Body length from HPS</td><td className="n">70</td><td className="n">72</td><td className="n">74</td><td className="n">76</td><td className="n">±1</td></tr>
          <tr><td>Sleeve length</td><td className="n">22</td><td className="n">23</td><td className="n">24</td><td className="n">25</td><td className="n">±0.5</td></tr>
        </tbody>
      </table>
      <div className="grid3">
        <div><b>Trims</b><br />3 × button 18L · rib collar &amp; cuff</div>
        <div><b>Wash care</b><br /><Src warn>— (blank)</Src></div>
        <div><b>Labels</b><br />Main + size + care · TBC</div>
      </div>
    </div>
  );
}

function Challan() {
  return (
    <div className="mb-paper challan" lang="bn">
      <div className="hand">
        <div className="hl h1">মেঘনা ডাইং <span className="rt">চালান নং <Src>১১৮৭</Src></span></div>
        <div className="hl"><Src>নারায়ণগঞ্জ</Src> <span className="rt">তারিখ <Src>০৩/০৯/২৬</Src></span></div>
        <div className="hl">প্রাপক — মেঘনা নিটওয়্যার, গাজীপুর</div>
        <div className="hl">মাল — <Src>নেভি পিকে ২২০ জিএসএম</Src></div>
        <div className="hl">রোল — <s>৪১</s> <Src warn>৪২</Src> টা</div>
        <div className="hl">ওজন — <Src>১০৩৮ কেজি</Src></div>
        <div className="hl sig">বুঝিয়া পাইলাম — রফিক</div>
      </div>
    </div>
  );
}

export const RAW: Record<DocKey, () => JSX.Element> = { po: PurchaseOrder, lc: LetterOfCredit, tp: TechPack, challan: Challan };
