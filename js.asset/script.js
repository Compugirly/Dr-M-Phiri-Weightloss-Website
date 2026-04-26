const PLANS=[
  {name:'Budget',price:'3,500',raw:3500,weeks:8,feat:false,
   feats:['Full blood panel','Lifestyle analysis + body composition scan','Action plan','Meal plan','Workout plan','Follow up x 2' ]},
  {name:'Premium',price:'8,000',raw:8000,weeks:8,feat:true,badge:'Most Popular',
   feats:['Full blood panel','Lifestyle analysis + body composition scan','Action plan','Meal plan','2× weight loss drips / month','2× GLP-1 injections / month','Follow up']},
  {name:'Executive',price:'15,000',raw:10000,weeks:12,feat:false,
   feats:['Full blood panel','Lifestyle analysis + body composition scan','Meal plan','Gene-testing','Fully tailored GLP-1 programme','Follow up']}
];
const TESTS=[
  {name:'Nomsa K.',sub:'Lost 18kg · Premium Plan',bg:'#2D6A4F',s:5,t:"Dr Phiri completely changed how I think about weight loss. He found out I had insulin resistance — something no one had checked before. Lost 18kg in 3 months."},
  {name:'Priya M.',sub:'Lost 12kg · Budget Plan',bg:'#C9A84C',s:5,t:"I've tried every diet. Dr Phiri's approach is different — it's medical. He addresses the actual reason you gain weight. Not just telling you to eat less. Incredible."},
  {name:'Thabo D.',sub:'Lost 22kg · Executive Plan',bg:'#1B4332',s:5,t:"Worth every rand. Gene testing revealed a genetic obesity marker. With the tailored GLP-1 programme I've lost 22kg and feel better than I have in 15 years."},
  {name:'Liezel V.',sub:'PCOS Weight Loss',bg:'#40916C',s:5,t:"PCOS made weight loss impossible for me. Dr Phiri treated my hormones first. The weight started dropping naturally. I'm genuinely emotional about my progress."},
  {name:'Craig S.',sub:'Virtual · Cape Town',bg:'#2D6A4F',s:5,t:"I'm in Cape Town and did everything virtually. Seamless — blood tests at a local lab, all consults on video. Dr Phiri is thorough, kind, and professional."},
  {name:'Fatima A.',sub:'Lost 9kg · Budget Plan',bg:'#74C69D',s:5,t:"Started with the Budget Plan and results exceeded all my expectations. The meal plan was realistic and practical. I recommend Dr Phiri to absolutely everyone."}
];
const PF={
  Budget:['Full blood panel','Lifestyle analysis + body composition scan','Action plan','Meal plan','Workout plan','Follow up x 2'],
  Premium:['Full blood panel','Lifestyle analysis + body composition scan','Action plan','Meal plan','2× weight loss drips / month','2× GLP-1 injections / month','Follow up'],
  Executive:['Full blood panel','Lifestyle analysis + body composition scan','Meal plan','Gene-testing','Fully tailored GLP-1 programme','Follow up'],
  Consultation:['30-minute consultation','Medical assessment','Prescription if required','Referral if needed']
};
let curPlan={name:'Budget',amount:'3500',weeks:'8'};

