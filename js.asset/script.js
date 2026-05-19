const PLANS = [
  {
    name: "Foundation", price: "1,500", raw: 1500, duration: "3-6 months", featured: false,
    features: ["Full blood panel", "In-depth lifestyle and medical assessment", "Personalised action plan", "Nutrition guidance", "Monthly Follow up", "Medical weight loss support if clinically indicated"],
    suitability: "Built for clients who want structure, medical guidance, and steady accountability. Who it is suitable for: Best for teachers, nurses, receptionists, administrators, retail managers, shift workers, and early-career professionals who want expert direction without a premium-level spend."
  },
  {
    name: "Premium", price: "3,500", raw: 3500, duration: "6-12 months", featured: true, badge: "Most Popular",
    features: ["Everything in Foundation", "Monthly follow ups & accountability checks", "Grocery Guide", "Personalised Meal plan and workout plan with video demonstration", "Supplement Guide", "Full GLP-1 Program"],
    suitability: "More personalised support with stronger structure. Built for clients who want a tailored plan, better accountability, and easier day-to-day execution. Who is it suitable for: Best for managers, business owners, office professionals, sales representatives, consultants, and busy parents who need more support and customisation."
  },
  {
    name: "Executive", price: "10,000", raw: 10000, duration: "6-12 months", featured: false,
    features: ["Everything in Premium", "Dietician support", "Full doctor-led medical weight loss programme", "Gene-testing", "Monthly supplement allocation", "Premium Follow up support"],
    suitability: "Premium high-touch metabolic care. Built for clients who want the highest level of doctor-led support, convenience, and precision. Who it is suitable for: Best for executives, entrepreneurs, doctors, directors, and other high-performance professionals who want a premium service around a demanding schedule."
  }
];

const TESTS = [
  {name:'Nomsa K.',sub:'Lost 18kg · Premium Plan',bg:'#2D6A4F',s:5,t:"Dr Phiri completely changed how I think about weight loss. He found out I had insulin resistance, something no one had checked before."},
  {name:'Priya M.',sub:'Lost 12kg · Foundation Plan',bg:'#C9A84C',s:5,t:"I've tried every diet. Dr Phiri's approach is different, it's medical. He addresses the actual reason you gain weight. Not just telling you to eat less. Incredible."},
  {name:'Thabo D.',sub:'Lost 22kg · Executive Plan',bg:'#1B4332',s:5,t:"Worth every rand. Gene testing revealed a genetic obesity marker. With the tailored GLP-1 programme I've lost 22kg and feel better than I have in 15 years."},
  {name:'Liezel V.',sub:'PCOS Weight Loss',bg:'#40916C',s:5,t:"PCOS made weight loss impossible for me. Dr Phiri treated my hormones first. The weight started dropping naturally. I'm genuinely emotional about my progress."},
  {name:'Craig S.',sub:'Virtual · Cape Town',bg:'#2D6A4F',s:5,t:"I'm in Cape Town and did everything virtually. Seamless, blood tests at a local lab, all consults on video. Dr Phiri is thorough, kind, and professional."},
  {name:'Fatima A.',sub:'Lost 9kg · Budget Plan',bg:'#74C69D',s:5,t:"Started with the Budget Plan and results exceeded all my expectations. The meal plan was realistic and practical. I recommend Dr Phiri to absolutely everyone."}
];

const PF = {
  Foundation: ["Full blood panel", "In-depth lifestyle and medical assessment", "Personalised action plan", "Nutrition guidance", "Workout plan", "Monthly Follow up", "Medical weight loss support if clinically indicated"],
  Premium: ["Everything in Foundation", "Body Composition Scan", "Grocery Guide", "Personalised Meal plan", "Supplement Guide", "More tailored progress support"],
  Executive: ["Everything in Premium", "Dietician support", "Full doctor-led medical weight loss programme", "Gene-testing", "Monthly supplement allocation", "Premium Follow up support"],
  Consultation: ['30-minute consultation','Medical assessment','Prescription if required','Referral if needed'],
  Important: ['Medication is prescribed only when clinically appropriate after assessment','Programmes are designed to support sustainable progress, not quick fixes','Results vary between individuals depending on medical factors, adherence, lifestyle, and response to treatment.','Supplements and treatment recommendations are tailored to the individual package and clinical need']
};

let curPlan = { name: 'Foundation', amount: '1500', months: "3-6 months" };
let calM = new Date().getMonth();
let calY = new Date().getFullYear();

