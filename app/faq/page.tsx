// FAQ page — H4ab design language port from mockups/faq-page.html
// Metadata: see ./layout.tsx (PR #15)
// Anchored deep-links: 18 question IDs across 4 sections (PR #20)
// Locked policy values (PR #12): 7-day cancel, 3-month freeze, 15% student, 12h class cancel
//
// Server Component — uses native <details> elements for accordion (no client state).
// Scoped styles via <style> tag on a .faq-page wrapper, matches mockup chrome.

import {
  ADDRESS_LINE,
  ADDRESS_LOCALITY,
  EMAIL_GENERAL,
  PHONE_FAQ_DISPLAY,
} from "@/lib/site-contact";

const styles = `
.faq-page{
  background:#0E0B0B;
  color:#E8DDD3;
  font-family:var(--font-body),var(--font-barlow),system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;
}
.faq-page *{box-sizing:border-box}

/* ───────── shared section chrome ───────── */
.faq-page .ab-section{
  background:#0E0B0B;
  color:#E8DDD3;
  position:relative;
  padding:80px 0 88px;
  overflow:hidden;
}
.faq-page .ab-section::after{
  content:"";
  position:absolute; inset:0;
  pointer-events:none;
  opacity:.08;
  mix-blend-mode:overlay;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  z-index:1;
}
.faq-page .ab-wrap{
  max-width:1280px;
  margin:0 auto;
  padding:0 56px;
  position:relative;
  z-index:2;
}
.faq-page .ab-edge-top, .faq-page .ab-edge-bot{
  display:flex; align-items:center; gap:18px;
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.30em;
  font-size:10px; font-weight:600;
  color:#E8DDD3; opacity:.85;
  padding-bottom:18px; margin-bottom:42px;
  border-bottom:1px solid rgba(232,221,211,.45);
}
.faq-page .ab-edge-bot{
  border-bottom:0;
  border-top:1px solid rgba(232,221,211,.45);
  padding:18px 0 0; margin-bottom:0; margin-top:48px;
}
.faq-page .ab-edge-folio{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  text-transform:none; letter-spacing:.02em;
  font-size:13px; color:#C9A2A2;
}
.faq-page .ab-edge-line{ flex:1; height:1px; background:rgba(232,221,211,.35); }
.faq-page .ab-edge-meta{
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.30em;
  font-size:10px; font-weight:600;
  color:#E8DDD3; opacity:.7;
}
.faq-page .ab-edge-bot .ab-edge-meta{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  text-transform:none; letter-spacing:.02em;
  font-size:13px; color:#C9A2A2; opacity:1;
}

/* section header */
.faq-page .ab-shead{
  display:grid;
  grid-template-columns:1fr auto;
  align-items:flex-end;
  gap:48px;
  margin-bottom:44px;
  padding-bottom:22px;
  border-bottom:1px solid rgba(232,221,211,.55);
}
.faq-page .ab-shead-l{ display:flex; align-items:baseline; gap:22px; flex-wrap:wrap; }
.faq-page .ab-shead-num{
  font-family:var(--font-bebas),sans-serif;
  font-size:54px; line-height:.9;
  color:#7D1E1E; letter-spacing:.02em;
  text-shadow:0 0 28px rgba(163,31,31,.22);
}
.faq-page .ab-shead-title{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:66px; line-height:.95;
  color:#F0E6DB; letter-spacing:-0.005em;
  margin:0;
}
.faq-page .ab-shead-title em{
  font-style:italic; color:#C9A2A2;
  font-weight:400; padding:0 2px;
}
.faq-page .ab-shead-sub{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:400;
  font-size:18px; color:#C9A2A2;
  letter-spacing:.01em; padding-bottom:8px;
}
.faq-page .ab-shead-r{
  display:flex; align-items:center; gap:18px;
  padding-bottom:14px; justify-self:end;
}
.faq-page .ab-shead-kicker{
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.34em;
  font-size:11px; font-weight:700;
  color:#E8DDD3;
}
.faq-page .ab-shead-rule{
  display:inline-block; width:38px; height:1px;
  background:#E8DDD3; opacity:.55;
}
.faq-page .ab-shead-index{
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.30em;
  font-size:10px; font-weight:600;
  color:#C9A2A2;
}

/* hero */
.faq-page .faq-hero{
  background:#0E0B0B;
  color:#E8DDD3;
  min-height:600px;
  position:relative;
  overflow:hidden;
}
.faq-page .faq-hero::before{
  content:"";
  position:absolute;
  left:-280px; bottom:-320px;
  width:900px; height:900px;
  background:radial-gradient(circle at 50% 50%, rgba(125,30,30,.34) 0%, rgba(125,30,30,.13) 30%, rgba(125,30,30,0) 65%);
  pointer-events:none; z-index:0;
}
.faq-page .faq-hero::after{
  content:"";
  position:absolute;inset:0;
  pointer-events:none;
  opacity:.12;
  mix-blend-mode:overlay;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  z-index:1;
}
.faq-page .faq-hero .hero-wrap{
  max-width:1280px;
  margin:0 auto;
  padding:54px 56px 64px;
  position:relative;
  z-index:2;
}
.faq-page .faq-hero .rail-top{
  display:grid;
  grid-template-columns:1fr 1fr;
  align-items:baseline;
  gap:32px;
  padding-bottom:16px;
  border-bottom:1px solid rgba(232,221,211,.55);
}
.faq-page .faq-hero .folio{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:18px; color:#C9A2A2; letter-spacing:.02em;
}
.faq-page .faq-hero .folio sup{ font-size:10px; vertical-align:super; margin-left:1px; }
.faq-page .faq-hero .folio-slash{ margin:0 2px; opacity:.55; }
.faq-page .faq-hero .folio-b{ opacity:.5; }
.faq-page .faq-hero .rail-meta{
  justify-self:end;
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.28em;
  font-size:10.5px; font-weight:600;
  color:#E8DDD3; opacity:.85;
}
.faq-page .faq-hero .rail-sub{
  display:grid;
  grid-template-columns:1fr 1fr;
  padding:12px 0 6px;
}
.faq-page .faq-hero .kicker{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:15px; color:#C9A2A2; letter-spacing:.02em;
}
.faq-page .faq-hero .kicker-r{
  justify-self:end;
  display:inline-flex; align-items:center; gap:10px;
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.32em;
  font-size:10px; font-weight:600;
  color:#E8DDD3; opacity:.85;
}
.faq-page .faq-hero .kicker-r .sep{ opacity:.4; margin:0 2px; }
.faq-page .faq-hero .kicker-r .live-lbl{
  color:#E8DDD3; letter-spacing:.42em; font-weight:700;
}
@keyframes faq_pulse{
  0%{box-shadow:0 0 0 0 rgba(163,31,31,.6), 0 0 12px rgba(163,31,31,.7)}
  70%{box-shadow:0 0 0 10px rgba(163,31,31,0), 0 0 12px rgba(163,31,31,.4)}
  100%{box-shadow:0 0 0 0 rgba(163,31,31,0), 0 0 12px rgba(163,31,31,.7)}
}
.faq-page .ab-livedot{
  display:inline-block;
  width:7px; height:7px;
  border-radius:50%;
  background:#A31F1F;
  box-shadow:0 0 0 0 rgba(163,31,31,.7), 0 0 12px rgba(163,31,31,.7);
  animation:faq_pulse 1.6s ease-out infinite;
  position:relative; top:-1px;
}
.faq-page .faq-hero .anchor-block{
  margin-top:42px;
  display:grid;
  grid-template-columns:auto 1fr;
  align-items:flex-end;
  gap:48px;
  padding-bottom:18px;
}
.faq-page .faq-hero .anchor-side{
  display:flex; flex-direction:column; gap:6px;
  padding-bottom:46px;
  max-width:260px;
}
.faq-page .faq-hero .anchor-side-key{
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.34em;
  font-size:10.5px; font-weight:700;
  color:#7D1E1E;
}
.faq-page .faq-hero .anchor-side-line{
  display:block; width:38px; height:1px;
  background:#E8DDD3; opacity:.55; margin:6px 0;
}
.faq-page .faq-hero .anchor-side-note{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:17px; line-height:1.45;
  color:#C9A2A2; letter-spacing:.005em;
}
.faq-page .faq-hero .anchor-side-note em{ color:#F0E6DB; }
.faq-page .faq-hero .anchor-main{
  display:flex; flex-direction:column; align-items:flex-end; gap:10px;
}
.faq-page .faq-hero .anchor-overline{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:16px; color:#C9A2A2;
  letter-spacing:.05em;
}
.faq-page .faq-hero .anchor-overline strong{
  font-family:var(--font-barlow),sans-serif;
  font-style:normal;
  text-transform:uppercase; letter-spacing:.42em;
  font-size:11px; font-weight:700;
  color:#7D1E1E;
}
.faq-page .faq-hero .anchor-word{
  font-family:var(--font-bebas),var(--font-barlow),sans-serif;
  font-weight:400;
  font-size:clamp(72px,12vw,156px);
  line-height:.86;
  letter-spacing:-0.008em;
  color:#F0E6DB; margin:0;
  text-shadow:0 0 1px rgba(240,230,219,.4), 0 0 38px rgba(125,30,30,.18);
  text-align:right;
}
.faq-page .faq-hero .anchor-sub{
  display:flex; align-items:center; gap:14px;
  margin-top:4px;
}
.faq-page .faq-hero .anchor-sub-rule{
  display:block; width:120px; height:1px;
  background:#E8DDD3; opacity:.55;
}
.faq-page .faq-hero .anchor-sub-txt{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:22px; color:#C9A2A2;
  letter-spacing:.005em;
}
.faq-page .faq-hero .anchor-sub-txt strong{
  color:#F0E6DB; font-style:italic; font-weight:600;
}
.faq-page .faq-hero .hero-bot{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  align-items:baseline;
  gap:24px;
  margin-top:44px;
  padding-top:22px;
  border-top:1px solid rgba(232,221,211,.55);
}
.faq-page .faq-hero .hero-bot-cell{
  display:flex; flex-direction:column; gap:6px;
  padding-right:14px;
  border-right:1px solid rgba(232,221,211,.18);
  text-decoration:none;
}
.faq-page .faq-hero .hero-bot-cell:last-child{ border-right:0; padding-right:0; }
.faq-page .faq-hero .hero-bot-k{
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.34em;
  font-size:10px; font-weight:700;
  color:#7D1E1E;
}
.faq-page .faq-hero .hero-bot-v{
  font-family:var(--font-bebas),sans-serif;
  font-size:24px; line-height:1;
  color:#F0E6DB; letter-spacing:.02em;
}
.faq-page .faq-hero .hero-bot-v em{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:14px; color:#C9A2A2;
  letter-spacing:.005em; padding:0 4px;
}

/* accordion */
.faq-page .faq-list{
  display:flex; flex-direction:column;
  border-top:1px solid rgba(232,221,211,.30);
}
.faq-page .faq-q{
  background:#1A1A1A;
  border-bottom:1px solid rgba(232,221,211,.30);
  position:relative;
  scroll-margin-top:32px;
}
.faq-page .faq-q:hover{ background:#1F1B1B; }
.faq-page .faq-q[open]{
  background:linear-gradient(180deg, rgba(125,30,30,.06) 0%, #1A1A1A 28%);
}
.faq-page .faq-q[open] > .faq-q-head{
  border-bottom:1px solid rgba(232,221,211,.18);
}
.faq-page .faq-q-head{
  display:grid;
  grid-template-columns:48px 1fr 32px;
  align-items:center;
  gap:22px;
  padding:24px 28px;
  cursor:pointer;
  list-style:none;
  position:relative;
}
.faq-page .faq-q-head::-webkit-details-marker{ display:none; }
.faq-page .faq-q-head::marker{ display:none; content:""; }
.faq-page .faq-q-num{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:18px; color:#7D1E1E;
  letter-spacing:.02em; line-height:1;
  font-feature-settings:"tnum" 1;
}
.faq-page .faq-q-num em{ color:#C9A2A2; font-weight:400; padding:0 1px; }
.faq-page .faq-q-text{
  font-family:var(--font-bebas),sans-serif;
  font-size:22px; line-height:1.1;
  color:#F0E6DB; letter-spacing:.04em;
  text-transform:uppercase;
}
.faq-page .faq-q:not([open]) > .faq-q-head .faq-q-text{ color:#E8DDD3; }
.faq-page .faq-q-plus{
  display:inline-flex; align-items:center; justify-content:center;
  width:28px; height:28px;
  border:1px solid rgba(232,221,211,.55);
  background:rgba(125,30,30,.08);
  font-family:var(--font-bebas),sans-serif;
  font-size:20px; line-height:1;
  color:#E8DDD3;
  justify-self:end;
}
.faq-page .faq-q-plus::before{
  content:"+";
  display:block; margin-top:-1px;
}
.faq-page .faq-q[open] > .faq-q-head .faq-q-plus{
  background:#A31F1F;
  border-color:#A31F1F;
  color:#F0E6DB;
  box-shadow:0 0 14px rgba(163,31,31,.45);
}
.faq-page .faq-q[open] > .faq-q-head .faq-q-plus::before{
  content:"–";
  margin-top:-2px; font-weight:600;
}
.faq-page .faq-q-body{
  padding:8px 28px 30px 98px;
  display:grid; grid-template-columns:1fr;
  gap:16px;
}
.faq-page .faq-q-body p{
  font-family:var(--font-body),system-ui,sans-serif;
  font-weight:400;
  font-size:15px; line-height:1.6;
  color:#E8DDD3; opacity:.92;
  max-width:780px;
  letter-spacing:.005em;
}
.faq-page .faq-q-body p strong{
  font-weight:600; color:#F0E6DB;
}
.faq-page .faq-q-body p em{
  font-family:var(--font-cormorant),serif;
  font-style:italic; color:#C9A2A2;
  font-size:16px; padding:0 2px;
}
.faq-page .faq-q-body a{
  color:#C9A2A2; text-decoration:underline;
  text-decoration-color:rgba(201,162,162,.5);
}
.faq-page .faq-q-body ol,
.faq-page .faq-q-body ul{
  list-style:none;
  display:flex; flex-direction:column; gap:10px;
  padding:0; margin:0;
  max-width:780px;
}
.faq-page .faq-q-body ol li,
.faq-page .faq-q-body ul li{
  display:grid;
  grid-template-columns:32px 1fr;
  gap:14px; align-items:baseline;
  font-family:var(--font-body),system-ui,sans-serif;
  font-size:14.5px; line-height:1.55;
  color:#E8DDD3; opacity:.92;
}
.faq-page .faq-q-body ol{ counter-reset:faq-step; }
.faq-page .faq-q-body ol li{ counter-increment:faq-step; }
.faq-page .faq-q-body ol li::before{
  content:counter(faq-step,decimal-leading-zero);
  font-family:var(--font-bebas),sans-serif;
  font-size:18px; color:#A31F1F;
  letter-spacing:.02em;
  font-feature-settings:"tnum" 1;
}
.faq-page .faq-q-body ul li::before{
  content:""; display:block;
  width:14px; height:1px;
  background:#A31F1F;
  margin-top:9px; opacity:.85;
  box-shadow:0 0 6px rgba(163,31,31,.5);
}
.faq-page .faq-q-body strong.lead{
  display:inline-block;
  font-family:var(--font-bebas),sans-serif;
  font-weight:400;
  font-size:18px; letter-spacing:.04em;
  color:#F0E6DB;
  text-transform:uppercase;
  margin-right:8px;
}
.faq-page .faq-q-body code{
  font-family:var(--font-barlow),monospace;
  font-weight:600;
  font-size:11.5px; letter-spacing:.18em;
  text-transform:uppercase;
  color:#F0E6DB;
  border:1px solid rgba(232,221,211,.55);
  background:rgba(125,30,30,.08);
  padding:3px 8px 2px;
  vertical-align:1px;
  margin:0 2px;
}
.faq-page .faq-q-callout{
  display:flex; align-items:center; gap:18px;
  padding:14px 18px;
  border:1px solid rgba(232,221,211,.30);
  background:rgba(125,30,30,.06);
  max-width:780px;
}
.faq-page .faq-q-callout-k{
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.32em;
  font-size:10px; font-weight:700;
  color:#7D1E1E; white-space:nowrap;
}
.faq-page .faq-q-callout-v{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:16px; color:#F0E6DB;
  letter-spacing:.005em;
}
.faq-page .faq-q-callout-v strong{
  font-family:var(--font-bebas),sans-serif;
  font-style:normal;
  font-size:22px; letter-spacing:.02em;
  color:#F0E6DB; padding:0 4px;
  font-weight:400;
}

/* inline cta */
.faq-page .faq-inline-cta{
  display:grid;
  grid-template-columns:auto 1fr auto;
  align-items:center;
  gap:28px;
  padding:22px 28px;
  border:1px solid rgba(163,31,31,.55);
  background:linear-gradient(90deg, rgba(125,30,30,.16) 0%, rgba(125,30,30,.04) 100%);
  margin:24px 0;
}
.faq-page .faq-inline-cta-k{
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.34em;
  font-size:10.5px; font-weight:700;
  color:#7D1E1E;
}
.faq-page .faq-inline-cta-t{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:19px; color:#F0E6DB;
  letter-spacing:.005em; line-height:1.4;
}
.faq-page .faq-inline-cta-t em{ color:#C9A2A2; font-style:italic; }
.faq-page .faq-inline-cta-btn{
  display:inline-flex; align-items:center;
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.32em;
  font-size:11px; font-weight:700;
  color:#0E0B0B;
  background:#E8DDD3;
  padding:13px 22px 11px;
  border:1px solid #E8DDD3;
  line-height:1;
  text-decoration:none;
  box-shadow:0 6px 20px rgba(163,31,31,.18);
}
.faq-page .faq-inline-cta-btn:hover{
  background:#A31F1F; color:#F0E6DB; border-color:#A31F1F;
}

/* final cta */
.faq-page .faq-final{
  background:#0E0B0B;
  position:relative;
  padding:88px 0 96px;
  overflow:hidden;
  border-top:1px solid rgba(232,221,211,.30);
}
.faq-page .faq-final::before{
  content:"";
  position:absolute;
  right:-260px; top:-200px;
  width:700px; height:700px;
  background:radial-gradient(circle at 50% 50%, rgba(163,31,31,.20) 0%, rgba(163,31,31,.06) 30%, rgba(163,31,31,0) 65%);
  pointer-events:none; z-index:0;
}
.faq-page .faq-final::after{
  content:"";
  position:absolute; inset:0;
  pointer-events:none;
  opacity:.08;
  mix-blend-mode:overlay;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  z-index:1;
}
.faq-page .faq-final .ab-wrap{ position:relative; z-index:2; }
.faq-page .faq-final-head{
  display:grid;
  grid-template-columns:1fr auto;
  align-items:flex-end;
  gap:48px;
  margin-bottom:48px;
  padding-bottom:22px;
  border-bottom:1px solid rgba(232,221,211,.55);
}
.faq-page .faq-final-anchor{
  font-family:var(--font-bebas),sans-serif;
  font-size:clamp(56px,8vw,108px);
  line-height:.9;
  letter-spacing:.005em;
  color:#F0E6DB;
  text-shadow:0 0 1px rgba(240,230,219,.4), 0 0 38px rgba(125,30,30,.20);
  margin:0;
}
.faq-page .faq-final-sub{
  display:flex; flex-direction:column; align-items:flex-end;
  gap:8px; padding-bottom:14px; text-align:right;
}
.faq-page .faq-final-sub-k{
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.34em;
  font-size:11px; font-weight:700;
  color:#7D1E1E;
}
.faq-page .faq-final-sub-t{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:19px; line-height:1.4;
  color:#C9A2A2; max-width:340px;
}
.faq-page .faq-cta-pair{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:24px;
}
.faq-page .faq-cta-card{
  position:relative;
  display:grid;
  grid-template-rows:auto 1fr auto;
  gap:14px;
  padding:36px 36px 32px;
  border:1px solid rgba(232,221,211,.55);
  background:#1A1A1A;
  min-height:280px;
  text-decoration:none;
  color:inherit;
}
.faq-page .faq-cta-card-num{
  display:flex; align-items:baseline; gap:14px;
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:16px; color:#7D1E1E;
  letter-spacing:.02em;
}
.faq-page .faq-cta-card-num-rule{
  display:inline-block; width:48px; height:1px;
  background:#A31F1F; opacity:.85;
}
.faq-page .faq-cta-card-body{
  display:flex; flex-direction:column; gap:10px;
}
.faq-page .faq-cta-card-title{
  font-family:var(--font-bebas),sans-serif;
  font-size:48px; line-height:.95;
  color:#F0E6DB; letter-spacing:.02em;
  margin:0;
}
.faq-page .faq-cta-card-desc{
  font-family:var(--font-cormorant),serif;
  font-style:italic; font-weight:500;
  font-size:17px; line-height:1.5;
  color:#C9A2A2; max-width:420px;
}
.faq-page .faq-cta-card-desc strong{
  font-style:italic; font-weight:600;
  color:#F0E6DB;
}
.faq-page .faq-cta-card-link{
  display:flex; align-items:center; justify-content:space-between;
  gap:18px;
  padding:14px 18px;
  background:#E8DDD3;
  color:#0E0B0B;
  border:1px solid #E8DDD3;
  font-family:var(--font-barlow),sans-serif;
  text-transform:uppercase; letter-spacing:.30em;
  font-size:11px; font-weight:700;
  line-height:1;
  box-shadow:0 6px 20px rgba(163,31,31,.18);
}
.faq-page .faq-cta-card-link .arrow{
  font-family:var(--font-bebas),sans-serif;
  font-size:18px; letter-spacing:0;
  color:#7D1E1E;
}
.faq-page .faq-cta-card.is-primary{
  background:linear-gradient(180deg, rgba(125,30,30,.18) 0%, #1A1A1A 70%);
  border-color:rgba(163,31,31,.55);
}
.faq-page .faq-cta-card.is-primary .faq-cta-card-link{
  background:#A31F1F; color:#F0E6DB; border-color:#A31F1F;
  box-shadow:0 6px 24px rgba(163,31,31,.40);
}
.faq-page .faq-cta-card.is-primary .faq-cta-card-link .arrow{
  color:#F0E6DB;
}

/* responsive */
@media (max-width:900px){
  .faq-page .ab-wrap{ padding:0 28px; }
  .faq-page .faq-hero .hero-wrap{ padding:36px 28px 44px; }
  .faq-page .ab-shead{ grid-template-columns:1fr; gap:18px; }
  .faq-page .ab-shead-r{ justify-self:start; padding-bottom:0; }
  .faq-page .ab-shead-title{ font-size:44px; }
  .faq-page .ab-shead-num{ font-size:40px; }
  .faq-page .faq-hero .rail-top,
  .faq-page .faq-hero .rail-sub{ grid-template-columns:1fr; gap:12px; }
  .faq-page .faq-hero .rail-meta,
  .faq-page .faq-hero .kicker-r{ justify-self:start; }
  .faq-page .faq-hero .anchor-block{ grid-template-columns:1fr; gap:24px; }
  .faq-page .faq-hero .anchor-main{ align-items:flex-start; }
  .faq-page .faq-hero .anchor-word{ text-align:left; }
  .faq-page .faq-hero .hero-bot{ grid-template-columns:repeat(2,1fr); }
  .faq-page .faq-q-head{ grid-template-columns:32px 1fr 28px; gap:14px; padding:18px 18px; }
  .faq-page .faq-q-text{ font-size:18px; }
  .faq-page .faq-q-body{ padding:8px 18px 24px 18px; }
  .faq-page .faq-inline-cta{ grid-template-columns:1fr; gap:14px; padding:18px; }
  .faq-page .faq-final-head{ grid-template-columns:1fr; gap:18px; }
  .faq-page .faq-final-sub{ align-items:flex-start; text-align:left; }
  .faq-page .faq-cta-pair{ grid-template-columns:1fr; }
}
`;

