const styles = `
.policy-page{background:var(--paper);padding-bottom:64px;min-height:70vh}
.policy-head{padding:24px 0 26px;border-bottom:1px solid var(--line)}
.policy-head h1{font-size:clamp(28px,3.4vw,38px);max-width:none}
.policy-head p{color:var(--muted);font-size:var(--t-md);line-height:1.7;max-width:62ch;margin-top:12px}
.policy-updated{font-size:var(--t-xs)!important;color:var(--muted-2)!important;margin-top:14px!important}
.policy-layout{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:48px;align-items:start;padding-top:34px}
.policy-body{max-width:72ch}
.policy-body section+section{margin-top:34px}
.policy-body h2{font-size:var(--t-xl);margin-bottom:12px}
.policy-body p{color:var(--ink-2);font-size:var(--t-md);line-height:1.8}
.policy-body p+p{margin-top:12px}
.policy-body ul{margin-top:12px;display:grid;gap:9px;padding-left:20px}
.policy-body li{color:var(--ink-2);font-size:var(--t-md);line-height:1.75}
.policy-body a{color:var(--violet);font-weight:700}
.policy-body a:hover{color:var(--violet-ink)}
.policy-aside{position:sticky;top:96px;border:1px solid var(--line);border-radius:var(--r-md);background:#fff;padding:20px}
.policy-aside h2{font-size:var(--t-xs);font-weight:900;letter-spacing:.8px;text-transform:uppercase;color:var(--muted);margin-bottom:12px}
.policy-aside ul{display:grid;gap:10px;list-style:none;margin:0;padding:0}
.policy-aside a{color:var(--ink-2);font-size:var(--t-sm);font-weight:700}
.policy-aside a:hover{color:var(--violet)}
.policy-aside span[aria-current]{color:var(--violet);font-size:var(--t-sm);font-weight:800}
@media(max-width:900px){
.policy-layout{grid-template-columns:1fr;gap:30px}
.policy-aside{position:static;order:-1}
}
`;

export function PolicyStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
