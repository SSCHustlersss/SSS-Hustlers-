// ==========================================
// PART 3 — JAVASCRIPT PART A (FIXED)
// Paste this inside <script> tag
// ==========================================

const SUPABASE_URL = 'https://wwfhoyxqlversdkdqcgd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3ZmhveXhxbHZlcnNka2RxY2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDAwMTMsImV4cCI6MjA4ODQ3NjAxM30.qaQp8LJXGxN6EfOoNPOgdhdNqY7M0nC2aR8fBSYejrw';
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// FIX Bug #20: EXAM_LABELS define kiya
const EXAM_LABELS = {
  ssc_cgl:     'SSC CGL',
  ssc_chsl:    'SSC CHSL',
  ssc_mts:     'SSC MTS',
  ssc_gd:      'SSC GD',
  ntpc:        'NTPC',
  ssc_steno:   'SSC Steno',
  ssc_phase14: 'Phase XIV',
  civil:       'Civil Exams',
};

const SUBJECTS_MAP = {
  ssc_cgl: [
    { key:'maths',         label:'Quantitative Aptitude', icon:'🔢', cls:'maths'   },
    { key:'english',       label:'English',               icon:'📖', cls:'english'  },
    { key:'reasoning',     label:'Reasoning',             icon:'🧠', cls:'reasoning'},
    { key:'ga',            label:'General Awareness',     icon:'🌍', cls:'ga'       },
    { key:'current_affairs',label:'Current Affairs',     icon:'📰', cls:'ca'       },
    { key:'full_test',     label:'Full Test',             icon:'📋', cls:'fulltest' },
  ],
  ssc_chsl: [
    { key:'maths',         label:'Quantitative Aptitude', icon:'🔢', cls:'maths'   },
    { key:'english',       label:'English',               icon:'📖', cls:'english'  },
    { key:'reasoning',     label:'Reasoning',             icon:'🧠', cls:'reasoning'},
    { key:'ga',            label:'General Awareness',     icon:'🌍', cls:'ga'       },
    { key:'current_affairs',label:'Current Affairs',     icon:'📰', cls:'ca'       },
    { key:'full_test',     label:'Full Test',             icon:'📋', cls:'fulltest' },
  ],
  ssc_mts: [
    { key:'reasoning',     label:'Reasoning',             icon:'🧠', cls:'reasoning'},
    { key:'english',       label:'English',               icon:'📖', cls:'english'  },
    { key:'ga',            label:'General Awareness',     icon:'🌍', cls:'ga'       },
    { key:'current_affairs',label:'Current Affairs',     icon:'📰', cls:'ca'       },
    { key:'full_test',     label:'Full Test',             icon:'📋', cls:'fulltest' },
  ],
  ssc_gd: [
    { key:'maths',         label:'Quantitative Aptitude', icon:'🔢', cls:'maths'   },
    { key:'english',       label:'English',               icon:'📖', cls:'english'  },
    { key:'reasoning',     label:'Reasoning',             icon:'🧠', cls:'reasoning'},
    { key:'ga',            label:'General Awareness',     icon:'🌍', cls:'ga'       },
    { key:'current_affairs',label:'Current Affairs',     icon:'📰', cls:'ca'       },
    { key:'full_test',     label:'Full Test',             icon:'📋', cls:'fulltest' },
  ],
  ntpc: [
    { key:'maths',         label:'Quantitative Aptitude', icon:'🔢', cls:'maths'   },
    { key:'english',       label:'English',               icon:'📖', cls:'english'  },
    { key:'reasoning',     label:'Reasoning',             icon:'🧠', cls:'reasoning'},
    { key:'ga',            label:'General Awareness',     icon:'🌍', cls:'ga'       },
    { key:'current_affairs',label:'Current Affairs',     icon:'📰', cls:'ca'       },
    { key:'full_test',     label:'Full Test',             icon:'📋', cls:'fulltest' },
  ],
  ssc_steno: [
    { key:'english',       label:'English',               icon:'📖', cls:'english'  },
    { key:'reasoning',     label:'Reasoning',             icon:'🧠', cls:'reasoning'},
    { key:'ga',            label:'General Awareness',     icon:'🌍', cls:'ga'       },
    { key:'full_test',     label:'Full Test',             icon:'📋', cls:'fulltest' },
  ],
  ssc_phase14: [
    { key:'maths',         label:'Quantitative Aptitude', icon:'🔢', cls:'maths'   },
    { key:'english',       label:'English',               icon:'📖', cls:'english'  },
    { key:'reasoning',     label:'Reasoning',             icon:'🧠', cls:'reasoning'},
    { key:'ga',            label:'General Awareness',     icon:'🌍', cls:'ga'       },
    { key:'full_test',     label:'Full Test',             icon:'📋', cls:'fulltest' },
  ],
  civil: [
    { key:'maths',         label:'Quantitative Aptitude', icon:'🔢', cls:'maths'   },
    { key:'english',       label:'English',               icon:'📖', cls:'english'  },
    { key:'reasoning',     label:'Reasoning',             icon:'🧠', cls:'reasoning'},
    { key:'ga',            label:'General Awareness',     icon:'🌍', cls:'ga'       },
    { key:'full_test',     label:'Full Test',             icon:'📋', cls:'fulltest' },
  ],
};

// FIX Bug #21: TOPICS_MAP define kiya
const TOPICS_MAP = {
  maths: [
    { key:'number_system',       label:'Number System',          icon:'🔢', cls:'maths' },
    { key:'simplification',      label:'Simplification',         icon:'➗', cls:'maths' },
    { key:'hcf_lcm',             label:'HCF & LCM',              icon:'🔣', cls:'maths' },
    { key:'percentage',          label:'Percentage',             icon:'💯', cls:'maths' },
    { key:'profit_loss',         label:'Profit & Loss',          icon:'💰', cls:'maths' },
    { key:'simple_interest',     label:'Simple Interest',        icon:'🏦', cls:'maths' },
    { key:'compound_interest',   label:'Compound Interest',      icon:'📈', cls:'maths' },
    { key:'ratio_proportion',    label:'Ratio & Proportion',     icon:'⚖️', cls:'maths' },
    { key:'average',             label:'Average',                icon:'📊', cls:'maths' },
    { key:'age_problems',        label:'Age Problems',           icon:'👴', cls:'maths' },
    { key:'time_work',           label:'Time & Work',            icon:'⏱️', cls:'maths' },
    { key:'pipe_cistern',        label:'Pipe & Cistern',         icon:'🚰', cls:'maths' },
    { key:'time_speed_distance', label:'Time Speed Distance',    icon:'🚗', cls:'maths' },
    { key:'train_problems',      label:'Train Problems',         icon:'🚂', cls:'maths' },
    { key:'boat_stream',         label:'Boat & Stream',          icon:'🚤', cls:'maths' },
    { key:'mensuration_2d',      label:'Mensuration 2D',         icon:'📐', cls:'maths' },
    { key:'mensuration_3d',      label:'Mensuration 3D',         icon:'📦', cls:'maths' },
    { key:'algebra',             label:'Algebra',                icon:'🔡', cls:'maths' },
    { key:'trigonometry',        label:'Trigonometry',           icon:'📐', cls:'maths' },
    { key:'geometry',            label:'Geometry',               icon:'🔷', cls:'maths' },
    { key:'data_interpretation', label:'Data Interpretation',    icon:'📉', cls:'maths' },
    { key:'statistics',          label:'Statistics',             icon:'📋', cls:'maths' },
    { key:'maths_full_test',     label:'Full Test',              icon:'📋', cls:'fulltest' },
  ],
  reasoning: [
    { key:'analogy',              label:'Analogy',                icon:'🔗', cls:'reasoning' },
    { key:'classification',       label:'Classification',         icon:'🗂️', cls:'reasoning' },
    { key:'series',               label:'Series',                 icon:'🔢', cls:'reasoning' },
    { key:'coding_decoding',      label:'Coding-Decoding',        icon:'🔐', cls:'reasoning' },
    { key:'blood_relations',      label:'Blood Relations',        icon:'👨‍👩‍👧', cls:'reasoning' },
    { key:'direction_distance',   label:'Direction & Distance',   icon:'🧭', cls:'reasoning' },
    { key:'ranking_order',        label:'Ranking & Order',        icon:'🏅', cls:'reasoning' },
    { key:'puzzle',               label:'Puzzle',                 icon:'🧩', cls:'reasoning' },
    { key:'syllogism',            label:'Syllogism',              icon:'💭', cls:'reasoning' },
    { key:'venn_diagram',         label:'Venn Diagram',           icon:'⭕', cls:'reasoning' },
    { key:'statement_conclusion', label:'Statement & Conclusion', icon:'📢', cls:'reasoning' },
    { key:'missing_number',       label:'Missing Number',         icon:'❓', cls:'reasoning' },
    { key:'mirror_water_image',   label:'Mirror & Water Image',   icon:'🪞', cls:'reasoning' },
    { key:'paper_folding',        label:'Paper Folding',          icon:'📄', cls:'reasoning' },
    { key:'dice',                 label:'Dice',                   icon:'🎲', cls:'reasoning' },
    { key:'alphabet_test',        label:'Alphabet Test',          icon:'🔤', cls:'reasoning' },
    { key:'mathematical_ops',     label:'Mathematical Operations',icon:'➕', cls:'reasoning' },
    { key:'reasoning_full_test',  label:'Full Test',              icon:'📋', cls:'fulltest' },
  ],
  ga: [
    { key:'ancient_history',  label:'Ancient History',     icon:'🏛️', cls:'ga' },
    { key:'medieval_history', label:'Medieval History',    icon:'⚔️', cls:'ga' },
    { key:'modern_history',   label:'Modern History',      icon:'🗺️', cls:'ga' },
    { key:'geography',        label:'Geography',           icon:'🌍', cls:'ga' },
    { key:'indian_polity',    label:'Indian Polity',       icon:'⚖️', cls:'ga' },
    { key:'indian_economy',   label:'Indian Economy',      icon:'📈', cls:'ga' },
    { key:'physics',          label:'Physics',             icon:'⚡', cls:'ga' },
    { key:'chemistry',        label:'Chemistry',           icon:'🧪', cls:'ga' },
    { key:'biology',          label:'Biology',             icon:'🧬', cls:'ga' },
    { key:'computer',         label:'Computer',            icon:'💻', cls:'ga' },
    { key:'sports',           label:'Sports',              icon:'🏆', cls:'ga' },
    { key:'awards_honours',   label:'Awards & Honours',    icon:'🎖️', cls:'ga' },
    { key:'books_authors',    label:'Books & Authors',     icon:'📚', cls:'ga' },
    { key:'important_days',   label:'Important Days',      icon:'📅', cls:'ga' },
    { key:'govt_schemes',     label:'Government Schemes',  icon:'🏛️', cls:'ga' },
    { key:'full_test',           label:'Full Test',           icon:'📋', cls:'fulltest' },
  ],
  english: [
    { key:'reading_comp',     label:'Reading Comprehension',icon:'📖', cls:'english' },
    { key:'fill_blanks',      label:'Fill in the Blanks',   icon:'✏️', cls:'english' },
    { key:'error_spotting',   label:'Error Spotting',       icon:'🔍', cls:'english' },
    { key:'synonyms',         label:'Synonyms',             icon:'🔤', cls:'english' },
    { key:'antonyms',         label:'Antonyms',             icon:'↔️', cls:'english' },
    { key:'idioms_phrases',   label:'Idioms & Phrases',     icon:'💬', cls:'english' },
    { key:'one_word',         label:'One Word Substitution',icon:'📝', cls:'english' },
    { key:'spelling',         label:'Spelling Correction',  icon:'✅', cls:'english' },
    { key:'sentence_imp',     label:'Sentence Improvement', icon:'📋', cls:'english' },
    { key:'cloze_test',       label:'Cloze Test',           icon:'📄', cls:'english' },
    { key:'english_full_test',label:'Full Test',            icon:'📋', cls:'fulltest' },
  ],
};

