
/* Original ordinary-life events. These are illustrative narrative possibilities, not
   measured demographic event rates. Risk is conditional rather than deterministic. */
(function(O){
const stories=[];
function add(id,age0,age1,weight,when,title,body,scene='home',effect){
 stories.push({id,min:age0,max:age1,weight,when,title,body,scene,effect});
}
const rel=s=>s.people.filter(p=>p.alive&&['Parent','Mother','Father'].includes(p.role))[0];
const friend=s=>s.people.find(p=>p.alive&&p.role==='Friend');
const partner=s=>s.people.find(p=>p.alive&&p.role==='Partner');
const child=s=>s.people.find(p=>p.alive&&p.role==='Child');
const p=s=>s.strata;
const diff=s=>s.strata<2?'Money is tight, which limits how freely your household can respond.':s.strata>=6?'Your household has savings and connections that make adapting easier.':'Your household manages some costs and worries about others.';
const home=s=>s.urban?'your neighbourhood':'your village and the surrounding area';
const fond=s=>rel(s)?O.personLabel(rel(s)):'A caregiver';
// Early childhood, school, belonging.
add('baby-cares',0,3,8,()=>true,'A familiar voice',s=>`${fond(s)} spends part of the day caring for you. The availability of adults and their own work obligations shape your earliest routines.`,'home',s=>O.adjust(s,{relationships:1}));
add('baby-sleep',0,3,6,()=>true,'Sleepless nights',s=>`Your caregivers rearrange their schedules around feeding, sleep and work. ${diff(s)}`);
add('baby-health',0,5,5,s=>s.country.infra<76,'A visit for childhood care',s=>`A routine child-health concern takes your family to a local clinic. The journey, availability of care and cost matter as much as the illness itself.`,'clinic');
add('first-words',1,4,7,()=>true,'Words begin to form',s=>`You begin using new words. People around you repeat familiar stories, songs and expressions.`,'home',s=>O.adjust(s,{knowledge:1}));
add('playground',3,11,8,()=>true,'An ordinary afternoon',s=>`You spend time playing with other children near ${home(s)}. You learn that companionship often means sharing space and taking turns.`,'park');
add('early-belonging',2,10,7,()=>true,'Home and belonging',s=>`The people in your household have their own routines and worries. Your sense of safety depends more on them than on choices you can make yourself.`);
add('first-classroom',5,11,7,s=>s.school,'The classroom',s=>`You learn alongside children with different temperaments and resources. Materials, transport and teachers all influence what school offers.`,'school',s=>O.adjust(s,{knowledge:1}));
add('out-of-school',6,16,7,s=>!s.school,'Learning outside school',s=>`You gain knowledge through work, family and your surroundings. Without regular classroom attendance, some qualifications remain harder to obtain.`,'home',s=>O.adjust(s,{knowledge:1}));
add('school-friendship',6,17,8,s=>s.school,'A conversation at school',s=>`A classmate helps you understand a lesson. A small exchange leaves you feeling more confident about returning tomorrow.`,'school',s=>O.adjust(s,{relationships:2}));
add('school-challenge',7,17,6,s=>s.school,'A hard lesson',s=>`Some schoolwork takes longer than expected. Your access to quiet study space, books and help at home influences how you respond.`,'school',s=>O.adjust(s,{stress:1}));
add('family-chores',7,17,7,()=>true,'Work at home',s=>`Household chores take up some of your afternoon. ${p(s)<2?'The family depends on everyone contributing in practical ways.':'They are part of learning how the household runs.'}`,'home');
add('market-day',5,17,6,()=>true,'A trip through the neighbourhood',s=>`You watch people trading, working and commuting in ${home(s)}. The differences between households become more visible as you grow older.`,'city');
add('child-expectations',8,17,6,()=>true,'Expectations grow',s=>`${fond(s)} has opinions about what your future could look like. Their advice reflects both hopes for you and the life they have experienced.`);
add('adolescent-change',12,19,9,()=>true,'Becoming your own person',s=>`Your tastes, confidence and friendships are changing. You begin to notice the difference between what you want and what others expect.`,'park',s=>O.adjust(s,{confidence:1}));
add('tests',12,20,6,s=>s.school,'Assessment season',s=>`School assessments approach. Previous preparation, family expectations and opportunities for additional help all affect the pressure you feel.`,'school',s=>O.adjust(s,{stress:2}));
add('learning-hobby',10,24,5,()=>true,'A new interest',s=>`You spend time with a subject, skill or pastime that draws your attention. Interests can shape your future, even when they never become a profession.`,'park',s=>O.adjust(s,{happiness:2}));
add('adolescent-friends',12,22,7,s=>!!friend(s),'Time with a friend',s=>`${O.personLabel(friend(s))} shares a worry and asks what you think. Listening changes the friendship a little.`,'park',s=>O.bond(s,'Friend',2));
add('adolescent-money',12,21,7,s=>p(s)<3,'What things cost',s=>`You notice that some classmates or neighbours have access to things your household cannot easily afford. This does not decide your future, but it shapes the choices in front of you.`,'city');
add('adolescent-privilege',12,22,6,s=>p(s)>=6,'A useful introduction',s=>`A family acquaintance shares advice about education and careers. The access comes from the network around you, not only your own efforts.`,'office');
// Adult life has mundane activities as well as socioeconomic changes.
add('first-adult-routine',18,27,10,()=>true,'An adult routine',s=>`Days fill with ${s.job?'work and personal obligations':'searching for a direction and keeping up with everyday responsibilities'}. Independence comes in small steps.`,'city');
add('money-check',18,87,10,()=>true,'Looking at the budget',s=>`You take stock of your income, regular expenses and what remains. ${s.debt>0?'Debt reduces how much flexibility you have.':s.cash>s.country.ppp?'A savings buffer gives you room to plan.':'A surprise expense could quickly change your plans.'}`,'home');
add('workday',18,69,9,s=>s.income>0,'An ordinary day at work',s=>`You spend much of the day working as a ${s.job.toLowerCase()}. Colleagues, working conditions and pay influence what the job feels like beyond its title.`,'office');
add('quiet-job-search',18,62,9,s=>!s.income,'Another application',s=>`You ask about work and try to understand what employers need. Qualifications, timing, transport and local demand all affect your options.`,'city',s=>O.adjust(s,{stress:1}));
add('family-table',15,90,9,s=>s.people.some(p=>p.alive&&['Parent','Mother','Father'].includes(p.role)),'At the family table',s=>`A conversation with ${fond(s)} turns to money, health and plans for the next few years. The discussion reminds you that decisions often affect more than one person.`);
add('friend-ordinary',18,84,8,s=>!!friend(s),'Keeping in touch',s=>`You hear from ${O.personLabel(friend(s))}. The friendship persists through different schedules and circumstances.`,'park',s=>O.bond(s,'Friend',2));
add('partner-conversation',18,85,8,s=>!!partner(s),'A conversation at home',s=>`${O.personLabel(partner(s))} shares an opinion about your shared routine. The two of you work around different needs and expectations.`,'home',s=>O.bond(s,'Partner',2));
add('children-growth',19,83,8,s=>!!child(s),'A child is growing',s=>`${O.personLabel(child(s))} is changing. You notice a new interest, a question, or a habit that was not there before.`,'home',s=>O.bond(s,'Child',2));
add('neighbourhood',18,88,7,()=>true,'The street outside',s=>`A shop opens, a family moves, or construction alters a familiar route. ${home(s)} does not stay entirely the same.`,'city');
add('body-reminder',20,95,7,()=>true,'Your body asks for attention',s=>`Some days you have more energy than others. Work, sleep, diet and access to care all shape your health across the years.`,'clinic');
add('time-off',18,84,6,s=>s.income>0,'Time away from work',s=>`You make room for rest where possible. ${p(s)<2?'Missing paid hours may come with a real financial cost.':'How easily you can step away depends on your working conditions and responsibilities.'}`,'park');
add('social-support',18,90,6,s=>s.relationships>55,'Someone checks in',s=>`A friend or relative reaches out and offers help with a small task. Mutual support matters, even when it cannot solve every problem.`,'home',s=>O.adjust(s,{happiness:1}));
add('local-food',10,90,8,()=>true,'A familiar meal',s=>`You eat food associated with your household and surroundings. Food is part of comfort, culture, resources and the rhythms of daily life.`);
add('cost-rise',18,86,7,()=>true,'Prices shift',s=>`The cost of everyday goods changes. ${s.income>0?'You review how far your wages go.':'Without steady income, small price changes can feel especially significant.'}`,'city');
add('public-services',18,88,5,s=>s.country.infra<70,'An errand takes longer',s=>`A visit to an office or clinic involves a delay or journey. Access to services depends not only on cost but also on distance and time.`,'clinic');
add('skills',18,76,6,()=>true,'A little more experience',s=>`You become slightly more capable at something you do regularly. Not every improvement brings a certificate or a promotion.`,'office',s=>O.adjust(s,{knowledge:1}));
add('job-pressure',20,69,5,s=>s.income>0&&s.stress>38,'Pressure accumulates',s=>`Work demands and responsibilities leave less space for rest. You manage the pressure while considering which obligations can change.`,'office',s=>O.adjust(s,{stress:1}));
add('job-stability',20,70,5,s=>s.income>0&&s.stress<55,'A dependable routine',s=>`You know your work well enough to anticipate the busiest hours and recurring problems. Routine offers some security.`,'office');
add('wealth-management',18,90,8,s=>p(s)>=6,'Conversations about assets',s=>`Property, investments or a family business are discussed. Having access to capital expands your options, but decisions still involve risk and responsibility.`,'mansion');
add('wealth-network',19,75,7,s=>p(s)>=6,'An invitation',s=>`You meet people through your family's or workplace's social circles. Some introductions may become useful later, while others remain casual.`,'mansion');
add('wealth-travel',13,82,6,s=>p(s)>=6,'A change of surroundings',s=>`You have a chance to travel or spend time away from home without the same financial strain faced by many households.`,'city',s=>O.adjust(s,{happiness:1}));
add('wealth-expect',15,70,6,s=>p(s)>=6,'An inherited expectation',s=>`Relatives discuss what success should look like. Security gives you freedom, but family reputation and obligations can still influence you.`,'mansion');
add('wealth-bailout',20,67,4,s=>p(s)>=5&&s.debt>0,'Family support remains possible',s=>`You know relatives may be able to help with a financial problem. This safety net changes the risk attached to your decisions.`,'mansion');
add('poor-work',15,72,7,s=>p(s)<2,'Every hour counts',s=>`Your household has limited financial room for error. The time spent earning, travelling and caring for others has consequences for rest and education.`,'factory');
add('poor-rent',18,85,7,s=>p(s)<2,'Making the rent',s=>`Housing costs take up a substantial share of resources. A sudden change in work or health could make the next payment harder.`,'home',s=>O.adjust(s,{stress:1}));
add('poor-community',8,87,6,s=>p(s)<2,'Neighbours help neighbours',s=>`Someone nearby lends a hand or shares practical advice. Community support can make an immediate difference, even if underlying inequalities remain.`,'city',s=>O.adjust(s,{relationships:1}));
add('poor-food',5,79,7,s=>!!s.flags.foodInsecure,'Making food last',s=>`Your household pays close attention to food costs and portions. The practical choices are shaped by supply, income and who needs feeding.`,'home');
add('crowding',8,90,7,s=>s.flags.crowdedHousing,'Little private space',s=>`Crowded housing makes it harder to rest, study or spend time alone. Relationships become intertwined with the space available.`);
add('social-mobility',19,74,5,s=>p(s)<4&&s.knowledge>70,'A different possibility',s=>`A qualification, a contact or a little experience suggests a path that once seemed out of reach. Whether it opens fully depends on more than ambition.`,'office');
add('debt-weight',19,80,6,s=>s.debt>s.country.ppp,'A balance that follows you',s=>`Debt repayments limit your options and raise the cost of new emergencies. You plan around obligations established in earlier years.`,'home',s=>O.adjust(s,{stress:1}));
add('mortgage',24,81,6,s=>s.property>0,'The place you own',s=>`Property creates both stability and expenses. Repairs, bills and the wider economy affect the value of this asset.`,'home');
add('health-condition',17,95,6,s=>s.flags.chronicIllness,'Managing a condition',s=>`You organise everyday life around a continuing health condition. Treatment, accessible environments and supportive people matter.`,'clinic');
add('long-commute',18,70,5,s=>s.urban&&s.income>0,'Getting to work',s=>`Travel takes part of the day. Your commute connects housing, transport and the jobs available near you.`,'city');
add('rural-transport',10,80,6,s=>!s.urban,'Distance matters',s=>`An appointment or errand requires a longer journey. How far services are from home affects everyday choices.`,'city');
add('parents-ageing',35,80,7,s=>s.people.some(x=>['Parent','Mother','Father'].includes(x.role)&&x.alive&&x.age>60),'Parents grow older',s=>`The adults who raised you are ageing. Your relationship changes as their energy, health and needs develop.`,'home');
add('midlife',37,68,8,()=>true,'Looking at the years behind',s=>`You compare the life you imagined when younger with the one that has taken shape. Both choice and circumstance appear in that difference.`,'park');
add('changing-work',35,73,6,s=>s.income>0,'Working life changes',s=>`Experienced colleagues leave or new workers arrive. Workplaces change as people and the economy move on.`,'office');
add('grandchildren',50,92,4,s=>s.people.some(x=>x.role==='Child'&&x.age>24),'Another generation',s=>`Children in your family are now adults with choices of their own. You cannot make those decisions for them.`,'home');
add('retirement-routine',59,105,9,s=>s.job==='Retired'||s.age>70,'A different rhythm',s=>`A slower routine provides time to remember, reconnect and manage changing needs. Financial and physical security affect how much freedom you have.`,'park');
add('old-friends',60,105,8,s=>!!friend(s),'A long connection',s=>`Your friendship with ${O.personLabel(friend(s))} carries memories from other chapters of life. You compare what has changed.`,'park',s=>O.bond(s,'Friend',2));
add('ageing-health',61,110,7,()=>true,'Energy changes with age',s=>`You notice changes in stamina or recovery. Health is influenced by age, past circumstances, daily habits and available care.`,'clinic');
add('later-memories',65,110,8,()=>true,'Memories return',s=>`An ordinary object or familiar place reminds you of another period of life. Some people from those years remain close and others do not.`,'home');
add('later-neighbours',66,110,7,()=>true,'A familiar face',s=>`You recognise people during your daily routine. Small interactions remain important sources of connection.`,'park');

// Country-linked everyday stories are possible personal experiences, not national stereotypes.
// They are authored scenes, not observations drawn from statistical datasets.
const local=(id,code,from,to,weight,title,body,scene='home',when=()=>true)=>add(id,from,to,weight,s=>s.country.code===code&&when(s),title,body,scene);
local('gh-marketday','GH',5,82,12,'At the local market',s=>`A market trader explains why prices for familiar foods change from one week to the next. Your household's budget shapes what you bring home.`,'city');
local('gh-trotro','GH',12,72,9,'A journey by trotro',s=>`You travel by shared minibus and listen to other passengers discuss fares, work and daily life. Public transport choices vary substantially between towns and regions.`,'city',s=>s.urban);
local('gh-football','GH',7,29,12,'A football match nearby',s=>`A neighbour invites you to kick a ball around. Someone notices a good pass, and you carry the compliment through the day.`,'park');
local('gh-mobile-money','GH',18,72,8,'Sending money home',s=>`A relative asks about helping with a household expense. Mobile money and other transfer systems can make a distance feel smaller, though available funds remain limited.`,'home',s=>s.people.some(p=>['Mother','Father','Sibling'].includes(O.parentRole(p))));
local('hk-mtr','HK',13,74,13,'The MTR commute',s=>`You take the train through Hong Kong, noticing how an ordinary journey connects work, housing costs and the time you have left for yourself.`,'city',s=>s.urban);
local('hk-cha-chaan-teng','HK',8,85,10,'A cha chaan teng meal',s=>`A familiar order arrives at a cha chaan teng. The price, noise and short conversation become part of the everyday landscape.`,'shop');
local('hk-dse','HK',15,20,13,'Public examinations approach',s=>`Classmates discuss subject choices, DSE assessments and possible routes into further study. Family money can affect access to tutoring, but not decide the outcome.`,'school',s=>s.school);
local('bd-monsoon','BD',6,78,10,'Monsoon weather',s=>`Several days of heavy rain disrupt a journey or errand. Your household adapts; the effect differs greatly by region, infrastructure and housing.`,'home');
local('bd-rickshaw','BD',12,70,9,'Travelling across town',s=>`You compare the cost and convenience of a rickshaw or shared transport. Even a short journey has to fit the day's budget.`,'city',s=>s.urban);
local('ng-music','NG',12,45,9,'Music through the neighbourhood',s=>`A tune from a nearby gathering becomes a favourite. The music you encounter depends on friends, region and community, not your passport alone.`,'city');
local('ng-school-commute','NG',8,19,12,'The journey to school',s=>`Travel, school supplies and family routines influence how reliably you can attend lessons. A teacher asks about a recent absence.`,'school',s=>s.school);
local('in-school-path','IN',14,24,12,'Different routes after school',s=>`Friends discuss entrance tests, vocational institutes and paid work. You hear how different families weigh cost, qualifications and location.`,'school',s=>s.school);
local('in-travel','IN',12,80,9,'A long journey',s=>`A train or bus trip makes the distances between communities feel tangible. Access to transport is part of access to opportunities.`,'station');
local('et-rain','ET',7,76,11,'Talking about the rains',s=>`A neighbour discusses this season's weather and household plans. For some farming families rainfall influences work, food and savings.`,'home',s=>!s.urban);
local('et-cooperative','ET',18,71,8,'A community meeting',s=>`People discuss organising resources and sharing practical advice. Which groups and cooperatives exist depends on your district.`,'city');
local('gb-gcse','GB',14,17,13,'Exam preparation',s=>`Teachers discuss qualifications and the range of routes after compulsory school. You consider whether your strengths fit sixth form, college or training.`,'school',s=>s.school);
local('gb-nhs','GB',9,91,10,'An NHS appointment',s=>`A medical appointment leads to a conversation about symptoms, waiting times and follow-up care. Your options also depend on the treatment needed.`,'clinic');

O.STORIES=stories;
O.pickStories=(s,n)=>{
 const results=[],used=s.storyUsed||(s.storyUsed={});
 for(let i=0;i<n;i++){
  let pool=stories.filter(e=>e.min<=s.age&&e.max>=s.age&&e.when(s)&&!results.includes(e)&&(used[e.id]===undefined||s.age-used[e.id]>=3));
  if(!pool.length)pool=stories.filter(e=>e.min<=s.age&&e.max>=s.age&&e.when(s)&&!results.includes(e));
  if(!pool.length)break;
  const item=O.weighted(s,pool,e=>e.weight*(s.scene===e.scene?1.1:1));
  used[item.id]=s.age;
  results.push({title:item.title,description:item.body(s),scene:item.scene,kind:'story',effect:item.id});
 }
 return results;
};
O.fireStory=(s,item)=>{
 const def=stories.find(x=>x.id===item.effect);
 if(def?.effect)def.effect(s);
 O.journal(s,item.title,item.description,'life');
 s.scene=item.scene||s.scene;
};
})(window.OL);