/* ─── RENDER ─── */
function renderPricing(id){
  const el=document.getElementById(id);if(!el)return;
  el.innerHTML=PLANS.map(p=>`
    <div class="pc ${p.feat?'featured':''}">
      ${p.badge?`<div class="pc-ribbon">${p.badge}</div>`:''}
      <div class="pc-tier">${p.name} Plan</div>
      <div class="pc-price"><sup>R</sup>${p.price}</div>
      <div class="pc-weeks">${p.weeks}-Week Programme · Once-off Payment</div>
      <ul class="pc-list">${p.feats.map(f=>`<li>${f}</li>`).join('')}</ul>
      <button class="pc-btn ${p.feat?'pc-btn-f':'pc-btn-o'}" onclick="goBook('${p.name}','${p.raw}',${p.weeks})">
        Select ${p.name} Plan →
      </button>
    </div>`).join('');
}
function renderTests(id,n){
  const el=document.getElementById(id);if(!el)return;
  const list=n?TESTS.slice(0,n):TESTS;
  el.innerHTML=list.map(t=>`
    <div class="tcard">
      <div class="tcard-stars">${'★'.repeat(t.s)}</div>
      <div class="tcard-text">"${t.t}"</div>
      <div class="tcard-author">
        <div class="tcard-av" style="background:${t.bg}">${t.name[0]}</div>
        <div><div class="tcard-name">${t.name}</div><div class="tcard-sub">${t.sub}</div></div>
      </div>
    </div>`).join('');
}
function goBook(name,amt,wks){
  showPage('booking');
  document.querySelectorAll('.plan-pills .plan-pill').forEach(el=>{
    const label=el.querySelector('.pp-name');
    if(label) el.classList.toggle('sel',label.textContent===name);
  });
  inbookUpdatePlan(name,String(amt),wks);
}

/* ─── NAVIGATION ─── */
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const t=document.getElementById('page-'+name);
  if(t)t.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.dataset.page===name));
  window.scrollTo(0,0);
  document.getElementById('nav-links').classList.remove('open');
  if(name==='booking')renderCal();
}
function toggleMobile(){document.getElementById('nav-links').classList.toggle('open');}