function getSubjects() {
  return SUBJECTS_MAP[currentExam] || SUBJECTS_MAP['ssc_cgl'];
}

let currentExam = 'ssc_cgl', currentSubject = null, currentCategory = null, currentTopic = null, currentUser = null;
let questions = [], currentQ = 0, answers = {}, timerInterval = null;
let timeLeft = 0, posMarking = 1, negMarking = 0, activeTestName = '';
let isPaused = false;

// ── SECTION SYSTEM ──
let sections = [], currentSection = 0;
const SSC_SECTION_MAP = {
  reasoning: { label: 'General Intelligence & Reasoning', order: 0 },
  quant:     { label: 'Quantitative Aptitude',            order: 1 },
  gk:        { label: 'General Awareness',                order: 2 },
  english:   { label: 'English Comprehension',            order: 3 },
};
const SECTION_KEYWORDS = {
  reasoning: ['reasoning','intelligence','general intelligence','logical'],
  quant:     ['quant','quantitative','math','maths','mathematics','numerical'],
  gk:        ['gk','general awareness','awareness','general knowledge','gs'],
  english:   ['english','comprehension','language','grammar','vocabulary'],
};
function detectSectionKey(subject) {
  const s = (subject||'').toLowerCase().trim();
  for (const [key, kws] of Object.entries(SECTION_KEYWORDS)) {
    if (kws.some(k => s.includes(k))) return key;
  }
  return null;
}
function buildSections() {
  const wrap = document.getElementById('sectionTabsWrap');
  const total = questions.length;

  // Sirf 50+ questions pe sections dikhao
  if (total < 50) {
    sections = [];
    if (wrap) wrap.style.display = 'none';
    return;
  }

  // Fixed ranges: Q1-25 Reasoning, Q26-50 GK, Q51-75 Maths, Q76-100 English
  const FIXED = [
    { key:'reasoning', label:'General Intelligence & Reasoning', from:0,  to:24  },
    { key:'gk',        label:'General Awareness',                from:25, to:49  },
    { key:'quant',     label:'Quantitative Aptitude',            from:50, to:74  },
    { key:'english',   label:'English Comprehension',            from:75, to:99  },
  ];

  sections = FIXED
    .filter(s => s.from < total)
    .map(s => ({
      key:     s.key,
      label:   s.label,
      indices: Array.from({ length: Math.min(s.to, total-1) - s.from + 1 }, (_, i) => s.from + i)
    }));

  if (!wrap) return;
  if (sections.length <= 1) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  currentSection = 0;

  // Initialize per-section timers (15 min each = 900s), only if not resuming
  if (!window._sectionTimers || window._sectionTimers.length !== sections.length) {
    window._sectionTimers = sections.map(() => 15 * 60);
    window._currentSecTimer = null;
  }

  renderSectionTabs();
}

function renderSectionTabs() {
  const el = document.getElementById('sectionTabs');
  if (!el) return;

  // Determine which section is currently active (by timer)
  let currentActiveSec = currentSection;
  if (window._sectionTimers && window._sectionTimers.length > 0) {
    const activeSec = window._sectionTimers.findIndex(t => t > 0);
    currentActiveSec = activeSec === -1 ? sections.length : activeSec;
  }

  el.innerHTML = sections.map((sec, si) => {
    const ans = sec.indices.filter(i => qStatus[i]==='answered'||qStatus[i]==='ans_marked').length;
    const total = sec.indices.length;
    const isActive = si === currentSection;

    // Lock logic: past sections (si < currentActiveSec) are locked, future sections too
    const isPast   = si < currentActiveSec;
    const isFuture = si > currentActiveSec;
    const isLocked = isPast || isFuture;

    // Timer display for current active section
    let timerBadge = '';
    if (window._sectionTimers && si === currentActiveSec && window._sectionTimers[si] > 0) {
      const m = Math.floor(window._sectionTimers[si] / 60).toString().padStart(2,'0');
      const s = (window._sectionTimers[si] % 60).toString().padStart(2,'0');
      const secLeft = window._sectionTimers[si];
      const color = secLeft <= 120 ? '#ff2222' : secLeft <= 300 ? '#ff8800' : '#00c853';
      timerBadge = `<span style="font-size:0.65rem;font-weight:800;color:${color};margin-left:4px;">⏱${m}:${s}</span>`;
    }

    const lockIcon = isPast ? ' 🔒' : isFuture ? ' ⏳' : '';
    const opacity  = isLocked ? 'opacity:0.5;cursor:not-allowed;' : '';

    return `<button class="sec-tab ${isActive?'active':''}" onclick="switchSection(${si})" style="${opacity}">
      ${sec.label}${lockIcon}${timerBadge}
      <span class="sec-tab-badge ${ans>0?'sec-tab-ans':''}">${ans}/${total}</span>
    </button>`;
  }).join('');
}

function switchSection(si) {
  // FIX: Section tabs locked — sirf current ya past sections pe ja sakte hain
  // (Section timers active hote waqt future/current section tab click nahi ho sakta)
  if (window._sectionTimers && window._sectionTimers.length > 0) {
    // Find which section is currently active by timer
    const activeSec = window._sectionTimers.findIndex(t => t > 0);
    const currentActiveSec = activeSec === -1 ? sections.length : activeSec;
    if (si > currentActiveSec) {
      // Future section — block
      return;
    }
    if (si === currentActiveSec) {
      // Current section — allow (same as current)
    }
    // Past sections — BLOCK (permanently locked)
    if (si < currentActiveSec) {
      return;
    }
  }
  currentSection = si;
  renderSectionTabs();
  const firstIdx = sections[si]?.indices[0];
  if (firstIdx !== undefined) showQuestion(firstIdx);
  renderQNavDots();
}
let isOnline = navigator.onLine;
let lockedAnswers = new Set();
let pendingAnswer = null;

// FIX Bug #22: esc() function — XSS prevention
function esc(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#39;');
}

// ── Helper: user names fetch ──
async function fetchNames(userIds) {
  const nm = {};
  try {
    const { data: lb } = await sb.from('leaderboard').select('user_id,full_name').in('user_id', userIds);
    (lb||[]).forEach(p => { if(p.full_name) nm[p.user_id] = p.full_name; });
  } catch(e) {}
  userIds.forEach(id => {
    if (!nm[id] && id === currentUser?.id) {
      nm[id] = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'You';
    }
  });
  return nm;
}

// ============ LANGUAGE TOGGLE ============
let currentLang = 'en';
let hasHindi = false;

function hasDevanagari(text) {
  return /[\u0900-\u097F]/.test(text || '');
}

function extractFigures(text) {
  if (!text) return { figures: '', text: '' };
  if (text.includes('&lt;svg') || text.includes('&lt;figure') || text.includes('&lt;img')) {
    const tmp = document.createElement('textarea');
    tmp.innerHTML = text;
    text = tmp.value;
  }
  text = text.replace(/__SVG__/gi, '');
  text = text.replace(/<\s+(viewBox\s*=)/gi, '<svg $1');
  text = text.replace(/<\s+(xmlns\s*=)/gi, '<svg $1');
  const openCount  = (text.match(/<svg[\s>]/gi) || []).length;
  const closeCount = (text.match(/<\/svg>/gi) || []).length;
  if (openCount > closeCount) text = text + '</svg>'.repeat(openCount - closeCount);
  const figures = [];
  let t = text;
  t = t.replace(/<figure[\s\S]*?<\/figure>/gi, m => { figures.push(m); return ''; });
  t = t.replace(/<svg[\s\S]*?<\/svg>/gi, m => { figures.push(m); return ''; });
  t = t.replace(/<img[^>]*\/?>/gi, m => { figures.push(m); return ''; });
  return { figures: figures.join(''), text: t };
}