/* ─── RENDER PRICING CARDS ─── */
function renderPricing(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = PLANS.map(p => `
    <div class="pc ${p.featured ? 'featured' : ''}">
      ${p.badge ? `<div class="pc-ribbon">${p.badge}</div>` : ''}
      <div class="pc-tier">${p.name} Plan</div>
      <div class="pc-price"><sup>R</sup>${p.price}</div>
      <div class="pc-months">${p.duration} · Monthly payments</div>
      <ul class="pc-list">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>

      ${p.suitability ? `
      <div class="pc-suit-wrap">
        <button class="pc-suit-toggle" onclick="toggleSuitability(this)" aria-expanded="false">
          <span>Who is this for?</span>
          <svg class="pc-suit-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5L7 10L12 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="pc-suit-body">
          <p>${p.suitability}</p>
        </div>
      </div>` : ''}

      <button class="pc-btn ${p.featured ? 'pc-btn-f' : 'pc-btn-o'}" onclick="goBook('${p.name}', ${p.raw}, '${p.duration}')">
        Select ${p.name} Plan →
      </button>
    </div>
  `).join('');
}

/* ─── SUITABILITY TOGGLE ─── */
function toggleSuitability(btn) {
  const wrap = btn.closest('.pc-suit-wrap');
  const body = wrap.querySelector('.pc-suit-body');
  const isOpen = wrap.classList.contains('open');

  if (isOpen) {
    body.style.maxHeight = body.scrollHeight + 'px';
    requestAnimationFrame(() => { body.style.maxHeight = '0'; });
    wrap.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  } else {
    body.style.maxHeight = '0';
    wrap.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => { body.style.maxHeight = body.scrollHeight + 'px'; });
  }
}

/* ─── RENDER TESTIMONIALS ─── */
function renderTests(id, n) {
  const el = document.getElementById(id);
  if (!el) return;
  const list = n ? TESTS.slice(0, n) : TESTS;
  el.innerHTML = list.map(t => `
    <div class="tcard">
      <div class="tcard-stars">${'★'.repeat(t.s)}</div>
      <div class="tcard-text">"${t.t}"</div>
      <div class="tcard-author">
        <div class="tcard-av" style="background:${t.bg}">${t.name[0]}</div>
        <div><div class="tcard-name">${t.name}</div><div class="tcard-sub">${t.sub}</div></div>
      </div>
    </div>`).join('');
}

/* ─── GO TO BOOKING PAGE ─── */
function goBook(name, amt, pmth) {
  localStorage.setItem('selectedPlan', JSON.stringify({ name, amt, pmth }));
  window.location.href = 'booking.html';
}

/* ─── NAVIGATION ─── */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const t = document.getElementById('page-' + pageId);
  if (t) t.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.page === pageId));
  window.scrollTo(0, 0);
  document.getElementById('nav-links').classList.remove('open');
  if (pageId === 'booking') renderCal();
}

function toggleMobile() {
  document.getElementById('nav-links').classList.toggle('open');
}

/* ─── LIGHTBOX ─── */
function openLb(card) {
  const img = card.querySelector('img');
  const title = card.querySelector('.title').textContent;
  const sub = card.querySelector('.sub').textContent;
  document.getElementById('lb-img').src = img.src;
  document.getElementById('lb-img').alt = img.alt;
  document.getElementById('lb-title').textContent = title;
  document.getElementById('lb-sub').textContent = sub;
  document.getElementById('lightbox').classList.add('open');
}

function closeLb(e) {
  if (!e || e.target === document.getElementById('lightbox') || e.target === document.getElementById('lightbox-close')) {
    document.getElementById('lightbox').classList.remove('open');
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
  }
});

/* ─── BOOKING ─── */
function selectAtype(el, type) {
  el.closest('.atypes').querySelectorAll('.atype').forEach(e => e.classList.remove('sel'));
  el.classList.add('sel');
  const s = document.getElementById('sum-type');
  if (s) s.textContent = type;
}

function pickTime(el, t) {
  document.querySelectorAll('.tslot').forEach(e => e.classList.remove('sel'));
  el.classList.add('sel');
  const s = document.getElementById('sum-time');
  if (s) s.textContent = t;
}