/* ─── CALENDAR ─── */
let calM=new Date().getMonth(),calY=new Date().getFullYear();
function renderCal(){
  const mn=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const ct=document.getElementById('cal-title'),cg=document.getElementById('cal-grid');
  if(!ct||!cg)return;
  ct.textContent=`${mn[calM]} ${calY}`;
  const ds=['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const today=new Date();
  const fd=new Date(calY,calM,1).getDay();
  const dim=new Date(calY,calM+1,0).getDate();
  let html=ds.map(d=>`<div class="cal-dh">${d}</div>`).join('');
  for(let i=0;i<fd;i++)html+='<div class="cal-d emp"></div>';
  for(let d=1;d<=dim;d++){
    const dt=new Date(calY,calM,d);
    const isT=dt.toDateString()===today.toDateString();
    const dis=(dt<today&&!isT)||dt.getDay()===0;
    html+=`<div class="cal-d${isT?' tod':''}${dis?' dis':''}" ${dis?'':'onclick="pickDate(this,'+d+')"'}>${d}</div>`;
  }
  cg.innerHTML=html;
}
function changeMonth(dir){
  calM+=dir;
  if(calM>11){calM=0;calY++;}
  if(calM<0){calM=11;calY--;}
  renderCal();
}
function pickDate(el,d){
  document.querySelectorAll('.cal-d').forEach(x=>x.classList.remove('sel'));
  el.classList.add('sel');
  const mn=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const sd=document.getElementById('sum-date');
  if(sd)sd.textContent=`${d} ${mn[calM]} ${calY}`;
}

/* ─── BOOKING ─── */
function selectAtype(el,type){
  el.closest('.atypes').querySelectorAll('.atype').forEach(e=>e.classList.remove('sel'));
  el.classList.add('sel');
  const s=document.getElementById('sum-type');if(s)s.textContent=type;
}
function pickTime(el,t){
  document.querySelectorAll('.tslot').forEach(e=>e.classList.remove('sel'));
  el.classList.add('sel');
  const s=document.getElementById('sum-time');if(s)s.textContent=t;
}

/* ─── PAYMENT ─── */
function inbookPickPlan(el,name,amt,wks){
  el.closest('.plan-pills').querySelectorAll('.plan-pill').forEach(e=>e.classList.remove('sel'));
  el.classList.add('sel');
  inbookUpdatePlan(name,amt,wks);
}
function inbookUpdatePlan(name,amt,wks){
  const raw=parseInt(amt);
  const fmt=raw.toLocaleString();
  curPlan={name,amount:String(raw),weeks:wks};

  const sp=document.getElementById('sum-plan');
  if(sp)sp.textContent=name+' Plan';

  const st=document.getElementById('sum-total-amt');
  if(st)st.textContent='R'+fmt;

  const pn=document.getElementById('ib-plan-name');
  if(pn)pn.textContent=name+' Plan';

  const ba=document.getElementById('ib-btn-amt');
  if(ba)ba.textContent='R'+fmt;

  const il=document.getElementById('ib-inc-list');
  const fs=PF[name]||PF.Budget;
  if(il)il.innerHTML=fs.map(f=>`<li>${f}</li>`).join('');
}
function ibPickMethod(el,m){
  el.closest('.ptabs').querySelectorAll('.ptab').forEach(t=>t.classList.remove('sel'));
  el.classList.add('sel');
  document.getElementById('ib-card-sec').style.display=m==='card'?'block':'none';
  document.getElementById('ib-eft-sec').style.display=m==='eft'?'block':'none';
  document.getElementById('ib-ss-sec').style.display=m==='snapscan'?'block':'none';
}
function ibFmtCard(inp){
  let v=inp.value.replace(/\D/g,''),o='';
  for(let i=0;i<v.length&&i<16;i++){if(i&&i%4===0)o+=' ';o+=v[i];}
  inp.value=o;
  const d=document.getElementById('ib-d-num');if(d)d.textContent=o||'•••• •••• •••• ••••';
}
function ibFmtExp(inp){
  let v=inp.value.replace(/\D/g,'');
  if(v.length>=2)v=v.slice(0,2)+' / '+v.slice(2,4);
  inp.value=v;
  const d=document.getElementById('ib-d-exp');if(d)d.textContent=inp.value||'MM / YY';
}
function doBookingAndPay(method){
  const fn=document.getElementById('b-fname');
  const sd=document.getElementById('sum-date');
  const st=document.getElementById('sum-time');
  if(!fn||!fn.value.trim()){alert('Please fill in your name in Step 1.');return;}
  if(!sd||sd.textContent==='Select a date'){alert('Please select a date.');return;}
  if(!st||st.textContent==='Select a time'){alert('Please select a time slot.');return;}
  const fmt=parseInt(curPlan.amount).toLocaleString();
  if(method==='eft')showSuccess(`Booking Confirmed!\nDate: ${sd.textContent} at ${st.textContent} · ${curPlan.name} Plan (R${fmt}). EFT banking details have been emailed to you.`);
  else if(method==='snapscan')showSuccess(`Booking Confirmed!\nDate: ${sd.textContent} at ${st.textContent} · ${curPlan.name} Plan (R${fmt}). Thank you, ${fn.value}!`);
  else showSuccess(`Booking Confirmed + Payment Successful!\nDate: ${sd.textContent} at ${st.textContent} · ${curPlan.name} Plan (R${fmt}). See you then, ${fn.value}!`);
}

/* ─── CONTACT ─── */
function handleContact(){
  const fn=document.getElementById('cf-fname');
  if(!fn||!fn.value.trim()){alert('Please fill in your name.');return;}
  showSuccess(`Message Sent!\nThank you ${fn.value}. Dr Phiri's team will respond within 24 hours.`);
}

/* ─── SUCCESS ─── */
function showSuccess(msg){
  const parts=msg.split('\n');
  document.getElementById('suc-title').textContent=parts[0];
  document.getElementById('suc-sub').textContent=parts.slice(1).join(' ')||"Dr Phiri's team will be in touch soon.";
  document.getElementById('suc-ov').classList.add('show');
}
function closeSuccess(){
  document.getElementById('suc-ov').classList.remove('show');
  showPage('home');
}

/* ─── INIT ─── */
renderPricing('home-pricing');
renderPricing('services-pricing');
renderTests('home-testimonials',3);
renderTests('all-testimonials');
renderCal();
inbookUpdatePlan('Budget','3500',8);