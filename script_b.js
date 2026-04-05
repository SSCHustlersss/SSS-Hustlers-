// ==========================================

// ============ IMAGE ZOOM ============
function openImgZoom(src) {
  document.getElementById('imgZoomImg').src = src;
  document.getElementById('imgZoomOverlay').classList.add('show');
}
function closeImgZoom() {
  document.getElementById('imgZoomOverlay').classList.remove('show');
}

// ============ BOOKMARK / SAVE QUESTIONS ============
let savedQuestions = new Set();
let savedQIds = {};

async function toggleBookmark() {
  const btn = document.getElementById('btnBookmark');
  const q = questions[currentQ];
  if (savedQuestions.has(currentQ)) {
    savedQuestions.delete(currentQ);
    btn.classList.remove('saved'); btn.style.color=''; btn.title='Save this question';
    updateSavedPanel();
    try {
      const rowId = savedQIds[currentQ];
      if (rowId) {
        await sb.from('saved_questions').delete().eq('id', rowId);
        delete savedQIds[currentQ];
      } else {
        await sb.from('saved_questions').delete().eq('user_id', currentUser.id).eq('question_id', q.id || String(currentQ));
      }
    } catch(e) { console.error('Unsave error:', e); }
  } else {
    savedQuestions.add(currentQ);
    btn.classList.add('saved'); btn.style.color='#e63946'; btn.title='Saved! Click to unsave';
    document.getElementById('savedPanel').classList.add('show');
    updateSavedPanel();
    try {
      const { data, error } = await sb.from('saved_questions').insert({
        user_id: currentUser.id, question_id: q.id || String(currentQ),
        question_text: q.question_text, option_a: q.option_a, option_b: q.option_b,
        option_c: q.option_c, option_d: q.option_d, correct_answer: q.correct_answer,
        explanation: q.explanation || '', subject: currentSubject?.key || '',
        exam_type: currentExam, test_name: activeTestName
      }).select('id').single();
      if (data) savedQIds[currentQ] = data.id;
    } catch(e) { console.error('Save error:', e); }
  }
}

async function loadSavedForTest() {
  savedQuestions = new Set(); savedQIds = {};
  try {
    const { data } = await sb.from('saved_questions').select('id, question_id')
      .eq('user_id', currentUser.id).eq('test_name', activeTestName);
    if (data) {
      data.forEach(row => {
        const idx = questions.findIndex(q => String(q.id) === String(row.question_id));
        if (idx !== -1) { savedQuestions.add(idx); savedQIds[idx] = row.id; }
      });
    }
  } catch(e) { console.error('Load saved error:', e); }
  updateSavedPanel();
}

function updateSavedPanel() {
  const list = Array.from(savedQuestions).sort((a,b) => a-b);
  document.getElementById('savedCount').textContent = list.length;
  document.getElementById('savedQList').innerHTML = list.map(i =>
    `<span class="saved-q-chip" onclick="showQuestion(${i})">Q${i+1}</span>`
  ).join('');
  if (list.length === 0) document.getElementById('savedPanel').classList.remove('show');
}

function updateBookmarkBtn() {
  const btn = document.getElementById('btnBookmark');
  if (!btn) return;
  if (savedQuestions.has(currentQ)) {
    btn.classList.add('saved'); btn.style.color='#e63946'; btn.title='Saved! Click to unsave';
  } else {
    btn.classList.remove('saved'); btn.style.color=''; btn.title='Save this question';
  }
}

// ============ SHARE RESULT ============
function shareResult() {
  const score   = document.getElementById('resultScore').textContent;
  const correct = document.getElementById('rCorrect').textContent;
  const wrong   = document.getElementById('rWrong').textContent;
  const skip    = document.getElementById('rSkip').textContent;
  const msg = `🎯 *SSC Hustlers — Test Result*\n\n📝 Test: ${activeTestName}\n🏆 Score: ${score}\n\n✅ Correct: ${correct}\n❌ Wrong: ${wrong}\n⏭ Skipped: ${skip}\n\n🔗 Practice karo: ${window.location.origin}`;
  if (navigator.share) {
    navigator.share({ title: 'SSC Hustlers Result', text: msg }).catch(() => copyToClipboard(msg));
  } else {
    copyToClipboard(msg);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ Result copied! WhatsApp ya kahi bhi paste karo.');
  }).catch(() => {
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  });
}

