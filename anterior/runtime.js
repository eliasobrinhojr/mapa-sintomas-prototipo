/* Mini-motor do protótipo: monta a tela a partir do modelo e refaz o desenho a cada toque. Nada é salvo. */
class DCLogic { constructor(p) { this.props = p || {}; this.state = {}; } setState(o) { Object.assign(this.state, o); window.__render(); } }
(function () {
  function get(scope, path) { let v = scope; for (const k of path.trim().split('.')) { if (v == null) return undefined; v = v[k]; } return v; }
  function val(scope, raw) { const m = raw.match(/^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/); if (m) { const p = m[1]; if (p === 'true') return true; if (p === 'false') return false; return get(scope, p); } return raw; }
  const fill = (s, scope) => s.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, p) => { const v = get(scope, p); return v == null ? '' : v; });
  function expand(node, scope, out) {
    if (node.nodeType === 3) { out.appendChild(document.createTextNode(fill(node.nodeValue, scope))); return; }
    if (node.nodeType !== 1) return;
    const tag = node.tagName.toLowerCase();
    if (tag === 'sc-for') { const list = val(scope, node.getAttribute('list')) || []; const as = node.getAttribute('as');
      for (const item of (Array.isArray(list) ? list : [])) { const s2 = Object.assign({}, scope, { [as]: item }); for (const c of node.childNodes) expand(c, s2, out); } return; }
    if (tag === 'sc-if') { if (val(scope, node.getAttribute('value'))) for (const c of node.childNodes) expand(c, scope, out); return; }
    const el = document.createElementNS(node.namespaceURI, node.localName);
    for (const a of node.attributes) {
      if (/^on[A-Z]/.test(a.name) || a.name === 'onclick') { const fn = val(scope, a.value); if (typeof fn === 'function') el.addEventListener('click', fn); continue; }
      el.setAttribute(a.name, fill(a.value, scope));
    }
    for (const c of node.childNodes) expand(c, scope, el);
    out.appendChild(el);
  }
  window.__boot = function (Component) {
    const root = document.getElementById('root'), tpl = document.getElementById('tpl');
    const comp = new Component({});
    const KEEP = '.body,.sb,.hsc';
    window.__render = function () {
      const sc = [...root.querySelectorAll(KEEP)].map((e) => [e.scrollTop, e.scrollLeft]);
      const tv = [...root.querySelectorAll('textarea,input')].map((e) => e.value);
      const frag = document.createDocumentFragment();
      const vals = comp.renderVals();
      for (const c of tpl.content.childNodes) expand(c, vals, frag);
      root.replaceChildren(frag);
      [...root.querySelectorAll(KEEP)].forEach((e, i) => { if (sc[i]) { e.scrollTop = sc[i][0]; e.scrollLeft = sc[i][1]; } });
      [...root.querySelectorAll('textarea,input')].forEach((e, i) => { if (tv[i] != null && tv.length) e.value = tv[i]; });
    };
    window.__render();
    /* chaves de liga/desliga que no desenho são só figura: aqui respondem ao toque */
    root.addEventListener('click', (ev) => { const sw = ev.target.closest('span.sw'); if (sw) { sw.classList.toggle('off'); sw.setAttribute('aria-label', sw.classList.contains('off') ? 'Desligado' : 'Ligado'); } });
  };
})();