/* ─── SEND A MESSAGE ─── */
async function handleContact() {
  const fname   = document.getElementById('cf-fname').value.trim();
  const lname   = document.getElementById('cf-lname').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const phone   = document.getElementById('cf-phone').value.trim();
  const subject = document.getElementById('cf-subject').value;
  const message = document.getElementById('cf-message').value.trim();

  if (!fname || !email || !subject || !message) {
    alert('Please fill in first name, email, subject and message.');
    return;
  }

  const fullBody =
    'PATIENT ENQUIRY — CONTACT FORM\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    'First Name : ' + fname + '\n' +
    'Last Name  : ' + (lname || 'Not provided') + '\n' +
    'Email      : ' + email + '\n' +
    'Phone      : ' + (phone || 'Not provided') + '\n' +
    'Subject    : ' + subject + '\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    'Message:\n' + message;

  try {
    await emailjs.send("service_6pd7h1f", "template_if4oywn", {
      from_name:  fname + ' ' + lname,
      from_email: email,
      phone:      phone || 'Not provided',
      subject:    subject,
      message:    fullBody,
      reply_to:   email
    });
    alert('Message sent! Dr Phiri will be in touch within 24 hours.');
  } catch(e) {
    alert('Failed to send. Please try again.');
    console.error(e);
  }
}

/* ─── PAYMENT ─── */
function inbookPickPlan(el, name, amt, months) {
  el.closest('.plan-pills').querySelectorAll('.plan-pill').forEach(e => e.classList.remove('sel'));
  el.classList.add('sel');
  inbookUpdatePlan(name, amt, months);
}

function inbookUpdatePlan(name, amt, months) {
  const raw = parseInt(amt);
  const fmt = raw.toLocaleString();
  curPlan = { name, amount: String(raw), months };
  const sp = document.getElementById('sum-plan');       if (sp) sp.textContent = name + ' Plan';
  const st = document.getElementById('sum-total-amt');  if (st) st.textContent = 'R' + fmt;
  const pn = document.getElementById('ib-plan-name');   if (pn) pn.textContent = name + ' Plan';
  const ba = document.getElementById('ib-btn-amt');     if (ba) ba.textContent = 'R' + fmt;
  const il = document.getElementById('ib-inc-list');
  if (il) il.innerHTML = (PF[name] || PF.Foundation).map(f => '<li>' + f + '</li>').join('');
}

function ibPickMethod(el, m) {
  el.closest('.ptabs').querySelectorAll('.ptab').forEach(t => t.classList.remove('sel'));
  el.classList.add('sel');
  document.getElementById('ib-card-sec').style.display    = m === 'card'     ? 'block' : 'none';
  document.getElementById('ib-eft-sec').style.display     = m === 'eft'      ? 'block' : 'none';
  document.getElementById('ib-ss-sec').style.display      = m === 'snapscan' ? 'block' : 'none';
  const pl = document.getElementById('ib-pl-sec');
  if (pl) pl.style.display = m === 'paylater' ? 'block' : 'none';
}

function ibFmtCard(inp) {
  let v = inp.value.replace(/\D/g, ''), o = '';
  for (let i = 0; i < v.length && i < 16; i++) { if (i && i % 4 === 0) o += ' '; o += v[i]; }
  inp.value = o;
  const d = document.getElementById('ib-d-num');
  if (d) d.textContent = o || '•••• •••• •••• ••••';
}

function ibFmtExp(inp) {
  let v = inp.value.replace(/\D/g, '');
  if (v.length >= 2) v = v.slice(0, 2) + ' / ' + v.slice(2, 4);
  inp.value = v;
  const d = document.getElementById('ib-d-exp');
  if (d) d.textContent = inp.value || 'MM / YY';
}

/* ─── AVAILABILITY ─── */
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const WEEKDAY_SLOTS = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30'];
const SATURDAY_SLOTS = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30'];
const DEFAULT_AVAIL = {
  Monday:{on:true,slots:WEEKDAY_SLOTS}, Tuesday:{on:true,slots:WEEKDAY_SLOTS},
  Wednesday:{on:true,slots:WEEKDAY_SLOTS}, Thursday:{on:true,slots:WEEKDAY_SLOTS},
  Friday:{on:true,slots:WEEKDAY_SLOTS}, Saturday:{on:true,slots:SATURDAY_SLOTS},
  Sunday:{on:false,slots:[]}
};