// ============ DARK MODE ============
// FIX Bug #16: Dark mode LocalStorage se sahi load hota hai
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  const btn = document.getElementById('themeToggle');
  if (btn) { btn.textContent = isDark ? '☀️' : '🌙'; btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'; }
  localStorage.setItem('ssc_theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
  const saved = localStorage.getItem('ssc_theme') || 'light'; // DEFAULT = LIGHT
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const btn = document.getElementById('themeToggle');
    if (btn) { btn.textContent = '☀️'; btn.title = 'Switch to Light Mode'; }
  } else {
    document.body.classList.remove('dark');
    const btn = document.getElementById('themeToggle');
    if (btn) { btn.textContent = '🌙'; btn.title = 'Switch to Dark Mode'; }
  }
}

// ============ ANALYSIS ============
let analysisFilter = 'all';
let analysisIdx = 0;
let analysisFiltered = [];

function showAnalysis() { switchResultTab('solutions'); }

function buildFilteredList() {
  analysisFiltered = [];
  questions.forEach((q, i) => {
    const a = answers[i];
    const status = !a ? 'skip' : (a === q.correct_answer ? 'correct' : 'wrong');
    if (analysisFilter === 'all' || analysisFilter === status) {
      analysisFiltered.push({ q, i, status, userAns: a });
    }
  });
}

function setAnalysisFilter(f) {
  analysisFilter = f;
  buildFilteredList();
  analysisIdx = 0;
  renderAnalysisQuestion();
  updateAnalysisTabs();
}

function updateAnalysisTabs() {
  let correct=0, wrong=0, skip=0;
  questions.forEach((q,i) => {
    const a = answers[i];
    if (!a) skip++; else if (a===q.correct_answer) correct++; else wrong++;
  });
  const set = (id, txt) => { const el=document.getElementById(id); if(el) el.textContent=txt; };
  set('aTabAll',     `All (${questions.length})`);
  set('aTabCorrect', `✅ ${correct}`);
  set('aTabWrong',   `❌ ${wrong}`);
  set('aTabSkip',    `⏭ ${skip}`);
  ['all','correct','wrong','skip'].forEach(f => {
    const capF = f.charAt(0).toUpperCase() + f.slice(1);
    const btn = document.getElementById('aTab' + (f==='all'?'All':capF));
    if (!btn) return;
    const isActive = analysisFilter === f;
    btn.style.color = isActive ? '#3d6ef5' : '#888';
    btn.style.borderBottomColor = isActive ? '#3d6ef5' : 'transparent';
    btn.style.fontWeight = isActive ? '700' : '600';
    btn.classList.toggle('active', isActive);
  });
  renderAnalysisQuestion();
}

