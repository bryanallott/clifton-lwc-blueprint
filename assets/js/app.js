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

const phaseColors = ['#888780','#185FA5','#3B6D11','#854F0B','#993C1D'];
const phaseBg    = ['#F1EFE8','#E6F1FB','#EAF3DE','#FAEEDA','#FAECE7'];

const athletes = [
  { id:'sprint',   cls:'a-sprint',   label:'Beach sprinter', name:'Beach sprinter',  target:'12 × 90m soft sand', color:'#534AB7', bg:'#EEEDFE' },
  { id:'swim',     cls:'a-swim',     label:'Ocean swimmer',  name:'Ocean swimmer',   target:'8 × 400m open water', color:'#0F6E56', bg:'#E1F5EE' },
  { id:'ski',      cls:'a-ski',      label:'Surfski',        name:'Surfski paddler', target:'8 × 1000m sprints',   color:'#185FA5', bg:'#E6F1FB' },
  { id:'board',    cls:'a-board',    label:'Board paddler',  name:'Board paddler',   target:'8 × 600m sprints',    color:'#854F0B', bg:'#FAEEDA' },
  { id:'allround', cls:'a-allround', label:'All-rounder',    name:'All-rounder',     target:'Multi-discipline',     color:'#993C1D', bg:'#FAECE7' },
  { id:'pool',     cls:'a-pool',     label:'Pool rescue',    name:'Pool rescue',     target:'12 × 50–200m sprints', color:'#3B6D11', bg:'#EAF3DE' },
];

// For very small static site, data may be embedded on the page.
// Otherwise load it from `assets/data.json` and then render.
function loadData() {
  return fetch('assets/data.json')
    .then(r => {
      if (!r.ok) throw new Error('Failed to load data.json ' + r.status);
      return r.json();
    })
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