function getAvail()    { try { const s=localStorage.getItem('drp_avail');    return s?JSON.parse(s):DEFAULT_AVAIL; } catch(e){return DEFAULT_AVAIL;} }
function getBlocked()  { try { const s=localStorage.getItem('drp_blocked');  return s?JSON.parse(s):[];           } catch(e){return [];} }
function getBookings() { try { const s=localStorage.getItem('drp_bookings'); return s?JSON.parse(s):[];           } catch(e){return [];} }

function isoKey(y,m,d) { return y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0'); }
let selectedDateKey = null;

function getAvailableSlots(dateKey) {
  const dt      = new Date(dateKey+'T00:00:00');
  const dayName = DAY_NAMES[dt.getDay()];
  const avail   = getAvail();
  if (getBlocked().includes(dateKey)) return [];
  if (!avail[dayName]||!avail[dayName].on) return [];
  const booked = getBookings().filter(b=>b.date===dateKey).map(b=>b.time);
  return avail[dayName].slots.filter(s=>!booked.includes(s));
}

/* ─── CALENDAR RENDER ─── */
function renderCal() {
  const mn  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const ct  = document.getElementById('cal-title'), cg = document.getElementById('cal-grid');
  if (!ct||!cg) return;
  ct.textContent = mn[calM]+' '+calY;
  const today = new Date();
  const fd    = new Date(calY,calM,1).getDay();
  const dim   = new Date(calY,calM+1,0).getDate();
  let html    = ['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d=>'<div class="cal-dh">'+d+'</div>').join('');
  for (let i=0;i<fd;i++) html+='<div class="cal-d emp"></div>';
  for (let d=1; d<=dim; d++) {
    const dt     = new Date(calY,calM,d);
    const isT    = dt.toDateString()===today.toDateString();
    const isPast = dt<today&&!isT;
    const isSun  = dt.getDay()===0;
    const key    = isoKey(calY,calM,d);
    const avail  = getAvail();
    const dayNm  = DAY_NAMES[dt.getDay()];
    const hasAv  = !isPast&&!isSun&&!getBlocked().includes(key)&&avail[dayNm]&&avail[dayNm].on&&avail[dayNm].slots.length>0;
    const dis    = isPast||isSun||!hasAv;
    let cls = 'cal-d'+(isT?' tod':'')+(dis?' dis':'')+(hasAv?' avail':'');
    html += '<div class="'+cls+'"'+(dis?'':' onclick="pickDate(this,'+d+')"')+'>'+d+'</div>';
  }
  cg.innerHTML = html;
  if (!document.getElementById('cal-legend')) {
    const leg = document.createElement('div');
    leg.id = 'cal-legend';
    leg.style.cssText = 'display:flex;gap:1rem;margin-top:.65rem;font-size:11px;color:var(--muted);flex-wrap:wrap;';
    leg.innerHTML = '<span style="display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:50%;background:var(--forest);display:inline-block;"></span>Available</span><span style="display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:50%;background:#d1d5db;display:inline-block;"></span>Unavailable</span>';
    cg.parentElement.appendChild(leg);
  }
}

function changeMonth(dir) {
  calM+=dir;
  if (calM>11){calM=0;calY++;} if (calM<0){calM=11;calY--;}
  renderCal();
}

function pickDate(el,d) {
  document.querySelectorAll('.cal-d').forEach(x=>x.classList.remove('sel'));
  el.classList.add('sel');
  const mn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const sd = document.getElementById('sum-date');
  if (sd) sd.textContent = d+' '+mn[calM]+' '+calY;
  selectedDateKey = isoKey(calY,calM,d);
  const st = document.getElementById('sum-time');
  if (st) st.textContent = 'Select a time';
  renderTimeSlots(selectedDateKey);
}

function renderTimeSlots(dateKey) {
  const wrap = document.querySelector('.tslots');
  if (!wrap) return;
  const avail     = getAvail();
  const dt        = new Date(dateKey+'T00:00:00');
  const dayName   = DAY_NAMES[dt.getDay()];
  const allSlots  = (avail[dayName]&&avail[dayName].slots) ? avail[dayName].slots : [];
  if (!allSlots.length) return;
  const booked    = getBookings().filter(b=>b.date===dateKey).map(b=>b.time);
  const available = getAvailableSlots(dateKey);
  wrap.innerHTML  = allSlots.map(s => {
    if (booked.includes(s))    return '<div class="tslot unav">'+s+' 🔒</div>';
    if (available.includes(s)) return '<div class="tslot" onclick="pickTime(this,\''+s+'\')">'+s+'</div>';
    return '<div class="tslot unav">'+s+'</div>';
  }).join('');
}

/* ─── GOOGLE CALENDAR LINK ─── */
function buildGCalLink(dateStr, timeStr, fullName, apptType, reason, phone, email, plan, payStatus) {
  const months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11,
    January:0,February:1,March:2,April:3,June:5,July:6,August:7,September:8,October:9,November:10,December:11};
  const p = dateStr.trim().split(' ');
  const s = new Date(parseInt(p[2]),months[p[1]],parseInt(p[0]),parseInt(timeStr.split(':')[0]),parseInt(timeStr.split(':')[1]));
  const e = new Date(s.getTime()+30*60000);
  const pad = n=>String(n).padStart(2,'0');
  const fmt = d=>d.getFullYear()+''+pad(d.getMonth()+1)+''+pad(d.getDate())+'T'+pad(d.getHours())+''+pad(d.getMinutes())+'00';
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    +'&text='+encodeURIComponent('🩺 Appt: '+fullName+' — '+apptType)
    +'&dates='+fmt(s)+'/'+fmt(e)
    +'&details='+encodeURIComponent('Patient: '+fullName+'\nPhone: '+phone+'\nEmail: '+email+'\nReason: '+reason+'\nPlan: '+plan+'\nPayment: '+payStatus)
    +'&location='+encodeURIComponent('Suite 13, Room 2, Odyssey Medical Centre, 1 Simbithi Dr, Ballito');
}

/* ─── BOOKING ─── */
async function doBookingAndPay(method) {
  const fnEl    = document.getElementById('b-fname');
  const lnEl    = document.getElementById('b-lname');
  const emailEl = document.getElementById('b-email');
  const phoneEl = document.getElementById('b-phone');
  const reasonEl= document.getElementById('b-reason');
  const sd      = document.getElementById('sum-date');
  const st      = document.getElementById('sum-time');
  const typeEl  = document.getElementById('sum-type');

  if (!fnEl||!fnEl.value.trim())                        { alert('Please fill in your first name.');    return; }
  if (!sd||sd.textContent==='Select a date')            { alert('Please select a date.');              return; }
  if (!st||st.textContent==='Select a time')            { alert('Please select a time slot.');         return; }

  const fname    = fnEl.value.trim();
  const lname    = lnEl     ? lnEl.value.trim()    : '';
  const email    = emailEl  ? emailEl.value.trim() : '';
  const phone    = phoneEl  ? phoneEl.value.trim() : '';
  const reason   = reasonEl ? reasonEl.value       : 'Not selected';
  const fullName = (fname+' '+lname).trim();
  const apptType = typeEl   ? typeEl.textContent   : 'In-Person';
  const amtFmt   = parseInt(curPlan.amount).toLocaleString();

  const payLabels = {
    card:     '✅ PAID: Card',
    eft:      '⚠️ PAYMENT PENDING: EFT (not yet received)',
    snapscan: '⚠️ PAYMENT PENDING: SnapScan',
    paylater: '📋 PAY ON THE DAY: Patient pays after consultation'
  };
  const payStatus  = payLabels[method]||'Unknown';
  const isPaid     = method==='card';
  const isPayLater = method==='paylater';

  const gcalLink = buildGCalLink(sd.textContent, st.textContent, fullName, apptType, reason,
    phone||'Not provided', email||'Not provided', curPlan.name+' Plan: R'+amtFmt, payStatus);

  const prefix = isPaid ? '✅ New Paid Booking' : isPayLater ? '📋 New Booking: Pay on Day' : '⚠️ New Booking: Payment Pending';
  const emailSubject = prefix+' | '+fullName+' | '+sd.textContent+' at '+st.textContent;

  const body =
    '═══════════════════════════════════════\n'+
    '  NEW APPOINTMENT  DR M PHIRI\n'+
    '═══════════════════════════════════════\n\n'+
    '📅 ADD TO GOOGLE CALENDAR:\n'+gcalLink+'\n\n'+
    'PAYMENT STATUS: '+payStatus+'\n\n'+
    '─── PATIENT DETAILS ────────────────────\n'+
    '  Name  : '+fullName+'\n'+
    '  Email : '+(email||'Not provided')+'\n'+
    '  Phone : '+(phone||'Not provided')+'\n\n'+
    '─── APPOINTMENT ────────────────────────\n'+
    '  Type   : '+apptType+'\n'+
    '  Date   : '+sd.textContent+'\n'+
    '  Time   : '+st.textContent+'\n'+
    '  Reason : '+reason+'\n\n'+
    '─── PLAN & PAYMENT ─────────────────────\n'+
    '  Plan   : '+curPlan.name+' Plan\n'+
    '  Amount : R'+amtFmt+'\n\n'+
    (isPayLater ? '⚠️ REMINDER: '+fullName+' will pay R'+amtFmt+' after the consultation on '+sd.textContent+'.\n' :
     !isPaid    ? '⚠️ ACTION REQUIRED: Verify payment before the appointment.\n' : '')+
    '\n═══════════════════════════════════════';

  try {
    await emailjs.send("service_6pd7h1f", "template_if4oywn", {
      from_name:  fullName,
      from_email: email||'noreply@drphiri.co.za',
      phone:      phone||'Not provided',
      subject:    emailSubject,
      message:    body,
      reply_to:   email||'noreply@drphiri.co.za'
    });
  } catch(e) {
    console.error('EmailJS failed:', e);
  }

  window._lastGCalLink = gcalLink;

  if (isPayLater)
    showSuccess('Booking Confirmed!\nDate: '+sd.textContent+' at '+st.textContent+' · '+curPlan.name+' Plan. Payment of R'+amtFmt+' is due after your consultation. See you then, '+fname+'!');
  else if (method==='eft')
    showSuccess('Booking Confirmed!\nDate: '+sd.textContent+' at '+st.textContent+' · '+curPlan.name+' Plan (R'+amtFmt+'). Please EFT using reference: '+fullName+'. Banking details are on the booking page.');
  else
    showSuccess('Booking Confirmed!\nDate: '+sd.textContent+' at '+st.textContent+' · '+curPlan.name+' Plan (R'+amtFmt+'). See you then, '+fname+'!');
}

/* ─── SUCCESS ─── */
function showSuccess(msg) {
  const parts = msg.split('\n');
  document.getElementById('suc-title').textContent = parts[0];
  document.getElementById('suc-sub').textContent   = parts.slice(1).join(' ') || "Dr Phiri's team will be in touch soon.";
  const gcalLink = window._lastGCalLink;
  const sucOv    = document.getElementById('suc-ov');
  let gcalEl     = document.getElementById('suc-gcal-btn');
  if (!gcalEl&&sucOv) {
    gcalEl    = document.createElement('div');
    gcalEl.id = 'suc-gcal-btn';
    gcalEl.style.cssText = 'margin-top:1.25rem;text-align:center;';
    sucOv.appendChild(gcalEl);
  }
  if (gcalEl) {
    gcalEl.innerHTML = gcalLink
      ? '<a href="'+gcalLink+'" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:9px;background:#1a73e8;color:#fff;padding:.75rem 1.4rem;border-radius:11px;font-size:13.5px;font-weight:700;text-decoration:none;">📅 Add to Google Calendar</a><div style="font-size:11px;color:#888;margin-top:.5rem;">Dr Phiri has also been notified by email.</div>'
      : '';
  }
  document.getElementById('suc-ov').classList.add('show');
}

function closeSuccess() {
  document.getElementById('suc-ov').classList.remove('show');
  window._lastGCalLink = null;
  window.location.href = 'index.html';
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', function () {
  emailjs.init({ publicKey: "BpcUepaoJqXT3U6B2" });

  renderPricing('home-pricing');
  renderPricing('services-pricing');
  renderTests('home-testimonials', 3);
  renderTests('all-testimonials');
  renderCal();

  // Auto-select plan when arriving from "Select Plan" button
  (function applyStoredPlan() {
    const stored = localStorage.getItem('selectedPlan');
    if (!stored) {
      inbookUpdatePlan('Foundation', '1500', '3-6 months');
      return;
    }
    try {
      const { name, amt, pmth } = JSON.parse(stored);
      document.querySelectorAll('.plan-pills .plan-pill').forEach(el => {
        const label = el.querySelector('.pp-name');
        if (label) el.classList.toggle('sel', label.textContent.trim() === name);
      });
      inbookUpdatePlan(name, String(amt), pmth);
      localStorage.removeItem('selectedPlan');
    } catch(e) {
      inbookUpdatePlan('Foundation', '1500', '3-6 months');
    }
  })();
});