function renderAnalysisQuestion() {
  const body = document.getElementById('analysisBody');
  if (!body) return;
  if (analysisFiltered.length === 0) {
    body.innerHTML = `<div style="text-align:center;padding:40px;color:#aaa;font-size:0.9rem;">Koi question nahi is filter mein</div>`;
    const prev = document.getElementById('analysisPrev');
    const next = document.getElementById('analysisNext');
    const counter = document.getElementById('analysisCounter');
    if (prev) prev.disabled = true;
    if (next) next.disabled = true;
    if (counter) counter.textContent = '0 / 0';
    return;
  }
  if (analysisIdx >= analysisFiltered.length) analysisIdx = analysisFiltered.length - 1;
  if (analysisIdx < 0) analysisIdx = 0;

  const { q, i, status, userAns } = analysisFiltered[analysisIdx];
  const opts = [
    {k:'A', txt: getLangText(q.option_a), img: q.option_a_image},
    {k:'B', txt: getLangText(q.option_b), img: q.option_b_image},
    {k:'C', txt: getLangText(q.option_c), img: q.option_c_image},
    {k:'D', txt: getLangText(q.option_d), img: q.option_d_image}
  ];
  const badge = status==='skip'
    ? '<span class="aq-badge skip">Skipped</span>'
    : status==='correct'
    ? '<span class="aq-badge correct">Correct ✅</span>'
    : '<span class="aq-badge wrong">Wrong ❌</span>';

  const hasImgOpts = opts.some(o => o.img);
  const optsHtml = hasImgOpts
    ? `<div class="aq-opts-img">${opts.map(o => {
        let cls = 'aq-opt-img';
        if (o.k === q.correct_answer) cls += ' opt-correct';
        else if (o.k === userAns && status==='wrong') cls += ' opt-wrong';
        const content = o.img ? `<img src="${o.img}" alt="Option ${o.k}" onclick="openImgZoom('${o.img}')">` : `<span>${o.txt||''}</span>`;
        return `<div class="${cls}"><span class="aq-opt-label">${o.k}</span>${content}
          ${o.k===q.correct_answer?'<span style="font-size:0.7rem;font-weight:700;color:#00c853;">✓ Correct</span>':''}
          ${o.k===userAns&&status==='wrong'?'<span style="font-size:0.7rem;font-weight:700;color:#e63946;">✗ Your Ans</span>':''}
        </div>`;
      }).join('')}</div>`
    : `<div class="aq-options">${opts.map(o => {
        let cls = 'aq-opt';
        if (o.k === q.correct_answer) cls += ' opt-correct';
        else if (o.k === userAns && status==='wrong') cls += ' opt-wrong';
        return `<div class="${cls}"><span class="aq-opt-label">${o.k}</span><span>${o.txt||''}</span>
          ${o.k===q.correct_answer?'<span style="margin-left:auto;font-size:0.75rem;font-weight:700;color:#00c853;">✓ Correct</span>':''}
          ${o.k===userAns&&status==='wrong'?'<span style="margin-left:auto;font-size:0.75rem;font-weight:700;color:#e63946;">✗ Your Answer</span>':''}
        </div>`;
      }).join('')}</div>`;

  const timeTaken = (window.questionTimes && window.questionTimes[i]) || 0;
  let timeHtml = '';
  if (timeTaken > 0) {
    const mins = Math.floor(timeTaken / 60), secs = timeTaken % 60;
    const timeStr = mins > 0 ? `${mins}:${String(secs).padStart(2,'0')}` : `${secs} sec`;
    const timeColor = timeTaken<=30?'#00c853':timeTaken<=60?'#ffb300':'#e63946';
    const timeIcon  = timeTaken<=30?'⚡':timeTaken<=60?'⏱':'🐢';
    timeHtml = `<span style="font-size:0.72rem;font-weight:700;color:${timeColor};background:${timeColor}18;padding:3px 8px;border-radius:6px;">${timeIcon} ${timeStr}</span>`;
  }

  body.innerHTML = `
    <div class="analysis-q aq-${status}">
      <div class="aq-header">
        <span class="aq-num">Q${i+1} of ${questions.length}</span>
        ${badge}
        <button class="btn-bookmark aq-bookmark ${savedQuestions.has(i)?'saved':''}" onclick="toggleAnalysisBookmark(${i})" style="margin-left:auto;font-size:1.1rem;padding:4px 8px;">🔖</button>
        <button onclick="openAiSolver(${analysisIdx})" style="background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;border:none;padding:5px 12px;border-radius:8px;font-size:0.75rem;font-weight:700;cursor:pointer;font-family:inherit;">🤖 AI</button>
      </div>
      <div class="aq-question">${getLangText(q.question_text)}</div>
      ${q.question_image ? `<div class="q-image-wrap"><img src="${q.question_image}" alt="Diagram" onclick="openImgZoom(this.src)" style="cursor:zoom-in;"></div>` : ''}
      ${optsHtml}
      ${q.explanation ? `<div class="aq-explanation"><strong>💡 Explanation:</strong> ${getLangText(q.explanation)}</div>` : ''}
      <div style="display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap;">
        ${timeHtml}
        <span id="pctStat_${i}" style="font-size:0.72rem;font-weight:700;color:#888;background:#f5f5f5;padding:3px 8px;border-radius:6px;">👥 Loading...</span>
      </div>
    </div>`;

  fetchQuestionStats(q, i);

  const counter = document.getElementById('analysisCounter');
  const prev = document.getElementById('analysisPrev');
  const next = document.getElementById('analysisNext');
  if (counter) counter.textContent = `${analysisIdx+1} / ${analysisFiltered.length}`;
  if (prev) prev.disabled = analysisIdx === 0;
  if (next) next.disabled = analysisIdx === analysisFiltered.length - 1;
}

