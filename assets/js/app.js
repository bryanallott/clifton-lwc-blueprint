const phases = [
  { id:1, cls:'p1', label:'Phase 1', name:'Recovery & Offseason', dates:'Now – 31 May', sundays:7,
    focus:'Winter sports, strength base, complete awards', intensity:15, volume:20 },
  { id:2, cls:'p2', label:'Phase 2', name:'Aerobic Build', dates:'1 Jun – 30 Aug', sundays:13,
    focus:'Establish core aerobic engine, long base work', intensity:35, volume:80 },
  { id:3, cls:'p3', label:'Phase 3', name:'Lactate Threshold', dates:'31 Aug – 27 Sep', sundays:4,
    focus:'Intensity capacity, expand peak endurance', intensity:65, volume:70 },
  { id:4, cls:'p4', label:'Phase 4', name:'Speed Sharpening', dates:'28 Sep – 1 Nov', sundays:5,
    focus:'Race pace conditioning, fine-tune movement', intensity:85, volume:50 },
  { id:5, cls:'p5', label:'Phase 5', name:'Peaking & Taper', dates:'2 Nov – 29 Nov', sundays:4,
    focus:'Maximise energy pools, Tap & Prep', intensity:95, volume:25 },
];

const phaseColors = ['#8B7355','#1166A3','#1E6830','#AA5E00','#B02E14'];
const phaseBg    = ['#F5EDD8','#D6EFF8','#D2EDD8','#FAE8CA','#FAE0D6'];

const athletes = [
  { id:'sprint',   cls:'a-sprint',   label:'Beach sprinter', name:'Beach sprinter',  target:'12 × 90m soft sand', color:'#4E45B2', bg:'#E9E8FD' },
  { id:'swim',     cls:'a-swim',     label:'Ocean swimmer',  name:'Ocean swimmer',   target:'8 × 400m open water', color:'#0A8AAD', bg:'#D2F0F7' },
  { id:'ski',      cls:'a-ski',      label:'Surfski',        name:'Surfski paddler', target:'8 × 1000m sprints',   color:'#1166A3', bg:'#D6EFF8' },
  { id:'board',    cls:'a-board',    label:'Board paddler',  name:'Board paddler',   target:'8 × 600m sprints',    color:'#AA5E00', bg:'#FAE8CA' },
  { id:'allround', cls:'a-allround', label:'All-rounder',    name:'All-rounder',     target:'Multi-discipline',     color:'#B02E14', bg:'#FAE0D6' },
  { id:'pool',     cls:'a-pool',     label:'Pool rescue',    name:'Pool rescue',     target:'12 × 50–200m sprints', color:'#1E6830', bg:'#D2EDD8' },
];

// For very small static site, data may be embedded on the page.
// Otherwise load it from `./assets/data.json` and then render.
function loadData() {
  const baseFromWindow = (typeof window !== 'undefined' && window.baseurl) ? window.baseurl : '';
  // If a <base> tag is present its href will be used by relative URLs. Try a few fallbacks.
  const baseFromTag = (function(){
    const b = document.querySelector('base');
    return b && b.getAttribute('href') ? b.getAttribute('href').replace(/\/$/, '') : '';
  })();
  const candidates = [];
  if (baseFromWindow) candidates.push(baseFromWindow.replace(/\/$/, '') + '/assets/data.json');
  if (baseFromTag) candidates.push(baseFromTag.replace(/\/$/, '') + '/assets/data.json');
  // relative paths (will resolve against <base> if present)
  candidates.push('assets/data.json', './assets/data.json');

  // also try deriving from the current script location (useful if app.js is served from assets/js/)
  (function(){
    try {
      let scriptSrc = (document.currentScript && document.currentScript.src) || '';
      if (!scriptSrc) {
        const s = document.getElementsByTagName('script');
        for (let i = s.length-1; i>=0; i--) {
          if (s[i].src && s[i].src.indexOf('app.js') !== -1) { scriptSrc = s[i].src; break; }
        }
      }
      if (scriptSrc) {
        const u = new URL(scriptSrc, location.href);
        const dir = u.origin + u.pathname.replace(/\/[^\/]*$/, '');
        candidates.push(dir.replace(/\/$/, '') + '/data.json');
        candidates.push(dir.replace(/\/$/, '') + '/assets/data.json');
      }
    } catch(e) { /* ignore */ }
  })();

  function tryNext(i) {
    if (i >= candidates.length) return Promise.reject(new Error('All data.json fetch attempts failed'));
    const path = candidates[i];
    return fetch(path)
      .then(r => {
        if (!r.ok) return tryNext(i+1);
        return r.json();
      })
      .catch(() => tryNext(i+1));
  }

  return tryNext(0)
    .then(json => { window.data = json; render(); })
    .catch(err => { console.error('data load error', err); });
}
let selPhase = 1, selAthlete = 'sprint';