function getLangText(text) {
  if (!text) return '';
  text = text.replace(/\s*[-_]{0,2}SVG[-_]{0,2}\s*/gi, ' ').trim();
  const { figures, text: noFig } = extractFigures(text);
  const fig = figures || '';
  if (!hasDevanagari(noFig)) return fig + noFig.trim();
  const lines = noFig.split('\n').map(l => l.trim()).filter(Boolean);
  const enLines = [], hiLines = [], neutralLines = [];
  for (const l of lines) {
    if (/[\u0900-\u097F]/.test(l)) hiLines.push(l);
    else if (!/[a-zA-Z]/.test(l)) neutralLines.push(l);
    else if (/^[A-Z0-9\s:,\.?!@#$%&*()\-_+=\[\]{}|<>\/\\'"~`]+$/.test(l)) neutralLines.push(l);
    else enLines.push(l);
  }
  if (currentLang === 'en') {
    const result = [...enLines, ...neutralLines].join('\n');
    // FIX Bug #17: Agar sirf Hindi question hai aur English toggle karo toh original dikhao
    return fig + (result.trim() || noFig.trim());
  }
  if (hiLines.length === 0) return fig + noFig.trim();
  return fig + [...neutralLines, ...hiLines].join('\n');
}

function setLang(lang) {
  currentLang = lang;
  document.getElementById('langEN').classList.toggle('active', lang === 'en');
  document.getElementById('langHI').classList.toggle('active', lang === 'hi');
  renderQuestionContent(currentQ);
}

function detectHindi() {
  hasHindi = questions.some(q =>
    hasDevanagari(q.question_text) || hasDevanagari(q.option_a) || hasDevanagari(q.option_b)
  );
  document.getElementById('langToggle').style.display = hasHindi ? 'flex' : 'none';
  if (!hasHindi) currentLang = 'en';
}

function renderQuestionContent(idx) {
  const q = questions[idx];
  const total = questions.length;

  // Section-aware question number
  if (sections.length > 1) {
    // Auto-switch active section tab
    const secIdx = sections.findIndex(s => s.indices.includes(idx));
    if (secIdx !== -1 && secIdx !== currentSection) currentSection = secIdx;

    const sec = sections[currentSection];
    const posInSec = (sec?.indices.indexOf(idx) ?? 0) + 1;
    const secTotal = sec?.indices.length ?? total;
    document.getElementById('qNumber').textContent = `${sec?.label||''} — Q${posInSec} of ${secTotal}`;
    document.getElementById('quizProgressText').textContent = `${posInSec}/${secTotal}`;
    document.getElementById('quizProgressFill').style.width = (posInSec/secTotal*100) + '%';

    // Prev/Next/Submit section-aware
    const pos = sec?.indices.indexOf(idx) ?? 0;
    const isFirstOverall = currentSection === 0 && pos === 0;
    const isLastInSec = sec && pos === sec.indices.length - 1;
    const isLastSec = currentSection === sections.length - 1;
    document.getElementById('btnPrev').style.display   = isFirstOverall ? 'none' : 'inline-block';
    document.getElementById('btnNext').style.display   = (isLastInSec && isLastSec) ? 'none' : 'inline-block';
    document.getElementById('btnSubmit').style.display = (isLastInSec && isLastSec) ? 'inline-block' : 'none';
  } else {
    document.getElementById('qNumber').textContent = `Question ${idx+1} of ${total}`;
    document.getElementById('quizProgressText').textContent = `${idx+1}/${total}`;
    document.getElementById('quizProgressFill').style.width = ((idx+1)/total*100) + '%';
    document.getElementById('btnPrev').style.display   = idx===0 ? 'none':'inline-block';
    document.getElementById('btnNext').style.display   = idx===total-1 ? 'none':'inline-block';
    document.getElementById('btnSubmit').style.display = idx===total-1 ? 'inline-block':'none';
  }

  document.getElementById('qText').innerHTML = getLangText(q.question_text);
  const imgWrap = document.getElementById('qImageWrap');
  const imgEl   = document.getElementById('qImage');
  if (q.question_image) {
    imgEl.src = q.question_image;
    imgWrap.style.display = 'block';
  } else {
    imgEl.src = '';
    imgWrap.style.display = 'none';
  }
  const selected = answers[idx];
  const opts = [
    {k:'A', txt: getLangText(q.option_a), img: q.option_a_image},
    {k:'B', txt: getLangText(q.option_b), img: q.option_b_image},
    {k:'C', txt: getLangText(q.option_c), img: q.option_c_image},
    {k:'D', txt: getLangText(q.option_d), img: q.option_d_image}
  ];
  const hasImgOpts = opts.some(o => o.img);
  if (hasImgOpts) {
    document.getElementById('optionsList').className = 'options-img-grid';
    document.getElementById('optionsList').innerHTML = opts.map(o => {
      let cls = 'option-img-btn';
      if (o.k === selected) cls += ' selected';
      const content = o.img
        ? `<img src="${o.img}" alt="Option ${o.k}" onclick="event.stopPropagation();openImgZoom('${o.img}')">`
        : `<span>${o.txt||''}</span>`;
      return `<button class="${cls}" onclick="selectOption('${o.k}')">
        <span class="option-label">${o.k}</span>${content}</button>`;
    }).join('');
  } else {
    document.getElementById('optionsList').className = 'options-list';
    document.getElementById('optionsList').innerHTML = opts.map(o => {
      let cls = 'option-btn';
      if (o.k === selected) cls += ' selected';
      return `<button class="${cls}" onclick="selectOption('${o.k}')">
        <span class="option-label">${o.k}</span><span>${o.txt||''}</span></button>`;
    }).join('');
  }
  document.getElementById('explanationBox').classList.remove('show');
  updateBookmarkBtn();
  renderQNavDots();
}

let qStatus = {};
function initQStatus() {
  qStatus = {};
  questions.forEach((q,i) => { qStatus[i] = i===0 ? 'not_answered' : 'not_visited'; });
}
function ntaMarkReview() {
  qStatus[currentQ] = answers[currentQ] ? 'ans_marked' : 'marked';
  renderQNavDots();
  if (currentQ < questions.length-1) showQuestion(currentQ+1);
}
function ntaClearResp() {
  delete answers[currentQ];
  qStatus[currentQ] = 'not_answered';
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  renderQNavDots();
}
function togglePanel() {
  const s = document.getElementById('ntaSidebar');
  const isMob = window.innerWidth <= 600;
  if (isMob) s.classList.toggle('mob-open');
  else s.classList.toggle('collapsed');
  const open = isMob ? s.classList.contains('mob-open') : !s.classList.contains('collapsed');
  document.getElementById('btnTogglePanel').textContent = open ? '📋 Hide' : '📋 Panel';
}

// ============ TEST SEARCH ============
// FIX Bug #13: Search clear karne pe sab tests wapas aate hain
function filterTestList(q) {
  const cards = document.querySelectorAll('#testList .test-card');
  const val = q.trim().toLowerCase();
  let found = 0;
  cards.forEach(card => {
    const name = card.querySelector('.test-name')?.textContent?.toLowerCase() || '';
    const show = !val || name.includes(val);
    card.style.display = show ? '' : 'none';
    if (show) found++;
  });
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';
}

function clearSearch() {
  const bar = document.getElementById('testSearchBar');
  if (bar) { bar.value = ''; filterTestList(''); }
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';
}

// ============ TYPING TEST ============
function openTypingTest() { document.getElementById('typingSelectModal').style.display = 'flex'; }
function closeTypingModal() { document.getElementById('typingSelectModal').style.display = 'none'; }
function goTypingTest(exam) {
  document.getElementById('typingSelectModal').style.display = 'none';
  var modal = document.getElementById('typingCatModal');
  modal.style.display = 'flex';
  modal.dataset.exam = exam;
}
function startTypingWithCat(cat) {
  var exam = document.getElementById('typingCatModal').dataset.exam;
  document.getElementById('typingCatModal').style.display = 'none';
  window.location.href = 'typing.html?exam=' + exam + '&cat=' + cat;
}

// ============ INIT ============
async function init() {
  const { data:{ session } } = await sb.auth.getSession();
  if (!session) { window.location.href = 'index.html'; return; }
  currentUser = session.user;
  document.getElementById('userNameNav').textContent =
    session.user.user_metadata?.full_name || session.user.email.split('@')[0];
  renderSubjects();
  updateBreadcrumb();
  loadNavAvatar();
}

// ============ EXAM TAB ============
function switchExam(exam, btn) {
  currentExam = exam; currentSubject = null; currentCategory = null; currentTopic = null;
  document.querySelectorAll('.exam-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  showView('subjects');
  updateBreadcrumb();
  renderSubjects();
}

// ============ SUBJECTS ============
function renderSubjects() {
  const grid = document.getElementById('subjectGrid');
  grid.innerHTML = getSubjects().map(s => `
    <div class="subject-card ${s.cls}" onclick="openSubject('${s.key}','${s.label}','${s.icon}')">
      <div class="sc-icon-wrap"><span class="sc-icon">${s.icon}</span></div>
      <div class="sc-info">
        <div class="sc-name">${s.label}</div>
        <div class="sc-count" id="cnt-${s.key}">Loading...</div>
      </div>
      <div class="sc-right">
        <button class="btn-open-subj">View Tests →</button>
      </div>
    </div>`).join('') + `
    <div class="subject-card" style="--clr:#00bcd4;">
      <div class="sc-icon-wrap"><span class="sc-icon">⌨️</span></div>
      <div class="sc-info">
        <div class="sc-name">Typing Test</div>
        <div class="sc-count">SSC CGL &amp; CHSL</div>
      </div>
      <div class="sc-right">
        <div style="display:flex;gap:6px;">
          <button class="btn-open-subj" style="background:#1a237e;" onclick="event.stopPropagation();window.location.href='typing.html?exam=ssc_cgl'">CGL</button>
          <button class="btn-open-subj" style="background:#e65100;" onclick="event.stopPropagation();window.location.href='typing.html?exam=ssc_chsl'">CHSL</button>
        </div>
      </div>
    </div>`;
  loadCounts();
}

// ============ LOAD COUNTS ============
async function loadCounts() {
  const subjects = getSubjects();
  for (const s of subjects) {
    try {
      let q = sb.from('quizzes')
        .select('*', { count:'exact', head:true })
        .eq('exam_type', currentExam);
      if (s.key === 'full_test') {
        q = q.eq('topic', 'full_test');
      } else {
        q = q.eq('subject', s.key);
      }
      const { count } = await q;
      const el = document.getElementById('cnt-' + s.key);
      if (el) el.textContent = count > 0 ? count + ' Qs' : 'Coming Soon';
    } catch(e) {
      const el = document.getElementById('cnt-' + s.key);
      if (el) el.textContent = '';
    }
  }
}

// ============ OPEN SUBJECT ============
async function openSubject(key, label, icon) {
  currentSubject = { key, label, icon };
  currentCategory = null;
  currentTopic = null;
  if (TOPICS_MAP[key]) {
    showView('category');
    updateBreadcrumb();
    document.getElementById('categoryTitle').innerHTML = `${icon} ${label} — <span>Select Category</span>`;
  } else {
    await loadTestsForSubject(key, label, icon);
  }
}

// ============ OPEN CATEGORY ============
async function openCategory(cat) {
  currentCategory = cat;
  currentTopic = null;
  updateBreadcrumb();
  if (cat === 'chapter_wise' && TOPICS_MAP[currentSubject.key]) {
    showView('topics');
    document.getElementById('topicsTitle').textContent = `📚 ${currentSubject.label} — Chapter Wise`;
    // FIX: Filter out both 'full_test' and subject-specific full test keys like 'english_full_test'
    const topics = TOPICS_MAP[currentSubject.key].filter(t => !t.key.includes('full_test'));
    const grid = document.getElementById('topicGrid');
    grid.innerHTML = topics.map(t => `
      <button class="subj-tab" onclick="openTopic('${t.key}','${t.label}','${t.icon}',this)">
        ${t.icon} ${t.label}
        <span class="st-count" id="tcnt-${t.key}">...</span>
      </button>`).join('');
    const firstBtn = grid.querySelector('.subj-tab');
    if (firstBtn) firstBtn.click();
    for (const t of topics) {
      const [{ count: count1 }, { count: count2 }] = await Promise.all([
        sb.from('quizzes').select('*', { count:'exact', head:true })
          .eq('exam_type', currentExam).eq('subject', currentSubject.key).eq('topic', t.key),
        sb.from('quizzes').select('*', { count:'exact', head:true })
          .eq('exam_type', currentExam).eq('subject', t.key)
      ]);
      const total = (count1 || 0) + (count2 || 0);
      const el = document.getElementById('tcnt-' + t.key);
      if (el) el.textContent = total > 0 ? `${total} Qs` : '0 Qs';
    }
  } else {
    // FIX: Use subject-specific full_test key if defined in TOPICS_MAP, else default 'full_test'
    const subjectTopics = TOPICS_MAP[currentSubject.key] || [];
    const fullTestEntry = subjectTopics.find(t => t.key.includes('full_test'));
    const fullTestKey = fullTestEntry ? fullTestEntry.key : 'full_test';
    await loadTestsForSubject(currentSubject.key, currentSubject.label, currentSubject.icon, fullTestKey);
  }
}

// ============ OPEN TOPIC ============
async function openTopic(key, label, icon, btnEl) {
  currentTopic = { key, label, icon };
  updateBreadcrumb();
  if (btnEl) {
    document.querySelectorAll('#topicGrid .subj-tab').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  const listEl = document.getElementById('topicTestList');
  if (listEl) listEl.innerHTML = '<div class="loading-box"><span class="spinner"></span>Loading...</div>';
  await loadTestsForSubject(currentSubject.key, label, icon, key, true);
}

// ============ LOAD TESTS ============
async function loadTestsForSubject(subjectKey, label, icon, topicKey, inTopics) {
  const targetEl = inTopics ? 'topicTestList' : 'testList';
  if (!inTopics) {
    showView('tests');
    updateBreadcrumb();
    document.getElementById('testsTitle').textContent = `${icon} ${label} — Tests`;
  }
  document.getElementById(targetEl).innerHTML = '<div class="loading-box"><span class="spinner"></span>Loading tests...</div>';

  let query = sb.from('quizzes')
    .select('test_name, positive_marking, negative_marking, test_duration, total_marks, difficulty, unlock_at, created_at')
    .eq('exam_type', currentExam)
    .not('test_name', 'is', null)
    .order('q_order', { ascending: true });
  // FIX: subject='full_test' ka matlab exam-level full test — topic se filter karo
  if (subjectKey === 'full_test') {
    query = query.eq('topic', 'full_test');
  } else {
    query = query.eq('subject', subjectKey);
    if (topicKey) query = query.eq('topic', topicKey);
  }
  let { data, error } = await query;

  // Fallback: old uploads
  if ((!data || data.length === 0) && topicKey && !topicKey.includes('_full_test')) {
    const fallbackQuery = sb.from('quizzes')
      .select('test_name, positive_marking, negative_marking, test_duration, total_marks, difficulty, unlock_at, created_at')
      .eq('exam_type', currentExam).eq('subject', topicKey)
      .not('test_name', 'is', null).order('q_order', { ascending: true });
    const { data: fallbackData, error: fallbackError } = await fallbackQuery;
    if (!fallbackError && fallbackData && fallbackData.length > 0) { data = fallbackData; error = null; }
  }

  if (error || !data || data.length === 0) {
    document.getElementById(targetEl).innerHTML =
      `<div class="empty-box"><div>📭</div><p>Is subject mein abhi koi test nahi hai.<br>Admin jald hi add karega!</p></div>`;
    return;
  }

  const testMap = {};
  data.forEach(row => {
    if (!row.test_name) return;
    if (!testMap[row.test_name]) testMap[row.test_name] = { count:0, pos:row.positive_marking, neg:row.negative_marking, dur:row.test_duration, total:row.total_marks, diff:row.difficulty, unlock_at:row.unlock_at };
    testMap[row.test_name].count++;
  });

  const tests = Object.entries(testMap);
  const testNames = tests.map(([name]) => name);
  let attemptsMap = {};
  try {
    const { data: attData } = await sb.from('test_attempts')
      .select('test_name, score, total_marks, correct_answers, wrong_answers, questions_attempted, created_at')
      .eq('user_id', currentUser.id)
      .eq('exam_type', currentExam)
      .in('test_name', testNames)
      .order('created_at', { ascending: false });
    if (attData) {
      attData.forEach(row => {
        if (!attemptsMap[row.test_name]) attemptsMap[row.test_name] = [];
        attemptsMap[row.test_name].push(row);
      });
    }
  } catch(e) {}

  document.getElementById(targetEl).innerHTML = '<div class="test-list">' +
    tests.map(([name, info], i) => {
      const attempts = attemptsMap[name] || [];
      const attemptCount = attempts.length;
      const lastAttempt = attempts[attemptCount - 1];
      const now = new Date();
      // FIX Bug #11: IST timezone fix
      const unlockDate = info.unlock_at ? new Date(info.unlock_at) : null;
      const isLocked = unlockDate && unlockDate > now;

      let actionBtn = '';
      let statusTag = '';

      if (isLocked) {
        // FIX Bug #11: IST mein dikhao
        const opts = { timeZone:'Asia/Kolkata', day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', hour12:true };
        const unlockStr = unlockDate.toLocaleString('en-IN', opts);
        actionBtn = `<div class="locked-badge">🔒 Locked<div class="unlock-time">Opens: ${unlockStr}</div></div>`;
      } else if (attemptCount === 0) {
        const savedState = loadQuizState(name);
        // Agar completed flag hai toh Resume mat dikhao
        let isCompleted = false;
        try { isCompleted = !!localStorage.getItem('completed_' + name); } catch(e) {}
        if (isCompleted) { clearQuizState(name); }
        if (!isCompleted && savedState && savedState.timeLeft > 0) {
          const answeredCount = Object.keys(savedState.answers || {}).length;
          const totalQs = savedState.totalQs || info.count;
          const pctDone = totalQs > 0 ? Math.round((answeredCount / totalQs) * 100) : 0;
          const mLeft = Math.floor(savedState.timeLeft / 60);
          const sLeft = savedState.timeLeft % 60;
          const timeStr = `${mLeft}:${String(sLeft).padStart(2,'0')}`;
          statusTag = `<span class="ttag" style="background:#fff3e0;color:#e65100;">⏸ In Progress</span>`;
          actionBtn = `<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;">
            <button class="btn-resume-test" onclick="event.stopPropagation();startQuiz('${esc(name)}')">
              <div class="resume-dot"></div>Resume →
            </button>
            <div class="resume-progress-wrap" style="width:90px;">
              <div class="resume-progress-label"><span>${answeredCount}/${totalQs} done</span><span>${timeStr} left</span></div>
              <div class="resume-progress-bar"><div class="resume-progress-fill" style="width:${pctDone}%"></div></div>
            </div>
          </div>`;
        } else {
          actionBtn = `<button class="btn-start-test" onclick="event.stopPropagation();startQuiz('${esc(name)}')">Start →</button>`;
        }
      } else if (attemptCount === 1) {
        const pct = lastAttempt.total_marks ? Math.round((lastAttempt.score / lastAttempt.total_marks) * 100) : 0;
        const attemptedOn = lastAttempt.created_at ? new Date(lastAttempt.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric', timeZone:'Asia/Kolkata' }) : '';
        statusTag = `<span class="ttag ${pct>=70?'green':pct>=40?'blue':'red'}">${lastAttempt.score}/${lastAttempt.total_marks} · ${pct}%</span>`;
        actionBtn = `<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;">
          <button class="btn-start-test" onclick="event.stopPropagation();viewResult('${esc(name)}')">View Results</button>
          <button class="btn-start-test" style="background:#fff3e0;color:#e65100;border-color:#e65100;font-size:0.72rem;padding:5px 10px;" onclick="event.stopPropagation();reattemptQuiz('${esc(name)}')">Reattempt →</button>
        </div>`;
        statusTag += attemptedOn ? `<span class="ttag" style="background:#f0f4ff;color:#1a237e;">📅 ${attemptedOn}</span>` : '';
      } else {
        const pct = lastAttempt.total_marks ? Math.round((lastAttempt.score / lastAttempt.total_marks) * 100) : 0;
        const attemptedOn = lastAttempt.created_at ? new Date(lastAttempt.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric', timeZone:'Asia/Kolkata' }) : '';
        statusTag = `<span class="ttag ${pct>=70?'green':pct>=40?'blue':'red'}">${lastAttempt.score}/${lastAttempt.total_marks} · ${pct}%</span>`;
        statusTag += attemptedOn ? `<span class="ttag" style="background:#f0f4ff;color:#1a237e;">📅 ${attemptedOn}</span>` : '';
        actionBtn = `<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;">
          <button class="btn-start-test" onclick="event.stopPropagation();viewResult('${esc(name)}')">View Results</button>
          <span style="font-size:0.65rem;color:#aaa;text-align:center;">Max attempts done</span>
        </div>`;
      }

      const totalMarks = info.total || (info.count * (info.pos || 1));
      return `
      <div class="test-card">
        <div class="test-card-left">
          <div class="test-serial">Test ${i+1}</div>
          <div class="test-name">${esc(name)}</div>
          <div class="test-meta">
            <span class="test-meta-item">📝 ${info.count} Qs</span>
            ${info.dur ? `<span class="test-meta-item">⏱ ${info.dur} mins</span>` : ''}
            ${totalMarks ? `<span class="test-meta-item">🏆 ${totalMarks} Marks</span>` : ''}
          </div>
          <div class="test-tags">
            ${info.pos ? `<span class="ttag green">+${info.pos}</span>` : ''}
            ${info.neg ? `<span class="ttag red">-${info.neg}</span>` : ''}
            ${statusTag}
            <span class="ttag">English, Hindi</span>
          </div>
        </div>
        ${actionBtn}
      </div>`;
    }).join('') + '</div>';
}

// ============ BREADCRUMB / VIEW ============
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
}

function updateBreadcrumb() {
  const examLabel = EXAM_LABELS[currentExam] || currentExam;
  let html = '';
  if (currentTopic) {
    html = `<span class="bc-btn" onclick="goBackToSubjects()">← ${examLabel}</span>
            <span class="bc-sep">›</span>
            <span class="bc-btn" onclick="goBackToCategory()">${currentSubject.icon} ${currentSubject.label}</span>
            <span class="bc-sep">›</span>
            <span class="bc-btn" onclick="goBackToTopics()">📚 Chapter Wise</span>
            <span class="bc-sep">›</span>
            <span class="bc-current">${currentTopic.icon} ${currentTopic.label}</span>`;
  } else if (currentCategory === 'full_test') {
    html = `<span class="bc-btn" onclick="goBackToSubjects()">← ${examLabel}</span>
            <span class="bc-sep">›</span>
            <span class="bc-btn" onclick="goBackToCategory()">${currentSubject.icon} ${currentSubject.label}</span>
            <span class="bc-sep">›</span>
            <span class="bc-current">📋 Full Test</span>`;
  } else if (currentCategory === 'chapter_wise') {
    html = `<span class="bc-btn" onclick="goBackToSubjects()">← ${examLabel}</span>
            <span class="bc-sep">›</span>
            <span class="bc-btn" onclick="goBackToCategory()">${currentSubject.icon} ${currentSubject.label}</span>
            <span class="bc-sep">›</span>
            <span class="bc-current">📚 Chapter Wise</span>`;
  } else if (currentSubject) {
    html = `<span class="bc-btn" onclick="goBackToSubjects()">← ${examLabel}</span>
            <span class="bc-sep">›</span>
            <span class="bc-current">${currentSubject.icon} ${currentSubject.label}</span>`;
  } else {
    html = `<span class="bc-current">📝 ${examLabel}</span>`;
  }
  document.getElementById('breadcrumb').innerHTML = html;
}

function goBackToSubjects() { currentSubject=null; currentCategory=null; currentTopic=null; showView('subjects'); updateBreadcrumb(); }
function goBackToCategory() { currentCategory=null; currentTopic=null; showView('category'); updateBreadcrumb(); }
function goBackToTopics()   { currentTopic=null; showView('topics'); updateBreadcrumb(); }

// ============ START QUIZ ============
async function startQuiz(testName) {
  if (!currentSubject) return;
  // FIX Bug #4: Reattempt check — sirf exact match, topic aware
  let prevQ = sb.from('test_attempts').select('id')
    .eq('user_id', currentUser.id).eq('test_name', testName)
    .eq('exam_type', currentExam).eq('subject', currentSubject.key);
  if (currentTopic) prevQ = prevQ.eq('topic', currentTopic.key);
  const { data: prevAttempts } = await prevQ.limit(2);
  // Block only if 2+ attempts (max attempts done)
  if (prevAttempts && prevAttempts.length >= 2) {
    alert('⚠️ Maximum attempts ho chuke hain!');
    return;
  }
  activeTestName = testName;

  let quizQuery = sb.from('quizzes').select('*')
    .eq('exam_type', currentExam).eq('subject', currentSubject.key)
    .eq('test_name', testName).order('q_order', { ascending: true });
  if (currentTopic) quizQuery = quizQuery.eq('topic', currentTopic.key);
  let { data, error } = await quizQuery;

  if ((!data || data.length === 0) && currentTopic) {
    const fb = await sb.from('quizzes').select('*')
      .eq('exam_type', currentExam).eq('subject', currentTopic.key)
      .eq('test_name', testName).order('q_order', { ascending: true });
    if (!fb.error && fb.data && fb.data.length > 0) { data = fb.data; error = null; }
  }

  if (error || !data || data.length === 0) { alert('⚠️ Questions load nahi hue!'); return; }

  questions = data;
  const pos = questions[0].positive_marking ?? 1;
  const neg = questions[0].negative_marking ?? 0;
  const dur = questions[0].test_duration || 30;
  const total = questions[0].total_marks || (questions.length * pos);
  showInstructionsScreen(testName, questions.length, dur, total, pos, neg);
}

// ============ REATTEMPT QUIZ ============
// FIX Bug #4 & #16: Reattempt properly handled, no blocking from startQuiz
async function reattemptQuiz(testName) {
  if (!confirm(`🔁 Reattempt "${testName}"?\n\nYeh aapka final (2nd) attempt hoga — iske baad test lock ho jaayega.`)) return;
  activeTestName = testName;
  clearQuizState(testName);

  let quizQuery = sb.from('quizzes').select('*')
    .eq('exam_type', currentExam).eq('subject', currentSubject.key)
    .eq('test_name', testName).order('q_order', { ascending: true });
  if (currentTopic) quizQuery = quizQuery.eq('topic', currentTopic.key);
  let { data, error } = await quizQuery;

  if ((!data || data.length === 0) && currentTopic) {
    const fb = await sb.from('quizzes').select('*')
      .eq('exam_type', currentExam).eq('subject', currentTopic.key)
      .eq('test_name', testName).order('q_order', { ascending: true });
    if (!fb.error && fb.data && fb.data.length > 0) { data = fb.data; error = null; }
  }

  if (error || !data || data.length === 0) { alert('⚠️ Questions load nahi hue!'); return; }

  questions = data;
  const pos = questions[0].positive_marking ?? 1;
  const neg = questions[0].negative_marking ?? 0;
  const dur = questions[0].test_duration || 30;
  const total = questions[0].total_marks || (questions.length * pos);
  showInstructionsScreen(testName, questions.length, dur, total, pos, neg);
}

function showInstructionsScreen(testName, qCount, dur, totalMarks, pos, neg) {
  document.getElementById('instrTestName').textContent = testName;
  document.getElementById('instrDuration').textContent = dur;
  document.getElementById('instrMaxMarks').textContent = totalMarks;
  document.getElementById('instrQCount').textContent = qCount;
  document.getElementById('instrPos').textContent = pos;
  document.getElementById('instrNeg').textContent = neg;
  document.getElementById('instrDur2').textContent = dur;
  document.getElementById('instrNegLine').style.display = neg > 0 ? 'list-item' : 'none';
  document.getElementById('instrOverlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeInstructions() {
  document.getElementById('instrOverlay').style.display = 'none';
  document.body.style.overflow = '';
}

async function agreeAndContinue() {
  const lang = document.getElementById('instrLangSelect').value;
  closeInstructions();
  await launchQuiz(lang);
}

async function launchQuiz(selectedLang) {
  currentQ = 0; answers = {}; lockedAnswers = new Set(); pendingAnswer = null;
  window._warned5min = false; window._warned2min = false; window._quizSubmitted = false;
  savedQuestions = new Set();
  window.questionTimes = {};
  window.questionStartTime = Date.now();
  initQStatus();
  posMarking = questions[0].positive_marking ?? 1;
  negMarking = questions[0].negative_marking ?? 0;
  timeLeft = (questions[0].test_duration || 30) * 60;

  document.getElementById('quizTitle').innerHTML = `${EXAM_LABELS[currentExam] || currentExam} — <span>${activeTestName}</span>`;
  const unEl = document.getElementById('quizUserName');
  if (unEl) unEl.textContent = currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || '';
  document.getElementById('mPos').textContent = posMarking;
  document.getElementById('mNeg').textContent = negMarking;
  document.getElementById('mPosInfo').textContent = '+' + posMarking;
  document.getElementById('mNegInfo').textContent = '-' + negMarking;
  document.getElementById('resultScreen').classList.remove('show');
  document.getElementById('quizBody').style.display = 'block';
  document.getElementById('quizFooter').style.display = 'flex';
  document.getElementById('qNavDots').style.display = 'grid';
  const sidebar = document.getElementById('ntaSidebar');
  sidebar.classList.remove('collapsed','mob-open');
  document.getElementById('btnTogglePanel').textContent = window.innerWidth > 600 ? '📋 Hide' : '📋 Panel';
  await loadSavedForTest();

  const savedState = loadQuizState(activeTestName);
  if (savedState && savedState.timeLeft > 0) {
    const answeredCount = Object.keys(savedState.answers || {}).length;
    const mLeft = Math.floor(savedState.timeLeft / 60);
    const sLeft = savedState.timeLeft % 60;
    const resume = confirm(`⏸ Ongoing test mila!\n\n"${activeTestName}"\n✅ ${answeredCount} answered • ⏱ ${mLeft}:${String(sLeft).padStart(2,'0')} left\n\nResume karo?`);
    if (resume) {
      answers = savedState.answers || {};
      timeLeft = savedState.timeLeft;
      currentQ = savedState.currentQ || 0;
      qStatus = savedState.qStatus || {};
      // Restore section timers from saved state
      if (savedState.sectionTimers) {
        window._sectionTimers = savedState.sectionTimers;
      }
      if (typeof savedState.currentSection === 'number') {
        currentSection = savedState.currentSection;
      }
      // FIX: posMarking/negMarking hamesha questions se lo, savedState se nahi
      // posMarking aur negMarking pehle se set ho chuke hain questions[0] se
    } else {
      clearQuizState(activeTestName);
    }
  }

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  updateOnlineStatus();

  window.history.pushState({ quizActive: true }, '');
  window.onpopstate = function(e) {
    if (questions.length > 0 && timeLeft > 0 && !document.getElementById('resultScreen').classList.contains('show')) {
      saveQuizState();
      const leave = confirm('⚠️ Progress save ho gayi!\nBaad mein resume kar sakte ho.\n\nAre you sure you want to leave?');
      if (leave) {
        window.onpopstate = null;
        document.getElementById('quizOverlay').classList.remove('show');
        document.body.style.overflow = '';
        clearInterval(timerInterval);
      } else {
        window.history.pushState({ quizActive: true }, '');
      }
    }
  };

  document.addEventListener('visibilitychange', function() {
    if (document.hidden && questions.length > 0 && timeLeft > 0) saveQuizState();
  });

  currentLang = selectedLang || 'en';
  document.getElementById('langEN').classList.toggle('active', currentLang === 'en');
  document.getElementById('langHI').classList.toggle('active', currentLang === 'hi');
  detectHindi();
  buildSections();
  const _ntaBody2 = document.querySelector('.nta-body'); if (_ntaBody2) _ntaBody2.style.display = 'flex';
  renderQNavDots(); showQuestion(currentQ); startTimer();
  document.getElementById('quizOverlay').classList.add('show');
  // FIX Bug #18: quiz-header show karo
  document.getElementById('quizHeader').style.display = 'flex';
  // Mobile timer bar — hamesha show karo (live test style)
  const mobBar = document.getElementById('mobileTimerBar');
  if (mobBar) mobBar.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// ============ QUESTION ============
function showQuestion(idx) {
  if (window.questionTimes !== undefined && window.questionStartTime) {
    const prev = currentQ;
    const elapsed = Math.round((Date.now() - window.questionStartTime) / 1000);
    window.questionTimes[prev] = (window.questionTimes[prev] || 0) + elapsed;
  }
  window.questionStartTime = Date.now();
  currentQ = idx;
  pendingAnswer = null;
  if (!qStatus[idx] || qStatus[idx]==='not_visited') qStatus[idx]='not_answered';
  renderQuestionContent(idx);
}

function selectOption(opt) {
  if (answers[currentQ] === opt) {
    delete answers[currentQ];
    document.querySelectorAll('.option-btn,.option-img-btn').forEach(b => b.classList.remove('selected'));
    renderQNavDots();
    return;
  }
  answers[currentQ] = opt;
  if (qStatus[currentQ]!=='ans_marked') qStatus[currentQ]='answered';
  saveQuizState();
  document.querySelectorAll('.option-btn,.option-img-btn').forEach(b => {
    b.classList.remove('selected');
    const lbl = b.querySelector('.option-label');
    if (lbl && lbl.textContent === opt) b.classList.add('selected');
  });
  renderQNavDots();
}

function prevQ() {
  if (!sections.length) { if (currentQ>0) showQuestion(currentQ-1); return; }
  const sec = sections[currentSection];
  const pos = sec.indices.indexOf(currentQ);
  if (pos > 0) { showQuestion(sec.indices[pos-1]); }
  else if (currentSection > 0) {
    const prevSec = sections[currentSection-1];
    switchSection(currentSection-1);
    showQuestion(prevSec.indices[prevSec.indices.length-1]);
  }
}
function nextQ() {
  if (!sections.length) { if (currentQ<questions.length-1) showQuestion(currentQ+1); return; }
  const sec = sections[currentSection];
  const pos = sec.indices.indexOf(currentQ);
  if (pos < sec.indices.length-1) { showQuestion(sec.indices[pos+1]); }
  else if (currentSection < sections.length-1) { switchSection(currentSection+1); }
}

function renderQNavDots() {
  let counts = {answered:0, not_answered:0, not_visited:0, marked:0, ans_marked:0};
  // Count all
  questions.forEach((_,i) => {
    const s = qStatus[i] || 'not_visited';
    counts[s] = (counts[s]||0)+1;
  });
  const set = (id, v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  set('cntAnswered',    counts.answered||0);
  set('cntNotAnswered', counts.not_answered||0);
  set('cntNotVisited',  counts.not_visited||0);
  set('cntMarked',      counts.marked||0);
  set('cntAnsMarked',   counts.ans_marked||0);

  // Update answered bar
  const totalAns = (counts.answered||0)+(counts.ans_marked||0);
  const secAnsEl = document.getElementById('secAnsCount');
  if (secAnsEl) secAnsEl.textContent = totalAns;
  const mobAnsEl = document.getElementById('mobAnsweredTxt');
  if (mobAnsEl) mobAnsEl.textContent = `Answered: ${totalAns}/${questions.length}`;

  if (!sections.length) {
    // Simple flat dots
    document.getElementById('qNavDots').innerHTML =
      `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;padding:6px 8px;">` +
      questions.map((q,i) => {
        const s = qStatus[i] || 'not_visited';
        let cls = 'q-dot';
        if (s==='answered') cls += ' answered';
        else if (s==='marked') cls += ' marked';
        else if (s==='ans_marked') cls += ' ans-marked';
        else if (s==='not_answered') cls += ' not-answered';
        if (i===currentQ) cls += ' current';
        return `<div class="${cls}" onclick="showQuestion(${i})">${i+1}</div>`;
      }).join('') + `</div>`;
    return;
  }

  // Section-wise dots — Live Test style
  // Determine currently active section (by timer)
  let activeSecIdx = currentSection;
  if (window._sectionTimers && window._sectionTimers.length > 0) {
    const ai = window._sectionTimers.findIndex(t => t > 0);
    activeSecIdx = ai === -1 ? sections.length - 1 : ai;
  }

  document.getElementById('qNavDots').innerHTML = sections.map((sec, si) => {
    const secAns = sec.indices.filter(i => qStatus[i]==='answered'||qStatus[i]==='ans_marked').length;
    const isLockedSec = si !== activeSecIdx; // only current section is clickable
    const dots = sec.indices.map(i => {
      const s = qStatus[i] || 'not_visited';
      let bg = '#e8edf5'; let color = '#333'; let border = '#ccd4e0';
      if (s==='answered')     { bg='#00c853'; color='#fff'; border='#00c853'; }
      else if (s==='not_answered') { bg='#e63946'; color='#fff'; border='#e63946'; }
      else if (s==='marked')       { bg='#7b1fa2'; color='#fff'; border='#7b1fa2'; }
      else if (s==='ans_marked')   { bg='#7b1fa2'; color='#fff'; border='#2e7d32'; }
      const dispNum = sec.indices.indexOf(i)+1;
      const isActive = i===currentQ;
      const clickHandler = isLockedSec ? '' : `onclick="showQuestion(${i})"`;
      const lockStyle = isLockedSec ? 'opacity:0.45;cursor:not-allowed;' : 'cursor:pointer;';
      return `<div ${clickHandler} title="Q${i+1}" style="
        height:32px;border-radius:6px;font-size:0.72rem;font-weight:700;
        background:${bg};color:${color};border:2px solid ${border};
        display:flex;align-items:center;justify-content:center;
        ${lockStyle}
        ${isActive ? 'outline:2px solid #ff6d00;outline-offset:1px;' : ''}
        transition:all 0.12s;">${dispNum}</div>`;
    }).join('');
    return `<div style="
        background:#1565c0;padding:8px 10px;margin-top:2px;
        display:flex;align-items:center;justify-content:space-between;gap:4px;">
        <span style="font-size:0.68rem;font-weight:800;color:#fff;line-height:1.3;">${sec.label}${isLockedSec ? (si < activeSecIdx ? ' 🔒' : ' ⏳') : ''}</span>
        <span style="font-size:0.65rem;font-weight:800;color:#fff;background:rgba(255,255,255,0.2);
          padding:2px 8px;border-radius:50px;white-space:nowrap;">${secAns}/${sec.indices.length}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:8px 10px;">${dots}</div>`; 
  }).join('');

  // Re-render tabs badges
  renderSectionTabs();
}

// ============ TIMER ============
function startTimer() {
  clearInterval(timerInterval); updateTimerDisplay();
  timerInterval = setInterval(() => {
    if (isPaused) return;
    timeLeft--;
    updateTimerDisplay();

    // Per-section timer tick
    if (sections.length > 1 && window._sectionTimers) {
      const si = currentSection;
      if (window._sectionTimers[si] > 0) {
        window._sectionTimers[si]--;
        renderSectionTabs(); // refresh timer badge on tab
        if (window._sectionTimers[si] <= 0) {
          // Section time up — auto advance to next section or submit
          if (si < sections.length - 1) {
            currentSection = si + 1;
            const nextFirst = sections[currentSection]?.indices[0];
            if (nextFirst !== undefined) showQuestion(nextFirst);
            renderQNavDots();
            renderSectionTabs();
          } else {
            // Last section done — auto submit
            clearInterval(timerInterval);
            submitQuiz();
            return;
          }
        }
      }
    }

    if (timeLeft % 10 === 0) saveQuizState();
    if (timeLeft <= 0) { clearInterval(timerInterval); submitQuiz(); }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(timeLeft/60).toString().padStart(2,'0');
  const s = (timeLeft%60).toString().padStart(2,'0');
  const timeStr = m + ':' + s;

  // Desktop timer
  const el = document.getElementById('quizTimer');
  if (el) {
    el.textContent = timeStr;
    if (timeLeft<=120)      { el.classList.add('danger'); el.style.color='#ff2222'; }
    else if (timeLeft<=300) { el.classList.remove('danger'); el.style.color='#ff8800'; }
    else                    { el.classList.remove('danger'); el.style.color='#ffcc02'; }
    if (timeLeft===300 && !window._warned5min) {
      window._warned5min = true;
      el.style.transform = 'scale(1.3)';
      setTimeout(() => el.style.transform='', 400);
    }
    if (timeLeft===120 && !window._warned2min) {
      window._warned2min = true;
      alert('⚠️ Sirf 2 minute bache! Jaldi karo!');
    }
  }

  // Mobile timer
  const mobEl = document.getElementById('mobTimer');
  if (mobEl) {
    mobEl.textContent = timeStr;
    mobEl.style.background = timeLeft<=120 ? '#ff2222' : timeLeft<=300 ? '#ff8800' : '#e63946';
  }

  // secTimeWarn - hidden rakhein, timer header mein hai
  const warnEl = document.getElementById('secTimeWarn');
  if (warnEl) warnEl.style.display = 'none';
}

// ── LEADERBOARD DATA HELPER (FIX Bug #19: function define kiya) ──
async function getLeaderboardData(testName) {
  try {
    const { data: allAttempts } = await sb.from('test_attempts')
      .select('user_id, score, full_name, avatar_url')
      .ilike('test_name', testName.trim())
      .order('score', { ascending: false });
    if (!allAttempts || allAttempts.length === 0) return { uniqueUsers: [], totalStudents: 0 };

    // FIX Bug #15: Same score pe sahi rank — best score per user rakh lo
    const bestMap = {};
    allAttempts.forEach(r => {
      if (!bestMap[r.user_id] || r.score > bestMap[r.user_id].score) {
        bestMap[r.user_id] = { user_id: r.user_id, score: r.score, full_name: r.full_name, avatar_url: r.avatar_url || null };
      }
    });
    const uniqueUsers = Object.values(bestMap).sort((a, b) => b.score - a.score);

    // FIX Bug #6: Profiles table se latest avatar/name fetch
    try {
      const uids = uniqueUsers.map(u => u.user_id);
      const { data: profiles } = await sb.from('profiles').select('id, avatar_url, full_name').in('id', uids);
      if (profiles) {
        const profileMap = {};
        profiles.forEach(p => { profileMap[p.id] = p; });
        uniqueUsers.forEach(u => {
          if (profileMap[u.user_id]?.avatar_url) u.avatar_url = profileMap[u.user_id].avatar_url;
          if (profileMap[u.user_id]?.full_name)  u.full_name  = profileMap[u.user_id].full_name;
        });
      }
    } catch(e) {}

    return { uniqueUsers, totalStudents: uniqueUsers.length };
  } catch(e) {
    console.error('Leaderboard error:', e);
    return { uniqueUsers: [], totalStudents: 0 };
  }
}

// ============ SUBMIT ============
async function submitQuiz() {
  // FIX Bug #25: Timer zero karo + display reset karo
  clearInterval(timerInterval);
  timeLeft = 0;
  window._sectionTimers = null; // Reset section timers on submit
  const timerEl = document.getElementById('quizTimer');
  if (timerEl) { timerEl.textContent = '00:00'; timerEl.classList.remove('danger'); timerEl.style.color = '#ffcc02'; }
  window._quizSubmitted = true;

  if (window.questionTimes !== undefined && window.questionStartTime) {
    const elapsed = Math.round((Date.now() - window.questionStartTime) / 1000);
    window.questionTimes[currentQ] = (window.questionTimes[currentQ] || 0) + elapsed;
  }

  let correct = 0, wrong = 0, skip = 0, score = 0;
  questions.forEach((q, i) => {
    const a = answers[i];
    if (!a) skip++;
    else if (a === q.correct_answer) { correct++; score += posMarking; }
    else { wrong++; score -= negMarking; }
  });
  const totalMarks = questions[0].total_marks || (questions.length * posMarking);
  // FIX: Negative score bhi dikhao, floor mat karo
  const attempted = questions.length - skip;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  document.getElementById('quizBody').style.display = 'none';
  document.getElementById('quizFooter').style.display = 'none';
  document.getElementById('qNavDots').style.display = 'none';
  document.getElementById('quizHeader').style.display = 'none';
  const _ntaBody = document.querySelector('.nta-body'); if (_ntaBody) _ntaBody.style.display = 'none';

  document.getElementById('resultTestTitle').textContent = activeTestName;
  document.getElementById('resultScore').textContent = `${score.toFixed(1)}/${totalMarks}`;
  document.getElementById('resultSub').textContent = `Avg: -- | Best: --`;
  document.getElementById('rCorrect').textContent = correct;
  document.getElementById('rWrong').textContent = wrong;
  document.getElementById('rSkip').textContent = skip;
  document.getElementById('rAccuracy').textContent = accuracy;
  document.getElementById('rAttempted').textContent = attempted;
  document.getElementById('rTotal').textContent = questions.length;
  document.getElementById('rankRow').style.display = 'none';
  

  switchResultTab('leaderboard');
  document.getElementById('resultScreen').classList.add('show');

  // Supabase mein save
  // FIX: Session expire hone pe re-fetch karo
  if (!currentUser) {
    const { data: { user } } = await sb.auth.getUser();
    currentUser = user;
  }
  if (!currentUser) { console.error('No user session'); return; }
  try {
    let _uName = currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Student';
    let _avatarUrl = currentUser.user_metadata?.avatar_url || null;
    try {
      const { data: prof } = await sb.from('profiles').select('full_name, avatar_url').eq('id', currentUser.id).single();
      if (prof?.full_name) _uName = prof.full_name;
      if (prof?.avatar_url) _avatarUrl = prof.avatar_url;
    } catch(e) {}

    // FIX Bug #12: answer_map mein sab indexes store karo (skip bhi)
    const fullAnswerMap = {};
    questions.forEach((q, i) => { fullAnswerMap[i] = answers[i] || null; });

    const { error: insertError } = await sb.from('test_attempts').insert({
      user_id:             currentUser.id,
      full_name:           _uName,
      avatar_url:          _avatarUrl,
      test_name:           activeTestName,
      exam_type:           currentExam,
      subject:             questions[0]?.subject || currentSubject?.key,
      topic:               currentTopic?.key || null,
      score:               parseFloat(score.toFixed(1)),
      total_marks:         totalMarks,
      correct_answers:     correct,
      wrong_answers:       wrong,
      questions_attempted: attempted,
      answer_map:          JSON.stringify(fullAnswerMap),
      time_map:            JSON.stringify(window.questionTimes || {})
    });

    // FIX: Hamesha localStorage clear karo submit ke baad
    clearQuizState(activeTestName);
    // Store completed flag so Resume never shows after submit
    try { localStorage.setItem('completed_' + activeTestName, '1'); } catch(e) {}
    if (insertError) {
      console.error('Submit insert error:', insertError);
      alert('INSERT ERROR: ' + JSON.stringify(insertError));
    }

    const finalScore = parseFloat(score.toFixed(1));
    const { uniqueUsers } = await getLeaderboardData(activeTestName);
    let allUsers = [...uniqueUsers];
    if (!allUsers.find(u => u.user_id === currentUser.id)) {
      allUsers.push({ user_id: currentUser.id, score: finalScore });
      allUsers.sort((a, b) => b.score - a.score);
    }

    // FIX Bug #15: Same score pe sahi rank calculate karo
    const rank = allUsers.filter(u => u.score > finalScore).length + 1;
    const total = allUsers.length || 1;
    const percentile = total > 1 ? Math.round(((total - rank) / (total - 1)) * 100) : 100;

    document.getElementById('rankRow').style.display = 'flex';
    
    document.getElementById('rpRank').textContent = `#${rank}`;
    document.getElementById('rpTotal').textContent = total;
    document.getElementById('rpPercentile').textContent = percentile;
    document.getElementById('rpPercentile').style.color = percentile>=90?'#00c853':percentile>=70?'#4285f4':'#e63946';

    const scores = uniqueUsers.map(u => u.score);
    const topperScore = scores.length > 0 ? Math.max(...scores) : finalScore;
    const avgScore    = scores.length > 0 ? scores.reduce((a,b)=>a+b,0)/scores.length : finalScore;
    updateMarksChart(finalScore, topperScore, avgScore, totalMarks, rank, total);

    const top10 = allUsers.slice(0, 10);
    if (top10.length > 0) renderLeaderboard(top10, currentUser.id);

  } catch(e) {
    console.error('Submit error:', e);
    alert('⚠️ Result save nahi hua — network check karo aur dobara try karo.');
  }
}

function rateTest(rating, btn) {
  document.querySelectorAll('.rate-btn span:first-child').forEach((s,i) => {
    s.textContent = i < rating ? '⭐' : '☆';
  });
}

function updateMarksChart(myScore, topperScore, avgScore, totalMarks, rank, total) {
  const max = Math.max(myScore, topperScore, avgScore, 1);
  const pct = (val) => Math.max(4, Math.round((val / max) * 100));
  const safe = (id, val) => { const el=document.getElementById(id); if(el) el.style.height=val+'%'; };
  safe('barYou',    pct(myScore));
  safe('barTopper', pct(topperScore));
  safe('barAvg',    pct(avgScore));
  const label = (id, val) => { const el=document.getElementById(id); if(el) el.textContent=typeof val==='number'?val.toFixed(1):val; };
  label('barYouLabel',    myScore);
  label('barTopperLabel', topperScore);
  label('barAvgLabel',    avgScore);
  // FIX Bug #2: rankBadge null check
  const rankBadge = document.getElementById('rankBadge');
  if (rankBadge) rankBadge.textContent = `#${rank}/${total} Rank`;
}

function switchResultTab(tab) {
  ['analysis','solutions','leaderboard'].forEach(t => {
    const content = document.getElementById('rtab' + t.charAt(0).toUpperCase() + t.slice(1));
    const btn = document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1));
    if (content) content.style.display = t===tab ? (t==='solutions'?'flex':'block') : 'none';
    if (btn) {
      btn.style.color = t===tab ? '#3d6ef5' : '#888';
      btn.style.borderBottomColor = t===tab ? '#3d6ef5' : 'transparent';
      btn.style.fontWeight = t===tab ? '700' : '600';
    }
  });
  if (tab === 'solutions') {
    analysisFilter = 'all';
    buildFilteredList();
    renderAnalysisQuestion();  // list render
    updateAnalysisTabs();      // tab counts update (no extra render inside)
  }
}

// ============ VIEW RESULT (from test list) ============
async function viewResult(testName) {
  activeTestName = testName.trim();

  // FIX Bug viewResult: currentSubject null hone pe bhi kaam kare (e.g. Full Test)
  let vq = sb.from('quizzes').select('*')
    .eq('exam_type', currentExam)
    .eq('test_name', testName)
    .order('q_order', { ascending: true });
  if (currentSubject?.key) {
    if (currentSubject.key === 'full_test') {
      vq = vq.eq('topic', 'full_test');
    } else {
      vq = vq.eq('subject', currentSubject.key);
      if (currentTopic) vq = vq.eq('topic', currentTopic.key);
    }
  }
  let { data, error } = await vq;

  // Fallback: topic key se bhi try karo
  if ((!data || data.length === 0) && currentTopic?.key) {
    const fb = await sb.from('quizzes').select('*')
      .eq('exam_type', currentExam).eq('subject', currentTopic.key)
      .eq('test_name', testName).order('q_order', { ascending: true });
    if (!fb.error && fb.data?.length > 0) { data = fb.data; error = null; }
  }

  if (error || !data || data.length === 0) { alert('⚠️ Questions load nahi hue!'); return; }
  questions = data;
  detectHindi();

  // FIX Bug #16: Latest attempt fetch karo (most recent first)
  // FIX viewResult: subject null hone pe subject filter skip karo
  let attQ = sb.from('test_attempts').select('*')
    .eq('user_id', currentUser.id).eq('test_name', testName)
    .eq('exam_type', currentExam)
    .order('created_at', { ascending: false }).limit(1);
  if (currentSubject?.key && currentSubject.key !== 'full_test') {
    attQ = attQ.eq('subject', currentSubject.key);
  }
  if (currentTopic) attQ = attQ.eq('topic', currentTopic.key);
  let { data: attResultData } = await attQ;

  if (!attResultData || attResultData.length === 0) {
    // Broad fallback — sirf test_name se try karo
    const { data: attFallback } = await sb.from('test_attempts').select('*')
      .eq('user_id', currentUser.id).eq('test_name', testName)
      .order('created_at', { ascending: false }).limit(1);
    if (!attFallback || attFallback.length === 0) { alert('Koi attempt nahi mila!'); return; }
    attResultData = attFallback;
  }
  const att = attResultData[0];

  const totalMarks = att.total_marks || questions.length;
  const score = att.score || 0;
  const correct = att.correct_answers || 0;
  const wrong = att.wrong_answers || 0;
  const attempted = att.questions_attempted || 0;
  const skip = questions.length - attempted;
  const accuracy = attempted > 0 ? Math.round((correct/attempted)*100) : 0;

  document.getElementById('quizBody').style.display = 'none';
  document.getElementById('quizFooter').style.display = 'none';
  document.getElementById('qNavDots').style.display = 'none';
  const _ntaBody = document.querySelector('.nta-body'); if (_ntaBody) _ntaBody.style.display = 'none';

  document.getElementById('resultTestTitle').textContent = testName;
  document.getElementById('resultScore').textContent = `${score.toFixed?score.toFixed(1):score}/${totalMarks}`;
  document.getElementById('resultSub').textContent = `Avg: -- | Best: --`;
  document.getElementById('rCorrect').textContent = correct;
  document.getElementById('rWrong').textContent = wrong;
  document.getElementById('rSkip').textContent = skip;
  document.getElementById('rAccuracy').textContent = accuracy;
  document.getElementById('rAttempted').textContent = attempted;
  document.getElementById('rTotal').textContent = questions.length;
  document.getElementById('rankRow').style.display = 'none';
  

  // FIX Bug #12: answer_map reconstruct — null entries bhi handle karo
  answers = {};
  if (att.answer_map) {
    try {
      const parsed = JSON.parse(att.answer_map);
      Object.entries(parsed).forEach(([k, v]) => { if (v) answers[parseInt(k)] = v; });
    } catch(e) {}
  }

  switchResultTab('leaderboard');
  document.getElementById('resultScreen').classList.add('show');
  document.getElementById('quizOverlay').classList.add('show');
  document.getElementById('quizHeader').style.display = 'none';
  document.body.style.overflow = 'hidden';

  try {
    const { uniqueUsers } = await getLeaderboardData(testName);
    let allUsers2 = [...uniqueUsers];
    const myEntry2 = allUsers2.find(u => u.user_id === currentUser.id);
    if (!myEntry2) { allUsers2.push({ user_id: currentUser.id, score }); allUsers2.sort((a,b)=>b.score-a.score); }
    const rank = allUsers2.filter(u => u.score > score).length + 1;
    const totalAtts = allUsers2.length || 1;
    const percentile = totalAtts > 1 ? Math.round(((totalAtts - rank) / (totalAtts - 1)) * 100) : 100;
    document.getElementById('rankRow').style.display = 'flex';
    
    document.getElementById('rpRank').textContent = `#${rank}`;
    document.getElementById('rpTotal').textContent = totalAtts;
    document.getElementById('rpPercentile').textContent = percentile;
    document.getElementById('rpPercentile').style.color = percentile>=90?'#00c853':percentile>=70?'#4285f4':'#e63946';
    const scores = uniqueUsers.map(u => u.score);
    const topperScore = scores.length>0 ? Math.max(...scores) : score;
    const avgScore = scores.length>0 ? scores.reduce((a,b)=>a+b,0)/scores.length : score;
    updateMarksChart(score, topperScore, avgScore, totalMarks, rank, totalAtts);
    const top10 = allUsers2.slice(0,10);
    if (top10.length>0) renderLeaderboard(top10, currentUser.id);
  } catch(e) { console.error('viewResult leaderboard error:', e); }
}

// ============ EXIT QUIZ ============
function exitQuiz() {
  clearInterval(timerInterval);
  const resultShowing = document.getElementById('resultScreen').classList.contains('show');
  const testWasSubmitted = window._quizSubmitted === true || resultShowing;

  if (testWasSubmitted) {
    clearQuizState(activeTestName);
    window._quizSubmitted = false;
  } else if (questions.length > 0 && timeLeft > 0) {
    saveQuizState();
  }

  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
  isPaused = false;
  sections = []; currentSection = 0;
  // FIX: Reset section timers on exit
  window._sectionTimers = null;
  const wrap = document.getElementById('sectionTabsWrap');
  if (wrap) wrap.style.display = 'none';
  const mobBar = document.getElementById('mobileTimerBar');
  if (mobBar) mobBar.style.display = 'none';
  document.getElementById('quizOverlay').classList.remove('show');
  document.body.style.overflow = '';
  document.getElementById('resultScreen').classList.remove('show');
  document.getElementById('quizBody').style.display = 'block';
  document.getElementById('quizFooter').style.display = 'flex';
  document.getElementById('qNavDots').style.display = 'flex';
  const _ntaBody2 = document.querySelector('.nta-body'); if (_ntaBody2) _ntaBody2.style.display = 'flex';
  // FIX Bug #18: Quiz header properly reset — none kyunki quiz ke bahar dikhna nahi chahiye
  document.getElementById('quizHeader').style.display = 'none';

  // Refresh test list
  const _savedTopic    = currentTopic;
  const _savedCategory = currentCategory;
  const _savedSubject  = currentSubject;

  if (_savedTopic && _savedSubject) {
    currentSubject  = _savedSubject;
    currentCategory = 'chapter_wise';
    currentTopic    = _savedTopic;
    updateBreadcrumb();
    showView('topics');
    loadTestsForSubject(_savedSubject.key, _savedTopic.label, _savedTopic.icon, _savedTopic.key, true);
  } else if (_savedCategory === 'full_test' && _savedSubject) {
    currentSubject  = _savedSubject;
    currentCategory = 'full_test';
    currentTopic    = null;
    updateBreadcrumb();
    loadTestsForSubject(_savedSubject.key, _savedSubject.label, _savedSubject.icon, 'full_test');
  } else if (_savedSubject) {
    currentSubject  = _savedSubject;
    currentCategory = null;
    currentTopic    = null;
    loadTestsForSubject(_savedSubject.key, _savedSubject.label, _savedSubject.icon);
  }
}