async function toggleAnalysisBookmark(idx) {
  const q = questions[idx];
  const btn = document.querySelector('.aq-bookmark');
  if (savedQuestions.has(idx)) {
    savedQuestions.delete(idx);
    if(btn){ btn.classList.remove('saved'); btn.style.color=''; }
    try {
      const rowId = savedQIds[idx];
      if (rowId) { await sb.from('saved_questions').delete().eq('id', rowId); delete savedQIds[idx]; }
    } catch(e) {}
  } else {
    savedQuestions.add(idx);
    if(btn){ btn.classList.add('saved'); btn.style.color='#e63946'; }
    try {
      const { data } = await sb.from('saved_questions').insert({
        user_id: currentUser.id, question_id: q.id || String(idx),
        question_text: q.question_text, option_a: q.option_a, option_b: q.option_b,
        option_c: q.option_c, option_d: q.option_d, correct_answer: q.correct_answer,
        explanation: q.explanation || '', subject: currentSubject?.key || '',
        exam_type: currentExam, test_name: activeTestName
      }).select('id').single();
      if (data) savedQIds[idx] = data.id;
    } catch(e) {}
  }
}

async function fetchQuestionStats(q, qIdx) {
  try {
    const { data } = await sb.from('test_attempts').select('answer_map')
      .eq('test_name', activeTestName).not('answer_map', 'is', null);
    const el = document.getElementById('pctStat_' + qIdx);
    if (!data || data.length === 0) { if(el) el.style.display='none'; return; }
    let total=0, correct=0;
    data.forEach(row => {
      try {
        const map = JSON.parse(row.answer_map);
        const ans = map[qIdx];
        if (ans) { total++; if (ans===q.correct_answer) correct++; }
      } catch(e) {}
    });
    if (!el) return;
    if (total===0) { el.style.display='none'; return; }
    const pct = Math.round((correct/total)*100);
    const color = pct>=70?'#00c853':pct>=40?'#ffb300':'#e63946';
    el.style.background=color+'18'; el.style.color=color;
    el.textContent = `✅ ${pct}% got this right (${total} attempts)`;
  } catch(e) {}
}

function analysisPrev() { if(analysisIdx>0){ analysisIdx--; renderAnalysisQuestion(); } }
function analysisNext() { if(analysisIdx<analysisFiltered.length-1){ analysisIdx++; renderAnalysisQuestion(); } }

function openAiSolver(idx) {
  if (!analysisFiltered[idx]) return;
  const { q } = analysisFiltered[idx];
  const qText = getLangText(q.question_text) || '';
  const fullQ = `${qText}\n\nA) ${getLangText(q.option_a)||''}\nB) ${getLangText(q.option_b)||''}\nC) ${getLangText(q.option_c)||''}\nD) ${getLangText(q.option_d)||''}\n\nCorrect Answer: ${q.correct_answer||''}`;
  window.location.href = `doubt-solver.html?q=${encodeURIComponent(fullQ)}`;
}

function closeAnalysis() {
  const el = document.getElementById('analysisOverlay');
  if (el) el.classList.remove('show');
}

// ============ PAUSE / RESUME ============
function pauseQuiz() {
  if (isPaused) return;
  isPaused = true;
  clearInterval(timerInterval);
  saveQuizState();
  const overlay = document.getElementById('pauseOverlay');
  overlay.style.display = 'flex';
  const m = Math.floor(timeLeft/60).toString().padStart(2,'0');
  const s = (timeLeft%60).toString().padStart(2,'0');
  document.getElementById('pauseTimeDisplay').textContent = m + ':' + s;
  document.getElementById('pauseOfflineMsg').style.display = isOnline ? 'none' : 'block';
}