export default function FAQPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="faq-page">
        {/* ─── HERO ─── */}
        <section className="faq-hero">
          <div className="hero-wrap">
            <header className="rail-top">
              <div>
                <span className="folio">
                  N<sup>o</sup> 06<span className="folio-slash">/</span>
                  <span className="folio-b">08</span>
                </span>
              </div>
              <span className="rail-meta">Question Hall · MMXXVI</span>
            </header>

            <div className="rail-sub">
              <span className="kicker">Everything before your first round.</span>
              <span className="kicker-r">
                <span className="ab-livedot" aria-hidden="true"></span>
                <span className="live-lbl">LIVE</span>
                <span className="sep">/</span>
                Bondi · Sydney · 33°53′S 151°16′E
              </span>
            </div>

            <div className="anchor-block">
              <div className="anchor-side">
                <span className="anchor-side-key">§ This page</span>
                <span className="anchor-side-line"></span>
                <span className="anchor-side-note">
                  The questions we hear before a first class.
                  <br />
                  <em>Answered plainly</em>, no corporate caveats.
                </span>
              </div>
              <div className="anchor-main">
                <span className="anchor-overline">
                  <strong>Before you book</strong>
                </span>
                <h1 className="anchor-word">
                  FREQUENTLY
                  <br />
                  ASKED.
                </h1>
                <div className="anchor-sub">
                  <span className="anchor-sub-rule"></span>
                  <span className="anchor-sub-txt">
                    <em>everything before your first round,</em>
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-bot">
              <a href="#beginner" className="hero-bot-cell">
                <span className="hero-bot-k">§ 01</span>
                <span className="hero-bot-v">
                  Beginner <em>·</em> anxiety
                </span>
              </a>
              <a href="#classes" className="hero-bot-cell">
                <span className="hero-bot-k">§ 02</span>
                <span className="hero-bot-v">
                  Classes <em>·</em> timetable
                </span>
              </a>
              <a href="#membership" className="hero-bot-cell">
                <span className="hero-bot-k">§ 03</span>
                <span className="hero-bot-v">Membership</span>
              </a>
              <a href="#gift" className="hero-bot-cell">
                <span className="hero-bot-k">§ 04</span>
                <span className="hero-bot-v">
                  Gift <em>·</em> vouchers
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── § 01 — BEGINNER ANXIETY ─── */}
        <section className="ab-section" id="beginner">
          <div className="ab-wrap">
            <div className="ab-edge-top">
              <span className="ab-edge-folio">Plate I</span>
              <span className="ab-edge-line"></span>
              <span className="ab-edge-meta">
                Lead with this, most asked, most stalls a booking
              </span>
            </div>

            <header className="ab-shead">
              <div className="ab-shead-l">
                <span className="ab-shead-num">§ 01</span>
                <h2 className="ab-shead-title">
                  Beginner anxiety<em>,</em>
                </h2>
                <span className="ab-shead-sub">
                  the questions that stop a first booking.
                </span>
              </div>
              <div className="ab-shead-r">
                <span className="ab-shead-kicker">Five questions</span>
                <span className="ab-shead-rule"></span>
                <span className="ab-shead-index">I · II · III · IV · V</span>
              </div>
            </header>

            <div className="faq-list">
              <details className="faq-q" id="first-class" open>
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>I.</em>
                  </span>
                  <span className="faq-q-text">What happens in my first class?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    Five steps, every first class, in this order. <em>No surprises.</em>
                  </p>
                  <ol>
                    <li>
                      <span>
                        <strong>Arrive ten minutes early.</strong> We meet you at the front,
                        take your name, walk you to the floor. Your gloves and wraps are
                        already waiting.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong>Hand wraps.</strong> A coach wraps your hands for you the
                        first time, and shows you how, so you can do your own from class
                        two.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong>Warm-up &amp; shadow.</strong> Skipping, light footwork,
                        shadow boxing. The coach calls combinations slowly so you learn the
                        language before the bag.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong>Bag rounds.</strong> Three-minute rounds on the bag with one
                        of our coaches on your shoulder calling combinations and adjusting
                        your stance.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong>Cool-down &amp; wrap-up.</strong> Stretch, a glass of water,
                        two minutes with the coach on what to work on next time.
                      </span>
                    </li>
                  </ol>
                  <p>
                    <em>You&apos;ll never be left in the corner figuring it out.</em> A coach
                    is on you the whole hour.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="beginner-experience">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>II.</em>
                  </span>
                  <span className="faq-q-text">
                    I&apos;ve never thrown a punch. Will I be okay?
                  </span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>
                      Yes, and most of the room is in the same boat as you.
                    </strong>{" "}
                    About half of our floor on any given morning is people who&apos;ve
                    never boxed before they walked in here. The other half were beginners
                    six months ago.
                  </p>
                  <p>
                    We teach the stance, the jab, and the cross in the first ten minutes.{" "}
                    <em>You don&apos;t need to know anything before you arrive.</em> If
                    you&apos;ve watched a fight on TV you already know more than you think.
                  </p>
                  <p>
                    The coaches are watching for one thing in a first class: that you leave
                    wanting to come back. Technique gets layered on from class two onward,
                    the first class is about you finding your feet, not throwing a perfect
                    hook.
                  </p>
                </div>
              </details>

              {/* ─── INLINE CTA after top 2 (per UX brief) ─── */}
              <div className="faq-inline-cta" role="note">
                <span className="faq-inline-cta-k">Ready</span>
                <span className="faq-inline-cta-t">
                  <em>That&apos;s the two big ones answered.</em> The rest of this page is
                  for after, go book your first round.
                </span>
                <a className="faq-inline-cta-btn" href="/booking">
                  Book your first class
                </a>
              </div>

              <details className="faq-q" id="fitness-level">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>III.</em>
                  </span>
                  <span className="faq-q-text">
                    I&apos;m not very fit. Can I still come?
                  </span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>You can, and you should.</strong> Boxing is one of the few
                    cardio rooms in the city where you control the pace round by round.
                    Hit the bag at 60% if 60% is what your body has today. The coach will
                    tell you when to back off and when to push.
                  </p>
                  <p>
                    You&apos;ll be sore for two days after a first class. That&apos;s
                    normal, your shoulders, lats, and obliques aren&apos;t used to
                    throwing combinations for forty minutes. By class three or four, the
                    soreness fades and the fitness starts banking.
                  </p>
                  <p>
                    <em>We&apos;ve started people from couch-to-first-fight inside a year.</em>{" "}
                    We&apos;ve also got members who use one class a week to break up a
                    desk job. Both work.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="injury-risk">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>IV.</em>
                  </span>
                  <span className="faq-q-text">
                    What about injuries? Is boxing safe for beginners?
                  </span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>No one hits a person in a beginner class.</strong> All work is
                    on the heavy bag, the focus mitts with the coach, or pad-work with a
                    partner who&apos;s not throwing back. Sparring is a separate, opt-in
                    track that only opens after months of technique drilling, and only
                    ever with mouthguards, headgear, and a coach in the ring with you.
                  </p>
                  <p>
                    The two real injury risks in a beginner class are <em>wrist sprain</em>{" "}
                    (handled by wrapping the hands properly before every round, we&apos;ll
                    wrap you in your first class) and <em>shin splints from skipping</em>{" "}
                    (handled by good shoes and ramping up over weeks, not minutes).
                  </p>
                  <p>
                    If you have an existing injury (back, knee, shoulder, anything) tell
                    the coach when you arrive. They&apos;ll modify the round for you.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="what-to-wear">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>V.</em>
                  </span>
                  <span className="faq-q-text">What should I wear?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>
                      Whatever you&apos;d wear to a gym, but pick shoes you can move in.
                    </strong>{" "}
                    T-shirt or singlet. Shorts or training tights. Cross-trainers, runners,
                    or court shoes are fine. <em>Bare-bones rule of thumb:</em> if you can
                    pivot on the ball of your foot without sliding, the shoe works.
                  </p>
                  <p>
                    What <strong>not</strong> to wear: skate shoes with thick soles (they
                    roll your ankle on the pivot), heavy lifters (too rigid for footwork),
                    running shoes with big heel drops (they tip you forward in stance).
                  </p>
                  <p>
                    We have showers, changing rooms, and a wall of fresh towels. Hand wraps
                    and gloves are lent free for your first class, bring your own from
                    class two if you want, or buy a set at the front desk.
                  </p>
                </div>
              </details>
            </div>

            <div className="ab-edge-bot">
              <span className="ab-edge-folio">End of Plate I</span>
              <span className="ab-edge-line"></span>
              <span className="ab-edge-meta">I / V · Continue to Classes</span>
            </div>
          </div>
        </section>

        {/* ─── § 02 — CLASSES & TIMETABLE ─── */}
        <section className="ab-section" id="classes">
          <div className="ab-wrap">
            <div className="ab-edge-top">
              <span className="ab-edge-folio">Plate II</span>
              <span className="ab-edge-line"></span>
              <span className="ab-edge-meta">
                How the floor works: booking, cancelling, the three formats
              </span>
            </div>

            <header className="ab-shead">
              <div className="ab-shead-l">
                <span className="ab-shead-num">§ 02</span>
                <h2 className="ab-shead-title">
                  Classes &amp; timetable<em>,</em>
                </h2>
                <span className="ab-shead-sub">the room, the rounds, the rope.</span>
              </div>
              <div className="ab-shead-r">
                <span className="ab-shead-kicker">Four questions</span>
                <span className="ab-shead-rule"></span>
                <span className="ab-shead-index">I · II · III · IV</span>
              </div>
            </header>

            <div className="faq-list">
              <details className="faq-q" id="class-types">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>I.</em>
                  </span>
                  <span className="faq-q-text">
                    What are THE WORK / THE CRAFT / THE LONG ROUND?
                  </span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    Three class formats. <em>You&apos;ll see all three on the timetable.</em>{" "}
                    Pick by mood and time, not by level, every format runs
                    beginner-to-advanced lanes side by side.
                  </p>
                  <ul>
                    <li>
                      <span>
                        <strong className="lead">The Work.</strong> 50 minutes.
                        Conditioning-led, high-volume bag rounds, less technique work. The
                        bread-and-butter, most people&apos;s two or three sessions a week.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong className="lead">The Craft.</strong> 60 minutes.
                        Technique-led: slower tempo, more drilling of combinations, mitt
                        work with the coach. Skill banks here.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong className="lead">The Long Round.</strong> 75 minutes.
                        Saturday morning ritual. Twelve rounds with a full warm-up,
                        mid-session conditioning circuit, and a slow stretch to finish.
                        Coffee on the house after.
                      </span>
                    </li>
                  </ul>
                  <p>
                    <em>If you only do one class a week,</em> we&apos;d point you at The
                    Craft or The Long Round so the skill compounds.{" "}
                    <em>If you&apos;re doing three or more,</em> mix The Work in for the
                    cardio.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="booking">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>II.</em>
                  </span>
                  <span className="faq-q-text">How do I book a class?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>Three ways, all of them fast.</strong>
                  </p>
                  <ol>
                    <li>
                      <span>
                        <strong>The booking page.</strong> Apple Pay, Google Pay, or card.
                        From phone-in-hand to seat-reserved is about 20 seconds.{" "}
                        <em>This is what most people use.</em>
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong>Drop in.</strong> Walk through the door, talk to the front
                        desk, take a spot if there&apos;s one open. We hold roughly two
                        drop-in seats per class for this.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong>Call us.</strong> <code>{PHONE_FAQ_DISPLAY}</code>, open 0530
                        to 2100. We can book you in by phone if the widget is giving you
                        grief.
                      </span>
                    </li>
                  </ol>
                  <p>
                    <em>First class is on the house</em>, no card asked, no commitment
                    after.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="cancellation">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>III.</em>
                  </span>
                  <span className="faq-q-text">Can I cancel a booking?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>
                      Yes, up to 12 hours before the class starts, no penalty.
                    </strong>{" "}
                    Cancel from the confirmation email, your account, or a phone call. The
                    class pack credit goes straight back to your account.
                  </p>
                  <div className="faq-q-callout">
                    <span className="faq-q-callout-k">Policy</span>
                    <span className="faq-q-callout-v">
                      <strong>12h</strong> notice, no penalty, no questions.
                    </span>
                  </div>
                  <p>
                    Cancel inside the 12-hour window and the class credit is forfeited
                    (someone on the waitlist gets your seat).{" "}
                    <em>If you wake up sick on the morning of a class</em>, call us,
                    we&apos;ll move the credit by hand. We&apos;re not interested in
                    penalising someone for catching the flu.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="waitlist">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>IV.</em>
                  </span>
                  <span className="faq-q-text">What if a class is full?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>Join the waitlist on the booking page</strong>, it&apos;s the
                    small &quot;join waitlist&quot; link under any full session. We text
                    you the moment a spot opens up, which is usually 12 to 24 hours before
                    the class (cancellations cluster the day before).
                  </p>
                  <p>
                    <em>About 8 in 10 waitlists clear</em> for any session at least a few
                    hours ahead of time. If you don&apos;t get in, the waitlist doesn&apos;t
                    cost a thing, no credit pulled, no card touched.
                  </p>
                  <p>
                    <em>Or:</em> we run the same class earlier and later most days. The
                    0530 and 1900 slots almost never fill, if you can flex the time,
                    you&apos;ll always get a seat.
                  </p>
                </div>
              </details>
            </div>

            <div className="ab-edge-bot">
              <span className="ab-edge-folio">End of Plate II</span>
              <span className="ab-edge-line"></span>
              <span className="ab-edge-meta">II / V · Continue to Membership</span>
            </div>
          </div>
        </section>

        {/* ─── § 03 — MEMBERSHIP ─── */}
        <section className="ab-section" id="membership">
          <div className="ab-wrap">
            <div className="ab-edge-top">
              <span className="ab-edge-folio">Plate III</span>
              <span className="ab-edge-line"></span>
              <span className="ab-edge-meta">
                Price, freeze, cancel, refund, answered straight
              </span>
            </div>

            <header className="ab-shead">
              <div className="ab-shead-l">
                <span className="ab-shead-num">§ 03</span>
                <h2 className="ab-shead-title">
                  Membership<em>,</em>
                </h2>
                <span className="ab-shead-sub">
                  prices, freezes, what happens if you leave.
                </span>
              </div>
              <div className="ab-shead-r">
                <span className="ab-shead-kicker">Five questions</span>
                <span className="ab-shead-rule"></span>
                <span className="ab-shead-index">I · II · III · IV · V</span>
              </div>
            </header>

            <div className="faq-list">
              <details className="faq-q" id="membership-options">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>I.</em>
                  </span>
                  <span className="faq-q-text">
                    What membership options do you offer?
                  </span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>Three tiers, picked by frequency, not level.</strong>
                  </p>
                  <ul>
                    <li>
                      <span>
                        <strong className="lead">Drop-in.</strong> $35 per class. Best for
                        tourists, first-class trials, and anyone training less than one
                        session a week.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong className="lead">10-Pack.</strong> $290 for ten classes
                        ($29 each) valid 3 months from purchase. Best for casual training,
                        one to two classes a week, flexibility over volume.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong className="lead">Unlimited.</strong> $189 per month, no
                        lock-in contract. Pays off after seven visits in a month, most
                        unlimited members train three to four times a week.
                      </span>
                    </li>
                  </ul>
                  <p>
                    <em>Not sure?</em> Start on a 10-Pack, see how many weekly classes you
                    actually settle into, and move up to Unlimited when the maths tips.
                    We&apos;ll make the switch by hand, no penalty.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="freeze">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>II.</em>
                  </span>
                  <span className="faq-q-text">Can I freeze my membership?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>
                      Yes, Unlimited members can freeze for up to three months per year,
                      in blocks.
                    </strong>{" "}
                    Travelling for a month? Recovering from an injury? Off the floor for
                    the school holidays? Freeze from your account, pick the start and end
                    dates, and your billing pauses cleanly until you resume.
                  </p>
                  <div className="faq-q-callout">
                    <span className="faq-q-callout-k">Freeze allowance</span>
                    <span className="faq-q-callout-v">
                      <strong>3 months</strong> per calendar year, split however you want.
                    </span>
                  </div>
                  <p>
                    <em>You don&apos;t need a reason</em>, the form has a single
                    date-range picker, no &quot;tell us why&quot; field. Resume any time
                    before the freeze ends, the system catches up the billing
                    automatically.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="cancellation-membership">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>III.</em>
                  </span>
                  <span className="faq-q-text">How do I cancel a membership?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>
                      From your account, with 7 days notice. One click. No phone tree, no
                      email chase, no exit interview.
                    </strong>
                  </p>
                  <div className="faq-q-callout">
                    <span className="faq-q-callout-k">Notice</span>
                    <span className="faq-q-callout-v">
                      <strong>7 days</strong> from the day you cancel, final class
                      included.
                    </span>
                  </div>
                  <p>
                    <code>Settings → Membership → Cancel.</code> You&apos;ll get one final
                    week of access from the day you hit cancel, then billing stops. No
                    retention call, no &quot;wait, give us another chance&quot; survey.
                  </p>
                  <p>
                    <em>If you ever want to come back</em>, the door is open, the rate is
                    whatever the public rate is on the day, and we won&apos;t make you
                    fill anything out twice.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="student-discount">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>IV.</em>
                  </span>
                  <span className="faq-q-text">
                    Do you offer student or concession rates?
                  </span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>
                      Yes, 15% off any tier with a valid student or concession card.
                    </strong>{" "}
                    Applies to drop-ins, 10-packs, and Unlimited. Show your card at the
                    front desk on your first visit and we&apos;ll apply the discount to
                    your account forever, no need to re-prove it.
                  </p>
                  <div className="faq-q-callout">
                    <span className="faq-q-callout-k">Discount</span>
                    <span className="faq-q-callout-v">
                      <strong>15%</strong> off, student, concession, healthcare card
                      holders.
                    </span>
                  </div>
                  <p>
                    <em>Who qualifies:</em> full-time students at any Sydney university or
                    TAFE, Centrelink concession card holders, healthcare card holders,
                    full-time apprentices, and Seniors Card holders. If you&apos;re not
                    sure, just ask, we don&apos;t make people prove edge cases.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="refunds">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>V.</em>
                  </span>
                  <span className="faq-q-text">Are class packs refundable?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>Yes, within 14 days, if you haven&apos;t used any classes.</strong>{" "}
                    Pull the trigger on a 10-pack, decide it&apos;s not for you before
                    stepping on the floor, email us inside 14 days for a full refund to
                    the same card. No questions, no fees.
                  </p>
                  <p>
                    <em>Once you&apos;ve used a class,</em> we can&apos;t refund the pack,
                    but we can credit the unused balance to a friend&apos;s account, or
                    hold it for you indefinitely (no expiry while it&apos;s on hold).
                  </p>
                  <p>
                    <em>Bought a pack as a gift and the recipient doesn&apos;t want it?</em>{" "}
                    See <a href="#gift-purchase">Buying as a gift</a> below, we&apos;ll
                    re-route it or refund the giver, whichever they prefer.
                  </p>
                </div>
              </details>
            </div>

            <div className="ab-edge-bot">
              <span className="ab-edge-folio">End of Plate III</span>
              <span className="ab-edge-line"></span>
              <span className="ab-edge-meta">III / V · Continue to Gift</span>
            </div>
          </div>
        </section>

        {/* ─── § 04 — BUYING AS A GIFT (new per UX brief P6 fix) ─── */}
        <section className="ab-section" id="gift">
          <div className="ab-wrap">
            <div className="ab-edge-top">
              <span className="ab-edge-folio">Plate IV</span>
              <span className="ab-edge-line"></span>
              <span className="ab-edge-meta">
                For someone else: purchase, redemption, expiry
              </span>
            </div>

            <header className="ab-shead">
              <div className="ab-shead-l">
                <span className="ab-shead-num">§ 04</span>
                <h2 className="ab-shead-title">
                  Buying as a gift<em>,</em>
                </h2>
                <span className="ab-shead-sub">
                  for the partner, sibling, friend who&apos;s been hinting.
                </span>
              </div>
              <div className="ab-shead-r">
                <span className="ab-shead-kicker">Four questions</span>
                <span className="ab-shead-rule"></span>
                <span className="ab-shead-index">I · II · III · IV</span>
              </div>
            </header>

            <div className="faq-list">
              <details className="faq-q" id="gift-purchase">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>I.</em>
                  </span>
                  <span className="faq-q-text">
                    How do I buy a class pack as a gift?
                  </span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>Two ways.</strong>
                  </p>
                  <ol>
                    <li>
                      <span>
                        <strong>From the membership page.</strong> Hit the{" "}
                        <em>&quot;Gift this&quot;</em> link on any tier card, drop-in,
                        10-pack, or a month of Unlimited. Pay with Apple Pay, Google Pay,
                        or card. We email you a PDF voucher to forward.
                      </span>
                    </li>
                    <li>
                      <span>
                        <strong>From the location page.</strong> Use the contact form with
                        &quot;Gift purchase&quot; as the subject, useful if you want
                        something custom (a six-month membership, a couple&apos;s pack, a
                        birthday combo). We&apos;ll come back inside one business day with
                        a tailored voucher.
                      </span>
                    </li>
                  </ol>
                  <p>
                    <em>You don&apos;t pay GST on the gift itself</em>, only on what your
                    recipient eventually redeems. The voucher acts as a credit, not a
                    pre-paid service.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="gift-redemption">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>II.</em>
                  </span>
                  <span className="faq-q-text">How does the recipient redeem it?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>One code, two ways to use it.</strong> The voucher carries a
                    10-character redemption code (e.g. <code>BNDI-7K2P3R</code>). Your
                    recipient can:
                  </p>
                  <ol>
                    <li>
                      <span>
                        Enter the code at checkout on the{" "}
                        <a href="/booking">booking page</a>, credits land in their
                        account instantly.
                      </span>
                    </li>
                    <li>
                      <span>
                        Bring the printed voucher to the front desk on a first visit,
                        we&apos;ll add the credit by hand and book them straight in.
                      </span>
                    </li>
                  </ol>
                  <p>
                    <em>The recipient doesn&apos;t need an account to redeem.</em> The
                    first time they book is the first time we ask for an email, they can
                    do it at the front desk if they&apos;d rather not deal with the
                    website.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="gift-expiry">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>III.</em>
                  </span>
                  <span className="faq-q-text">When does the voucher expire?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>Three years from the day you buy it.</strong> That&apos;s the
                    statutory minimum under Australian gift-card law (NSW Gift Cards Act,
                    2018), we hold to it strictly and never expire vouchers earlier than
                    that, even on partial-use balances.
                  </p>
                  <div className="faq-q-callout">
                    <span className="faq-q-callout-k">Expiry</span>
                    <span className="faq-q-callout-v">
                      <strong>3 years</strong> from purchase, the legal floor, not the
                      ceiling.
                    </span>
                  </div>
                  <p>
                    <em>If your recipient redeems part of the voucher</em>, say they use
                    4 of 10 classes from a 10-pack, the remaining 6 stay live for the
                    full original 3-year window. No &quot;use it or lose it&quot; tricks.
                  </p>
                  <p>
                    <em>If three years pass unredeemed,</em> email us anyway. We&apos;ve
                    never enforced the expiry on a genuine gift in five years of running
                    this room.
                  </p>
                </div>
              </details>

              <details className="faq-q" id="gift-voucher-format">
                <summary className="faq-q-head">
                  <span className="faq-q-num">
                    <em>IV.</em>
                  </span>
                  <span className="faq-q-text">What does the voucher look like?</span>
                  <span className="faq-q-plus" aria-hidden="true"></span>
                </summary>
                <div className="faq-q-body">
                  <p>
                    <strong>
                      A single-page PDF, designed in the same hand as this site.
                    </strong>{" "}
                    Charcoal background, cream Bebas headline, Cormorant italic on the
                    recipient&apos;s name and your dedication line. The redemption code
                    sits in a hairline-bordered box at the foot, with a QR that drops the
                    recipient straight to the booking page with the code pre-filled.
                  </p>
                  <p>
                    <em>You can:</em>
                  </p>
                  <ul>
                    <li>
                      <span>
                        Email the PDF directly from us to the recipient on a date you
                        pick (birthday morning, Christmas Day, anniversary).
                      </span>
                    </li>
                    <li>
                      <span>Get the PDF emailed to you to print and slip into a card.</span>
                    </li>
                    <li>
                      <span>
                        Pick up a hand-numbered printed voucher at the studio,
                        letterpressed on Colorplan, ring ahead to make sure we&apos;ve got
                        one set aside.
                      </span>
                    </li>
                  </ul>
                  <p>
                    <em>Everything is set up to feel like a real gift,</em> not a receipt
                    with a code on it.
                  </p>
                </div>
              </details>
            </div>

            <div className="ab-edge-bot">
              <span className="ab-edge-folio">End of Plate IV</span>
              <span className="ab-edge-line"></span>
              <span className="ab-edge-meta">IV / V · Anything else? · keep going</span>
            </div>
          </div>
        </section>

        {/* ─── § 05 — STILL HAVE QUESTIONS ─── */}
        <section className="faq-final" id="contact">
          <div className="ab-wrap">
            <header className="faq-final-head">
              <h2 className="faq-final-anchor">
                STILL HAVE
                <br />
                QUESTIONS?
              </h2>
              <div className="faq-final-sub">
                <span className="faq-final-sub-k">§ 05 · Reach the room</span>
                <span className="faq-final-sub-t">
                  We answer email by hand inside one business day. Or come in,
                  kettle&apos;s always on.
                </span>
              </div>
            </header>

            <div className="faq-cta-pair">
              <a className="faq-cta-card" href="/location">
                <div className="faq-cta-card-num">
                  <span>I.</span>
                  <span className="faq-cta-card-num-rule"></span>
                  <span>The studio</span>
                </div>
                <div className="faq-cta-card-body">
                  <h3 className="faq-cta-card-title">VISIT US.</h3>
                  <p className="faq-cta-card-desc">
                    <strong>{ADDRESS_LINE}, {ADDRESS_LOCALITY}.</strong> Open 0530-2100
                    daily. Drop in, take the tour, watch a class run before you book.{" "}
                    <em>The kettle&apos;s always on.</em>
                  </p>
                </div>
                <span className="faq-cta-card-link">
                  Get directions
                  <span className="arrow">→</span>
                </span>
              </a>

              <a className="faq-cta-card is-primary" href={`mailto:${EMAIL_GENERAL}`}>
                <div className="faq-cta-card-num">
                  <span>II.</span>
                  <span className="faq-cta-card-num-rule"></span>
                  <span>The inbox</span>
                </div>
                <div className="faq-cta-card-body">
                  <h3 className="faq-cta-card-title">EMAIL US.</h3>
                  <p className="faq-cta-card-desc">
                    <strong>{EMAIL_GENERAL}</strong>, read and answered
                    by hand. One business day, normally same morning.{" "}
                    <em>No bots, no ticket numbers, no scripts.</em>
                  </p>
                </div>
                <span className="faq-cta-card-link">
                  Open mail
                  <span className="arrow">→</span>
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
