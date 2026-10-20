/* Sustainable factors: progress needs maintenance; auxiliary states have real effects. */
(function(O){'use strict';
const keys=['health','happiness','knowledge','relationships'],all=[...keys,'stress','confidence'],clamp=O.dynamicsHelpers.clamp,esc=O.dynamicsHelpers.esc;
O.factorSnapshot=s=>Object.fromEntries(all.map(k=>[k,Number(s[k])||0]));
O.factorDelta=(a,s)=>Object.fromEntries(all.map(k=>[k,Math.round((s[k]-a[k])*10)/10]).filter(([,v])=>v));
const adjust=O.adjust;O.adjust=function(s,fx={}){
 const delta={...fx},stress=clamp((s.stress||0)+(fx.stress||0))-(s.stress||0),confidence=clamp((s.confidence||0)+(fx.confidence||0))-(s.confidence||0);
 // Acute strain and self-belief affect the four factors, without creating guaranteed success.
 delta.happiness=(delta.happiness||0)-stress*.32+confidence*.18;
 delta.health=(delta.health||0)-Math.max(0,stress)*.10;
 delta.knowledge=(delta.knowledge||0)+confidence*.06-Math.max(0,stress)*.05;
 delta.relationships=(delta.relationships||0)+confidence*.08-Math.max(0,stress)*.05;
 for(const k of keys)if(delta[k]>0)delta[k]*=Math.max(.06,Math.min(1,(100-s[k])/60));
 adjust(s,delta);for(const k of all)s[k]=Math.round(clamp(s[k])*10)/10;
};
O.previewFactors=(s,fx)=>{const copy={...s};O.adjust(copy,fx);return O.factorDelta(O.factorSnapshot(s),copy);};
// The school model used to bypass adjust and award uncapped linear gains.
O.schoolProgress=function(s,n){O.adjust(s,{knowledge:n});};
const passive=O.passive;O.passive=function(s){const before=O.factorSnapshot(s);passive(s);if(s.status!=='alive')return;
 const partner=s.people.find(p=>p.alive&&p.role==='Partner'),close=s.people.filter(p=>p.alive&&p.close>=55),pressure=Math.min(22,(s.debt/Math.max(1,s.country.ppp)) *7)+(s.flags.foodInsecure?10:0)+(s.stress>60?(s.stress-60)*.24:0);
 const targets={health:Math.max(25,82-Math.max(0,s.age-38)*.55-(s.flags.foodInsecure?12:0)),happiness:Math.max(20,62+Math.min(10,Math.log1p(Math.max(0,s.income)/s.country.ppp)*5)+(partner&&partner.close>=60?5:0)+(close.length?4:-5)-pressure),knowledge:Math.min(84,35+(s.school||s.study?.status==='enrolled'?20:0)+(s.focus==='Learning'?12:0)+(s.interests.length?5:0)),relationships:Math.min(84,45+Math.min(20,close.length*4)+(s.routines?.includes('connection')?7:0)+(partner&&partner.close>=60?6:0)-(s.stress>70?9:0))};
 const drift={};for(const k of keys){const rate=k==='knowledge'?.035:k==='health'?.045:.09;drift[k]=(targets[k]-s[k])*rate;}
 // Sustainable effort can beat these reference points, but very high bars take upkeep.
 if(s.stress>55){drift.health-=Math.min(2,(s.stress-55)*.045);drift.knowledge-=Math.min(1.5,(s.stress-55)*.035);}
 if(s.confidence<25)drift.happiness-=.6;
 adjust(s,drift);s.stress=clamp(s.stress+(pressure>8?1:-2));s.confidence=clamp(s.confidence+(50-s.confidence)*.035);
 for(const k of all)s[k]=Math.round(s[k]*10)/10;
 s.factorTrend={age:s.age,delta:O.factorDelta(before,s),drivers:[s.stress>55?'Sustained stress strains health, wellbeing and concentration.':'Ordinary recovery helps strain settle.',s.debt>s.country.ppp*.5?'Debt weighs on wellbeing.':'',close.length?'Close relationships support wellbeing.':'Limited close contact makes bonds harder to maintain.',s.school?'School contributes learning, with smaller gains at high levels.':'Knowledge needs continued use and practice.',s.age>50?'Age increases health-maintenance needs.':''].filter(Boolean)};const entry=s.journal.find(e=>e.age===s.age&&e.title==='Your yearly finances');if(entry)entry.effects=s.factorTrend.delta;
};
for(const name of ['applyChoice','fireStory','planAction','buy']){const fn=O[name];if(!fn)continue;O[name]=function(s,...args){const before=O.factorSnapshot(s),entry=s.journal[0],result=fn(s,...args);if(s.journal[0]!==entry)s.journal[0].effects=O.factorDelta(before,s);return result;};}
const effects=O.effectsHTML;O.effectsHTML=delta=>effects(Object.fromEntries(Object.entries(delta||{}).map(([k,v])=>[k,Math.round(v*10)/10])));
O.factorBalanceHTML=s=>`<details class="factor-explanation"><summary>How these factors change</summary><p>Stress ${Math.round(s.stress)}/100 · confidence ${Math.round(s.confidence)}/100. Stress immediately affects wellbeing and concentration; prolonged strain also affects health. Confidence supports wellbeing, learning and social contact, without guaranteeing success.</p><p>Positive gains become smaller near the top. Skills can keep growing even when a factor settles. High factors require time, recovery and supportive circumstances.</p>${s.factorTrend?`<p>Last year: ${O.effectsHTML(s.factorTrend.delta)}</p><ul>${s.factorTrend.drivers.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}</details>`;
const finances=O.financesHTML;O.financesHTML=s=>finances(s)+O.factorBalanceHTML(s);
O.VERSION='6.0.0';
})(window.OL);