function resumeQuiz() {
  isPaused = false;
  document.getElementById('pauseOverlay').style.display = 'none';
  // FIX Bug #10: Resume karne pe timer sahi time se shuru ho
  startTimer();
}

// ============ LOCALSTORAGE STATE (FIX Bug #23) ============
function saveQuizState() {
  if (!activeTestName || questions.length === 0 || !currentUser) return;
  const key = 'quizState_' + currentUser.id + '_' + activeTestName;
  const state = {
    testName: activeTestName,
    exam: currentExam,
    subject: currentSubject,
    topic: currentTopic,
    answers,
    timeLeft,
    currentQ,
    qStatus,
    totalQs: questions.length,
    posMarking,
    negMarking,
    savedAt: Date.now()
  };
  try { localStorage.setItem(key, JSON.stringify(state)); } catch(e) {}
}

function loadQuizState(testName) {
  if (!currentUser) return null;
  const key = 'quizState_' + currentUser.id + '_' + testName;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const state = JSON.parse(raw);
    // 24 ghante se purana state ignore karo
    if (Date.now() - state.savedAt > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(key);
      return null;
    }
    return state;
  } catch(e) { return null; }
}

function clearQuizState(testName) {
  if (!testName || !currentUser) return;
  const key = 'quizState_' + currentUser.id + '_' + testName;
  try { localStorage.removeItem(key); } catch(e) {}
}

// ============ ONLINE / OFFLINE (FIX Bug #10) ============
function handleOnline() {
  isOnline = true;
  document.getElementById('offlineBar').classList.remove('show');
  const msg = document.getElementById('pauseOfflineMsg');
  if (msg) msg.style.display = 'none';
}

function handleOffline() {
  isOnline = false;
  document.getElementById('offlineBar').classList.add('show');
  const msg = document.getElementById('pauseOfflineMsg');
  if (isPaused && msg) msg.style.display = 'block';
  if (!isPaused && questions.length > 0 && timeLeft > 0) pauseQuiz();
}

function updateOnlineStatus() {
  if (!navigator.onLine) handleOffline();
  else handleOnline();
}

// ============ RENDER LEADERBOARD ============
function renderLeaderboard(top10, myUserId) {
  const medals = ['🥇','🥈','🥉'];
  const top3 = top10.slice(0, 3);
  const rest = top10.slice(3);

  const podiumOrder = [
    { idx:1, cls:'p2', size:'lb-podium-2' },
    { idx:0, cls:'p1', size:'lb-podium-1' },
    { idx:2, cls:'p3', size:'lb-podium-3' },
  ];

  const podiumHtml = top3.length >= 1 ? `
    <div class="lb-podium">
      ${podiumOrder.filter(p => top3[p.idx]).map(p => {
        const r = top3[p.idx];
        const isMe = r.user_id === myUserId;
        const name = r.full_name || (isMe ? 'You' : 'Student');
        const initials = name.slice(0,2).toUpperCase();
        const localAvatar = localStorage.getItem('avatar_' + r.user_id);
        const photoHtml = (localAvatar || r.avatar_url)
          ? `<img src="${localAvatar || r.avatar_url}" alt="${name}"/>`
          : initials;
        return `<div class="lb-podium-item ${p.cls}">
          <span class="lb-podium-rank">${medals[p.idx]||''}</span>
          <div class="lb-podium-circle ${p.size}">${photoHtml}</div>
          <div class="lb-podium-name">${isMe?'⭐ '+name:name}</div>
          <div class="lb-podium-score">${r.score} pts</div>
        </div>`;
      }).join('')}
    </div>` : '';

  const restHtml = rest.length > 0 ? rest.map((r,i) => {
    const isMe = r.user_id === myUserId;
    const name = r.full_name || (isMe ? 'You' : 'Student ' + (i+4));
    return `<div class="lb-row${isMe?' lb-me':''}">
      <span class="lb-pos">#${i+4}</span>
      <span class="lb-name">${isMe?'⭐ '+name:name}</span>
      <span class="lb-score">${r.score} pts</span>
    </div>`;
  }).join('') : '<div style="text-align:center;padding:8px;font-size:0.78rem;color:#aaa;">Sirf 3 students ne test diya</div>';

  const lbList = document.getElementById('lbList');
  const lbBox = document.getElementById('leaderboardBox');
  if (lbList) lbList.innerHTML = podiumHtml + restHtml;
  if (lbBox) lbBox.style.display = 'block';

  const myRank = top10.findIndex(r => r.user_id === myUserId);
  if (myRank >= 0 && myRank < 3) launchFireworks();
}

