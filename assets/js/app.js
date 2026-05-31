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

const phaseColors = ['#C4A87A','#4A9FD4','#5EBF8A','#E0A040','#E04040'];
const phaseBg    = ['#1E1912','#0B1E2E','#0C1E12','#231500','#220808'];

const athletes = [
  {
    id:'sprint', cls:'a-sprint', label:'Beach sprinter', name:'Beach sprinter',
    target:'12 × 90m soft sand', color:'#8888E8', bg:'#120E28',
    compLoad: {
      narrative: 'Sprint athletes need to be ready to race <strong>multiple times per day</strong> across individual and relay events. Beach Flags is the outlier - a winner at LWC has run between <strong>12 and 20 rounds</strong>, a very different fatigue profile to the sprint. Coaches should expect <strong>4 efforts per session minimum</strong>; flag athletes progressing deep into the draw need active recovery and composure between rounds, not just physical freshness. Additionally, the mixed Ocean relay and Ocean relay events could see sprinters running 3 races per heat over 30-50m including incredibly sharp turns and knee-depth wading.',
      genders: [
        { label:'Male', events:[
          { name:'Beach Sprint', pips:['heat','heat','heat','final'], note:'4 races · A &amp; B final' },
          { name:'Beach Flags',  pips:['heat','heat','heat','final'], note:'12 to semi · 20 to win' },
          { name:'Beach Relay',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Tube Rescue',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Ocean Relay',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Ocean Relay (Mixed)',  pips:['final'], note:'1 race' },
        ]},
        { label:'Female', events:[
          { name:'Beach Sprint', pips:['heat','heat','heat','final'], note:'4 races · A &amp; B final' },
          { name:'Beach Flags',  pips:['heat','heat','heat','final'], note:'12 to semi · 20 to win' },
          { name:'Beach Relay',  pips:['heat','heat','final'],        note:'3 races · A &amp; B final' },
          { name:'Tube Rescue',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Ocean Relay',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Ocean Relay (Mixed)',  pips:['final'], note:'1 race' },
        ]},
      ],
    },
  },
  {
    id:'swim', cls:'a-swim', label:'Ocean swimmer', name:'Ocean swimmer',
    target:'8 × 400m open water', color:'#3BBCD8', bg:'#041820',
    compLoad: {
      narrative: 'On paper the lightest load - 3 swims, a relay on top. But ocean swims at LWC are not pool swims. Conditions in PE in November can be serious, and a hard 3-race campaign in real ocean leaves athletes far more depleted than numbers suggest. Female athletes in the mixed relay face a <strong>third event commitment</strong>. <strong>Athletes who underestimate ocean fatigue get found out in finals.</strong>',
      genders: [
        { label:'Male', events:[
          { name:'Ocean Swim',  pips:['heat','heat','final'], note:'3 races' },
          { name:'Ocean Relay', pips:['heat','heat','final'], note:'3 races' },
          { name:'Tube Rescue', pips:['heat','heat','final'], note:'3 races' },
          { name:'Board Rescue', pips:['heat','heat','final'], note:'3 races' },
          { name:'Ocean Relay (Mixed)', pips:['final'],               note:'1 race'  },
        ]},
        { label:'Female', events:[
          { name:'Ocean Swim',          pips:['heat','heat','final'], note:'3 races' },
          { name:'Ocean Relay',         pips:['heat','final'],        note:'2 races' },
          { name:'Tube Rescue', pips:['heat','heat','final'], note:'3 races' },
          { name:'Board Rescue', pips:['heat','heat','final'], note:'3 races' },
          { name:'Ocean Relay (Mixed)', pips:['final'],               note:'1 race'  },
        ]},
      ],
    },
  },
  {
    id:'ski', cls:'a-ski', label:'Surfski', name:'Surfski paddler',
    target:'8 × 1000m sprints', color:'#4A9FD4', bg:'#0B1E2E',
    compLoad: {
      narrative: 'Ski races at LWC are long and technically demanding - ocean conditions, surf launches, and buoy rounding all factor in. Males face <strong>4 races to get through the draw</strong>; females, 3. The individual nature of ski means every race counts - no teammate to compensate. <strong>Athletes need to produce race-quality effort on consecutive days</strong>, which is why Phase 4 builds toward 8 × 1000m: it simulates cumulative load, not just a single race peak.',
      genders: [
        { label:'Male',   events:[
          { name:'Ocean Ski', pips:['heat','heat','heat','final'], note:'4 races' },
          { name:'Ocean Relay',  pips:['heat','heat','final'],        note:'3 races' },
          { name:'Ocean Relay (Mixed)', pips:['final'],                      note:'1 race'  },
        ] },
        { label:'Female', events:[
          { name:'Ocean Ski', pips:['heat','heat','final'],        note:'3 races' },
          { name:'Ocean Relay',  pips:['heat','heat','final'],        note:'3 races' },
          { name:'Ocean Relay (Mixed)', pips:['final'],                      note:'1 race'  },
        ] },
      ],
    },
  },
  {
    id:'board', cls:'a-board', label:'Board paddler', name:'Board paddler',
    target:'8 × 600m sprints', color:'#E0A040', bg:'#231500',
    compLoad: {
      narrative: 'Board paddlers carry a <strong>double event commitment</strong> - race and rescue - with different pacing demands for each. Athletes in both events face <strong>7 starts across the campaign</strong>, most in open surf. The A &amp; B final in rescue means no team sits out regardless of heat result. <strong>Cumulative paddling volume at LWC will exceed any single training week</strong> - plan genuine recovery between event days.',
      genders: [
        { label:'Male', events:[
          { name:'Board Race',   pips:['heat','heat','heat','final'], note:'4 races' },
          { name:'Board Rescue', pips:['heat','heat','final'],        note:'3 races · A &amp; B final' },
          { name:'Ocean Relay',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Ocean Relay (Mixed)',  pips:['final'], note:'1 race' },
        ]},
        { label:'Female', events:[
          { name:'Board Race',   pips:['heat','heat','heat','final'], note:'4 races' },
          { name:'Board Rescue', pips:['heat','heat','final'],        note:'3 races · A &amp; B final' },
          { name:'Ocean Relay',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Ocean Relay (Mixed)',  pips:['final'], note:'1 race' },
        ]},
      ],
    },
  },
  {
    id:'allround', cls:'a-allround', label:'All-rounder', name:'All-rounder',
    target:'Multi-discipline', color:'#E04040', bg:'#220808',
    compLoad: {
      narrative: 'A fully nominated all-round athlete is looking at <strong>up to 17–19 individual starts</strong> - more than any other discipline. No specialist at LWC carries this load. The mandatory recovery weeks in Phase 4 exist precisely for this reason. <strong>Coaches must be deliberate about event nomination</strong> - the Phase 5 instruction to sharpen the strongest scoring event first is not optional. You cannot peak everything. Transitions are where iron races are won; the last sprint leg is where they\'re lost if fatigue management across the week has been poor.',
      genders: [
        { label:'Male', events:[
          { name:'Board Race',   pips:['heat','heat','heat','final'], note:'4 races' },
          { name:'Ocean Swim',   pips:['heat','heat','final'],        note:'3 races' },
          { name:'Beach Sprint', pips:['heat','heat','heat','final'], note:'4 · A &amp; B final' },
          { name:'Beach Relay',  pips:['heat','heat','final'],        note:'3 · A &amp; B final' },
          { name:'Ocean Relay',  pips:['heat','heat','final'],        note:'3 races' },
          { name:'Ocean Relay (Mixed)', pips:['final'],                      note:'1 race'  },
          { name:'Iron',  pips:['heat','heat','heat','heat','final'],        note:'5 races' },
        ]},
        { label:'Female', events:[
          { name:'Board Race',          pips:['heat','heat','heat','final'], note:'4 races' },
          { name:'Ocean Swim',          pips:['heat','heat','final'],        note:'3 races' },
          { name:'Beach Sprint',        pips:['heat','heat','heat','final'], note:'4 · A &amp; B final' },
          { name:'Beach Relay',         pips:['heat','final'],               note:'3 · A &amp; B final' },
          { name:'Ocean Relay',         pips:['heat','final'],               note:'2 races' },
          { name:'Ocean Relay (Mixed)', pips:['final'],                      note:'1 race'  },
          { name:'Iron',  pips:['heat','heat','heat','heat','final'],        note:'5 races' },
        ]},
      ],
    },
  },
  {
    id:'pool', cls:'a-pool', label:'Pool rescue', name:'Pool rescue',
    target:'12 × 50–200m sprints', color:'#5EBF8A', bg:'#0C1E12',
    compLoad: {
      narrative: 'Pool rescue at LWC is deceptively demanding. <strong>Tube rescue is a paired event requiring synchronised execution under pressure</strong> - mistakes in sequence get penalised on the world stage. The A &amp; B final means every pair races again regardless of heat result. The program builds to <strong>12 × 50m race-pace reps</strong> in Phase 4 because total accumulated effort across the draw is closer to that number than athletes expect. <strong>Technical perfection under fatigue must be earned in Phase 3 - errors at race pace need to be ironed out well before comp week.</strong>',
      genders: [
        { label:'Male',   events:[
          { name:'Tube Rescue', pips:['heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Pool Events Individual x6',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Pool Events Relay x4',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
        ] },
        { label:'Female', events:[
          { name:'Tube Rescue', pips:['heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Pool Events Individual x6',  pips:['heat','heat','final'], note:'3 races · A &amp; B final' },
          { name:'Pool Events Relay x4',  pips:['heat','heat','heat','final'], note:'3 races · A &amp; B final' },
        ] },
      ],
    },
  },
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

function pipHtml(arr) {
  return arr.map(t => `<div class="pip ${t}"></div>`).join('');
}

function buildCompLoad(a) {
  if (!a.compLoad) return '';
  const cl = a.compLoad;
  const cols = cl.genders.map(g => `
    <div>
      <div class="comp-gender-label">${g.label}</div>
      ${g.events.map(e => `
        <div class="event-row">
          <span class="event-name">${e.name}</span>
          <div class="event-load">
            <div class="race-pips">${pipHtml(e.pips)}</div>
            <span class="load-note">${e.note}</span>
          </div>
        </div>`).join('')}
    </div>`).join('');
  return `
    <div class="comp-load">
      <div class="comp-load-header"><div class="comp-load-label">Expected Competition Load at LWC</div></div>
      <div class="comp-load-body">${cols}</div>
      <div class="comp-narrative">${cl.narrative}</div>
      <div class="pip-legend">
        <div class="legend-item"><div class="pip heat"></div> Heat / round</div>
        <div class="legend-item"><div class="pip final"></div> Final</div>
      </div>
    </div>`;
}

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
  const compLoadEl = document.getElementById('compLoadPanel');
  if (compLoadEl) compLoadEl.innerHTML = buildCompLoad(a);

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
