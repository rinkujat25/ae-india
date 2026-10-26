const styles = `
.auth-page{min-height:100vh;background:linear-gradient(135deg,#f6f5f2 0%,#efede8 52%,#fbe9e1 100%);display:grid;place-items:center;padding:32px}.auth-shell{width:min(1040px,100%);display:grid;grid-template-columns:1fr .92fr;background:#fff;border:1px solid var(--line);border-radius:28px;box-shadow:0 24px 70px rgba(31, 29, 28,.12);overflow:hidden}.auth-panel{padding:46px}.auth-logo{display:inline-flex;width:180px;margin-bottom:38px}
.auth-head{display:flex;align-items:center;gap:12px}.auth-back{display:inline-grid;place-items:center;width:40px;height:40px;margin-left:-8px;border-radius:50%;color:var(--ink);flex:0 0 auto}.auth-back:hover{background:var(--cream)}.auth-back svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.auth-head h1{font-size:clamp(28px,3.4vw,38px);line-height:1.05;color:var(--ink)}
.auth-copy{color:var(--muted);font-size:15px;line-height:1.7;margin:14px 0 28px;max-width:46ch}
.auth-form{display:grid;gap:18px}.auth-field{display:grid;gap:8px}.auth-field label{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;color:var(--muted-2)}.auth-field input{width:100%;height:54px;border:1.5px solid var(--line);border-radius:14px;background:#fff;color:var(--ink);font:inherit;font-size:15px;padding:0 15px;transition:border-color .15s ease,box-shadow .15s ease}.auth-field input:focus{outline:0;border-color:var(--violet);box-shadow:0 0 0 3px var(--violet-tint)}.auth-field input::placeholder{color:#b0a89e}
.auth-input-wrap{position:relative;display:flex}.auth-input-wrap input{padding-right:62px}.auth-reveal{position:absolute;right:7px;top:50%;transform:translateY(-50%);width:42px;height:42px;display:grid;place-items:center;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--muted);cursor:pointer;padding:0}.auth-reveal:hover{color:var(--ink);border-color:#d5ccbe}.auth-reveal svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.auth-otp{text-align:center;font-size:24px;font-weight:800;letter-spacing:12px;padding-left:12px}
.auth-submit{height:54px;border:0;border-radius:999px;background:var(--ink);color:#fff;font:inherit;font-weight:800;font-size:15px;cursor:pointer;margin-top:4px;transition:transform .18s ease,box-shadow .18s ease}.auth-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 14px 28px rgba(25,22,34,.2)}.auth-submit:disabled{opacity:.55;cursor:not-allowed}
.auth-alt{display:flex;align-items:center;justify-content:center;min-height:44px;padding:4px 12px;text-align:center;color:var(--muted);font-size:14px;font-weight:700;margin-top:-12px;border-radius:12px}.auth-alt:focus-visible{background:var(--violet-tint)}.auth-alt:hover{color:var(--violet)}.auth-alt-strong{color:var(--violet);font-weight:800}.auth-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.auth-field-error{color:var(--rose);font-size:12px;font-weight:700;margin-top:6px}
.auth-form input[aria-invalid="true"]{border-color:var(--rose)}
.auth-rules{color:var(--muted);font-size:12px;line-height:1.55;margin-top:6px}
.auth-rules[hidden]{display:none}
.auth-terms{color:var(--muted);font-size:12px;line-height:1.6;text-align:center;border-top:1px solid var(--line);padding-top:16px;margin-top:4px}
.auth-terms a{color:var(--violet);font-weight:700}
.auth-reveal-actions{position:absolute;right:7px;top:50%;transform:translateY(-50%);display:flex;gap:6px}
.auth-reveal-actions .auth-reveal{position:static;transform:none}
.auth-input-wrap-2 input{padding-right:112px}
@media(max-width:520px){.auth-row{grid-template-columns:1fr}}
button.auth-alt{width:100%;border:0;background:none;font:inherit;font-weight:700;cursor:pointer}button.auth-alt:disabled{opacity:.6;cursor:not-allowed}button.auth-alt-strong{font-weight:800}
.auth-sent{color:var(--muted);font-size:14px;line-height:1.6}.auth-sent b{color:var(--ink);word-break:break-word}.auth-sent a{display:inline-block;margin-left:8px;padding:8px 2px;color:var(--violet);font-weight:800}
.auth-error{background:#ffe9e4;border:1px solid #f7c9bb;border-radius:12px;color:#a8482a;font-size:14px;font-weight:700;line-height:1.5;padding:12px 14px;margin-top:-4px}.auth-hint{color:var(--muted-2);font-size:12px;line-height:1.6;text-align:center}.auth-hint a{color:var(--violet);font-weight:800;display:inline-block;padding:6px 2px}
.auth-divider{height:1px;background:var(--line);margin:28px 0 20px}.auth-register{text-align:center;color:var(--muted);font-size:14px;line-height:1.7}.auth-register a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 14px;color:var(--violet);font-weight:800;font-size:16px;border-radius:12px}
.auth-side{background:var(--ink);color:#fff;padding:46px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}.auth-side:before{content:"";position:absolute;width:360px;height:360px;border-radius:50%;background:rgba(91,61,245,.38);filter:blur(80px);right:-110px;top:-110px}.auth-side>*{position:relative;z-index:1}.auth-side h2{font-size:clamp(28px,3vw,40px);line-height:1.08;margin-bottom:16px}.auth-side p{color:#d6cedf;line-height:1.7;max-width:42ch}.auth-points{display:grid;gap:12px;margin-top:34px}.auth-point{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:14px 16px;color:#eee8f5;font-size:14px;font-weight:700}.auth-note{font-size:12px;color:#bfb7c7;line-height:1.6;margin-top:36px}
@media(max-width:860px){.auth-shell{grid-template-columns:1fr}.auth-side{display:none}.auth-panel{padding:34px}}
@media(max-width:520px){.auth-page{padding:16px}.auth-shell{border-radius:20px}.auth-panel{padding:24px 20px}.auth-logo{width:150px;margin-bottom:26px}.auth-copy{font-size:14px;margin:12px 0 22px}.auth-field input{height:52px}.auth-otp{letter-spacing:9px;font-size:21px}.auth-submit{height:52px}}
`;

export function AuthStyles() {
    return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