function launchFireworks() {
  let container = document.getElementById('fireworkContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'fireworkContainer';
    container.className = 'firework-container';
    document.body.appendChild(container);
  }
  container.innerHTML = '';
  const colors = ['#e63946','#ffd200','#00c853','#4285f4','#ff6b35','#a259ff','#fff'];
  let count = 0;
  const interval = setInterval(() => {
    if (count++ > 5) { clearInterval(interval); setTimeout(()=>container.innerHTML='', 2000); return; }
    const cx = 20 + Math.random() * 60;
    const cy = 10 + Math.random() * 50;
    for (let i = 0; i < 18; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const angle = (i/18)*360;
      const dist = 60 + Math.random()*80;
      const fx = Math.cos(angle*Math.PI/180)*dist + 'px';
      const fy = Math.sin(angle*Math.PI/180)*dist + 'px';
      spark.style.cssText = `left:${cx}%;top:${cy}%;background:${colors[i%colors.length]};--fx:${fx};--fy:${fy};animation-delay:${Math.random()*0.3}s;animation-duration:${0.7+Math.random()*0.5}s`;
      container.appendChild(spark);
    }
  }, 400);
}

// ============ PROFILE PHOTO (FIX Bug #24) ============
let selectedPhotoFile = null;

async function openProfileUpload() {
  const modal = document.getElementById('profileModal');
  if (!modal) return;
  modal.classList.add('show');
  const initials = (currentUser?.user_metadata?.full_name || currentUser?.email || 'U').slice(0,2).toUpperCase();
  const preview = document.getElementById('profilePreview');
  // FIX Bug #14: LocalStorage cache se pehle dikhao
  const savedPhoto = localStorage.getItem('avatar_' + currentUser?.id);
  if (savedPhoto) {
    preview.innerHTML = `<img src="${savedPhoto}" alt="photo">`;
  } else {
    preview.innerHTML = `<span id="profilePreviewInitials">${initials}</span>`;
  }
  try {
    const { data: atts } = await sb.from('test_attempts')
      .select('score, total_marks, correct_answers, questions_attempted').eq('user_id', currentUser.id);
    if (atts && atts.length > 0) {
      const totalTests = atts.length;
      const totalScore = atts.reduce((s,a)=>s+(a.score||0),0).toFixed(1);
      const totalCorrect = atts.reduce((s,a)=>s+(a.correct_answers||0),0);
      const totalAttempted = atts.reduce((s,a)=>s+(a.questions_attempted||0),0);
      const accuracy = totalAttempted>0?Math.round((totalCorrect/totalAttempted)*100):0;
      const statsEl = document.getElementById('profileStats');
      if (statsEl) statsEl.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px;text-align:center;">
          <div style="background:#f0f4ff;border-radius:10px;padding:10px;"><div style="font-size:1.1rem;font-weight:800;color:#3d6ef5;">${totalTests}</div><div style="font-size:0.7rem;color:#888;font-weight:600;">Tests Diye</div></div>
          <div style="background:#f0fff4;border-radius:10px;padding:10px;"><div style="font-size:1.1rem;font-weight:800;color:#00a040;">${accuracy}%</div><div style="font-size:0.7rem;color:#888;font-weight:600;">Accuracy</div></div>
          <div style="background:#fff3e0;border-radius:10px;padding:10px;"><div style="font-size:1.1rem;font-weight:800;color:#e65100;">${totalScore}</div><div style="font-size:0.7rem;color:#888;font-weight:600;">Total Score</div></div>
          <div style="background:#f3e5f5;border-radius:10px;padding:10px;"><div style="font-size:1.1rem;font-weight:800;color:#7b1fa2;">${totalCorrect}</div><div style="font-size:0.7rem;color:#888;font-weight:600;">Sahi Jawab</div></div>
        </div>`;
    }
  } catch(e) {}
}

function closeProfileUpload() {
  const modal = document.getElementById('profileModal');
  if (modal) modal.classList.remove('show');
  selectedPhotoFile = null;
}

function handlePhotoSelect(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) { alert('⚠️ Photo 2MB se chhoti honi chahiye!'); return; }
  selectedPhotoFile = file;
  const reader = new FileReader();
  reader.onload = async (e) => {
    const preview = document.getElementById('profilePreview');
    if (preview) preview.innerHTML = `<img src="${e.target.result}" alt="photo">`;
    await savePhotoLocally(e.target.result);
    await uploadPhotoToSupabase(file);
  };
  reader.readAsDataURL(file);
}

async function savePhotoLocally(dataUrl) {
  try { localStorage.setItem('avatar_' + currentUser?.id, dataUrl); } catch(e) {}
  updateNavAvatar(dataUrl);
}

async function uploadPhotoToSupabase(file) {
  const btn = document.querySelector('.btn-upload-photo');
  if (btn) { btn.textContent = '⏳ Upload ho raha hai...'; btn.disabled = true; }
  try {
    const ext = file.name.split('.').pop() || 'jpg';
    const filePath = `avatars/${currentUser.id}.${ext}`;
    const { error: uploadErr } = await sb.storage.from('avatars').upload(filePath, file, { upsert: true, contentType: file.type });
    if (uploadErr) throw uploadErr;
    const { data: urlData } = sb.storage.from('avatars').getPublicUrl(filePath);
    const publicUrl = urlData.publicUrl + '?t=' + Date.now();
    await sb.from('profiles').upsert({
      id: currentUser.id,
      full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Student',
      avatar_url: publicUrl
    }, { onConflict: 'id' });
    try { localStorage.setItem('avatar_' + currentUser.id, publicUrl); } catch(e) {}
    // FIX Bug #14: Nav avatar turant update karo
    updateNavAvatar(publicUrl);
    if (btn) { btn.textContent = '📷 Photo Choose Karo'; btn.disabled = false; }
    alert('✅ Photo upload ho gayi!');
    closeProfileUpload();
  } catch(e) {
    console.error('Upload error:', e);
    if (btn) { btn.textContent = '📷 Photo Choose Karo'; btn.disabled = false; }
    alert('⚠️ Upload failed: ' + (e.message || 'Try again'));
  }
}

// FIX Bug #14: Nav avatar update — cache se bhi update ho
function updateNavAvatar(photoUrl) {
  const navAvatar = document.getElementById('navAvatar');
  if (!navAvatar) return;
  if (photoUrl) {
    navAvatar.innerHTML = `<img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
  } else {
    const initials = (currentUser?.user_metadata?.full_name || currentUser?.email || 'U').slice(0,2).toUpperCase();
    navAvatar.innerHTML = `<span id="navAvatarInitials">${initials}</span>`;
  }
}

async function loadNavAvatar() {
  const initials = (currentUser?.user_metadata?.full_name || currentUser?.email || 'U').slice(0,2).toUpperCase();
  const cached = localStorage.getItem('avatar_' + currentUser?.id);
  updateNavAvatar(cached || null);
  if (!cached) {
    const el = document.getElementById('navAvatarInitials');
    if (el) el.textContent = initials;
  }
  try {
    const { data } = await sb.from('profiles').select('avatar_url').eq('id', currentUser.id).single();
    if (data?.avatar_url) {
      try { localStorage.setItem('avatar_' + currentUser.id, data.avatar_url); } catch(e) {}
      updateNavAvatar(data.avatar_url);
    }
  } catch(e) {}
}

// ============ START ============
init();
loadTheme();