function renderPhases() {
  const g = document.getElementById('phaseGrid');
  g.innerHTML = phases.map(p => `
    <div class="phase-card ${p.cls} ${p.id===selPhase?'active':''}" onclick="selPhase=${p.id};render()">
      <div class="phase-label">${p.label}</div>
      <div class="phase-name">${p.name}</div>
      <div class="phase-dates">${p.dates}</div>
      <div class="phase-focus">${p.focus}</div>
    </div>`).join('');
}

function renderAthletes() {
  const g = document.getElementById('athleteTabs');
  g.innerHTML = athletes.map(a => `
    <div class="atab ${a.cls} ${a.id===selAthlete?'active':''}" onclick="selAthlete='${a.id}';render()">
      <div class="atab-label">${a.label}</div>
      <div class="atab-name">${a.name}</div>
      <div class="atab-target">${a.target}</div>
    </div>`).join('');
}

function render() {
  renderPhases();
  renderAthletes();
  const p = phases[selPhase-1];
  const a = athletes.find(x=>x.id===selAthlete);
  // data is expected to be defined in the page scope (keeps large JSON in index.html)
  const d = (typeof window !== 'undefined' && window.data && window.data[selAthlete]) ? window.data[selAthlete][selPhase-1] : {sessions:[],vol:'',int:''};
  const pc = phaseColors[selPhase-1];
  const pb = phaseBg[selPhase-1];
  const panel = document.getElementById('detailPanel');
  panel.innerHTML = `
    <div class="detail-header">
      <div style="flex:1">
        <div class="detail-title">${a.name} - ${p.name}</div>
        <div class="detail-sub">Target: ${a.target} &nbsp;·&nbsp; ${p.sundays} Sundays available</div>
      </div>
      <span class="phase-badge" style="background:${pb};color:${pc};border:0.5px solid ${pc}40">${p.label}</span>
      <span class="phase-badge" style="background:${a.bg};color:${a.color};border:0.5px solid ${a.color}40">${a.label}</span>
    </div>
    <div class="load-bar-wrap">
      <div class="load-bar-label"><span>Volume</span><span>${d.vol}</span></div>
      <div class="load-bar-track"><div class="load-bar-fill" style="width:${p.volume}%;background:${pc}60"></div></div>
    </div>
    <div class="load-bar-wrap" style="margin-bottom:12px">
      <div class="load-bar-label"><span>Intensity</span><span>${d.int}</span></div>
      <div class="load-bar-track"><div class="load-bar-fill" style="width:${p.intensity}%;background:${pc}"></div></div>
    </div>
    <div class="session-grid">
      ${d.sessions.map(s=>`
        <div class="session-block">
          <div class="session-type">${s.type}</div>
          <div class="session-desc">${s.desc}</div>
          ${s.note?`<div class="session-note">${s.note}</div>`:''}
        </div>`).join('')}
    </div>`;
  document.querySelector('.hint').style.display = 'none';
}

// If data is present on the page, render immediately; otherwise fetch it.
if (typeof window !== 'undefined') {
  if (window.data) render();
  else loadData();
}
