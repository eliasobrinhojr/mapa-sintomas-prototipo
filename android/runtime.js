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
      if (window.__icones) window.__icones.aplicar(root);
      if (window.__calor) window.__calor.pintar();
      [...root.querySelectorAll(KEEP)].forEach((e, i) => { if (sc[i]) { e.scrollTop = sc[i][0]; e.scrollLeft = sc[i][1]; } });
      [...root.querySelectorAll('textarea,input')].forEach((e, i) => { if (tv[i] != null && tv.length) e.value = tv[i]; });
    };
    window.__render();
    /* chaves de liga/desliga que no desenho são só figura: aqui respondem ao toque */
    root.addEventListener('click', (ev) => { const sw = ev.target.closest('span.sw'); if (sw) { sw.classList.toggle('off'); sw.setAttribute('aria-label', sw.classList.contains('off') ? 'Desligado' : 'Ligado'); } });
  };
})();

/* Medição de demonstração (só protótipo): conta, neste navegador, quantas vezes cada tela abre e cada botão é tocado.
   Mesma regra do app: em pergunta de saúde conta o bloco ("tocou numa opção de humor"), nunca qual opção. Nada sai do navegador. */
(function () {
  var AND = /\/android\//.test(location.pathname), K = 'ms.calor' + (AND ? '.and' : '');
  var tela = (location.pathname.match(/([A-Za-z0-9]+)\.html$/) || [0, 'index'])[1];
  var VER = /[?&]calor=1/.test(location.search), GRUPO = '.mood,.fact,.opt,.chip';
  function ler() { try { return JSON.parse(localStorage.getItem(K) || '{}') || {}; } catch (e) { return {}; } }
  function gravar(o) { try { localStorage.setItem(K, JSON.stringify(o)); } catch (e) {} }
  function alvo(el) { var root = document.getElementById('root'); if (!el || !root || !root.contains(el)) return null;
    if (el.matches(GRUPO)) { var c = el.parentElement, cls = (c.className || 'bloco').split(' ')[0];
      var n = [].slice.call(root.querySelectorAll('.' + cls)).indexOf(c); return { k: 'g:' + cls + ':' + n, el: c }; }
    var t = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
    return t ? { k: 'e:' + t, el: el } : null; }
  if (!VER) {
    var o = ler(); o[tela] = o[tela] || { v: 0, t: {} }; o[tela].v++; gravar(o);
    document.addEventListener('click', function (ev) { var el = ev.target.closest && ev.target.closest('a,button'); var a = alvo(el); if (!a) return;
      var o = ler(); o[tela] = o[tela] || { v: 0, t: {} }; o[tela].t[a.k] = (o[tela].t[a.k] || 0) + 1; gravar(o); }, true);
    window.__calor = { pintar: function () {} };
    return;
  }
  var st = document.createElement('style');
  st.textContent = '.cal-b{position:absolute;top:-7px;right:-5px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;font:700 11.5px/22px Figtree,system-ui,sans-serif;color:#FFFFFF;text-align:center;z-index:50;pointer-events:none;box-shadow:0 1px 3px rgba(0,0,0,.3)}' +
    '.cal-p{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:99;background:#202A35;color:#FFFFFF;font:600 11.5px/1 Figtree,system-ui,sans-serif;padding:7px 12px;border-radius:999px;white-space:nowrap;pointer-events:none}';
  document.head.appendChild(st);
  function cor(i) { return 'hsl(' + Math.round(48 - 48 * i) + ',' + Math.round(88 - 12 * i) + '%,' + Math.round(46 - 6 * i) + '%)'; }
  function pintar() { var root = document.getElementById('root'), d = ler()[tela] || { v: 0, t: {} }, max = 1, tot = 0, k;
    for (k in d.t) { max = Math.max(max, d.t[k]); tot += d.t[k]; }
    var vistos = {};
    [].slice.call(root.querySelectorAll('a,button')).forEach(function (el) { var a = alvo(el); if (!a || vistos[a.k] || !d.t[a.k]) return; vistos[a.k] = 1;
      var n = d.t[a.k], c = cor(n / max), e = a.el; if (getComputedStyle(e).position === 'static') e.style.position = 'relative';
      e.style.outline = '3px solid ' + c; e.style.outlineOffset = '2px';
      var b = document.createElement('span'); b.className = 'cal-b'; b.style.background = c; b.textContent = n; e.appendChild(b); });
    var p = document.querySelector('.cal-p'); if (!p) { p = document.createElement('div'); p.className = 'cal-p'; document.body.appendChild(p); }
    p.textContent = 'Calor · ' + d.v + (d.v === 1 ? ' abertura' : ' aberturas') + ' · ' + tot + (tot === 1 ? ' toque' : ' toques'); }
  document.addEventListener('click', function (ev) { var a = ev.target.closest && ev.target.closest('a[href]'); if (!a) return; var h = a.getAttribute('href');
    if (/^[A-Za-z0-9]+\.html$/.test(h)) { ev.preventDefault(); location.href = h + '?calor=1'; } }, false);
  window.__calor = { pintar: pintar };
})();
