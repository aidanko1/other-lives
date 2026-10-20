/* Original conditional life moments. Every selected moment has state changes. */
(function(O){'use strict';
const {hash,short,alive,clamp}=O.dynamicsHelpers,defs=[];
const rich=s=>s.age<18?s.strata>=5&&s.familyCash>s.country.ppp*.1:s.cash>s.country.ppp*.8,poor=s=>(s.age<18?s.strata<=2:s.cash<s.country.ppp*.035)||s.flags.foodInsecure;
const inSchool=s=>s.school&&!s.study,working=s=>!!s.job&&s.job!=='Retired',student=s=>s.study?.status==='enrolled';
const group=(subject,min,max,category,rows)=>rows.forEach(([id,title,body,fx,when,extra={}])=>defs.push({id,subject,min,max,category,title,body,fx,when:when||(()=>true),cooldown:12,maxUses:2,...extra}));
group('parent',0,2,'Early care',[
 ['lap-sleep','Asleep against a familiar shoulder','{person} learns which rhythm settles you. You sleep against their shoulder while the room carries on around you.',{health:1,happiness:2,relationships:1}],
 ['cloth-book','A book you can chew','You turn the thick pages in both directions. {person} gives up on the story and names the pictures you point at.',{knowledge:1,relationships:1}],
 ['first-steps-care','A few steps, then a landing','You cross the gap between {person} and a chair, then sit down with a surprised bump. Their applause makes you try again.',{health:1,confidence:1,relationships:1}],
 ['small-fever','A night of temperature checks','You run a fever. {person} stays nearby, offering fluids and checking on you until morning.',{health:-2,relationships:1,stress:1},s=>s.health<75],
 ['washing-song','A song during the washing','You splash at the water while {person} repeats a silly song. Soon you are waiting for the same line every time.',{happiness:2,relationships:1}],
 ['familiar-face','A face in the doorway','You stop crying when {person} appears in the doorway. Their face has become part of what safety feels like.',{happiness:1,relationships:2}],
 ['shared-spoon','A spoon of your own','You insist on holding the spoon. More food reaches your clothes than your mouth, but a little more reaches it each day.',{knowledge:1,confidence:1}],
 ['first-naming','Names for the things outside','{person} names the bird, the passing vehicle and your shoes. You repeat one word for several different things.',{knowledge:1,relationships:1}],
 ['caregiver-strain','A tired household','Work and interrupted sleep leave {person} exhausted. You are fed and held, but this week the usual games are shorter.',{happiness:-1,relationships:-1},s=>s.familyIncome<s.country.ppp*.45],
 ['small-checkup','A visit to the child clinic','{person} brings you to a routine child-health appointment. You object to the unfamiliar room, then settle on the way home.',{health:2,stress:1},s=>s.country.infra>=60],
 ['toddler-stacking','A tower built together','You stack objects, knock them down and hand them back to {person}. Taking turns becomes a game of its own.',{knowledge:1,relationships:2}],
 ['safe-corner','A corner made safe','{person} moves breakable things out of reach and gives you a small space to explore. You inspect every part of it.',{health:1,knowledge:1}]
]);
group('self',0,5,'Discovery',[
 ['window-shadows','Following a moving shadow','You watch a shadow move across the wall. When it disappears behind an object, you lean over to find it.',{knowledge:1,happiness:1}],
 ['ant-trail','A trail with somewhere to go','A line of ants holds your attention long after the grown-ups are ready to leave. You return to look for them the next day.',{knowledge:1,happiness:1},s=>!s.urban],
 ['lost-mitten','One mitten missing','The household searches for a missing mitten. You eventually produce it from a hiding place nobody thought to check.',{confidence:1,happiness:1},s=>['GB','PL','DE','CA','CN','JP','KR'].includes(s.country.code)],
 ['drawing-wall','A drawing where it did not belong','Your drawing spreads beyond the paper. A grown-up helps you clean the mark, then finds you a bigger sheet.',{knowledge:1,relationships:1},s=>s.age>=3],
 ['rain-window','Rain against the window','You race two drops down the window with a finger. A little later you find a way to make the sound of the rain yourself.',{happiness:2,knowledge:1},s=>s.age>=2],
 ['pretend-market','A shop made from small things','You arrange a pretend shop and insist on counting out the change. Everyone has to buy something before leaving.',{knowledge:1,confidence:1},s=>s.age>=3],
 ['waiting-turn','Waiting is the hard part','Another child has the toy you want. Waiting for a turn is difficult; when the turn finally comes, you offer it back sooner than expected.',{relationships:2,confidence:1},s=>s.age>=3],
 ['stubborn-button','The last button','You insist on doing the last button yourself. It takes a long time, and afterwards you refuse to take the shirt off.',{confidence:2,happiness:1},s=>s.age>=3],
 ['new-taste','An unfamiliar taste','A new food is put in front of you. You make a face, try a tiny amount, then ask what it is called.',{health:1,knowledge:1},s=>!s.flags.foodInsecure],
 ['quiet-child','Watching before joining','You stay near the edge of a game until you understand the rules. Then you join without needing to be led in.',{confidence:1,relationships:1},s=>s.age>=4],
 ['hungry-afternoon','A smaller afternoon meal','The adults make the portions stretch. You become tired and irritable earlier than usual.',{health:-2,happiness:-2},s=>!!s.flags.foodInsecure],
 ['invented-melody','A tune with no proper words','You make up a tune and sing it often enough that somebody else starts singing it too.',{happiness:2,relationships:1},s=>s.age>=3]
]);
group('sibling',3,17,'Siblings',[
 ['sibling-secret','A hiding place shared with {person}','You show {person} a place you have been keeping to yourself. They promise not to tell, then bring something to add to it.',{relationships:2,happiness:1},(s,p)=>Math.abs(s.age-p.age)<6],
 ['sibling-argument','An argument over whose turn it is','You and {person} argue until neither of you enjoys the game. Later, one of you quietly sets it up again.',{relationships:-1,happiness:-1},(s,p)=>Math.abs(s.age-p.age)<5],
 ['sibling-reading','Reading to {person}','{person} wants the same page again. Explaining the words makes you notice things you had skipped over.',{knowledge:1,relationships:2},(s,p)=>s.age>=7&&p.age>=2&&p.age<s.age],
 ['sibling-defends','{person} stands beside you','When someone makes fun of you, {person} stays beside you until the moment passes. The two of you talk on the way home.',{relationships:3,confidence:1},(s,p)=>p.age>=s.age&&p.close>=65],
 ['sibling-comparison','Being compared with {person}','A grown-up praises {person} and asks why you cannot do the same. You become quieter for the rest of the evening.',{happiness:-2,relationships:-1},(s,p)=>p.age>s.age&&s.knowledge<45],
 ['sibling-handdown','Something that used to be {person}’s','You inherit something {person} has outgrown. It is worn, but they show you how they used it and what needs fixing.',{knowledge:1,relationships:1},(s,p)=>p.age>s.age&&s.strata<=2],
 ['sibling-presents','A present chosen together','You and {person} put your small funds together for a family present. Choosing it takes longer than buying it.',{relationships:2,happiness:1},s=>s.age>=9],
 ['sibling-exam','Keeping quiet for {person}','{person} is preparing for an exam. You move your game to another room, then bring something to eat.',{relationships:2},(s,p)=>p.age>=14&&p.age<=19&&s.age>=6],
 ['sibling-sport','A game that gets too serious','You and {person} turn an ordinary game into a competition. The argument about the score lasts longer than the match.',{health:1,relationships:-1},(s,p)=>s.age>=6&&Math.abs(s.age-p.age)<=4],
 ['sibling-proud','Watching {person} get it right','You watch {person} finish something they have struggled with. Your encouragement matters more than either of you says.',{relationships:2,happiness:1},(s,p)=>p.close>=60],
 ['sibling-missing','A quieter home without {person}','{person} spends more time away from home. You miss the interruptions you used to complain about.',{happiness:-1,relationships:1},(s,p)=>p.age>=18||p.movedOut],
 ['sibling-repair','An apology passed quietly','After days of ignoring each other, you put something {person} needs within reach. They make room beside them.',{relationships:3,stress:-1},(s,p)=>p.close<55]
]);
group('self',6,17,'School',[
 ['school-aha','The explanation finally clicks','Something at {school} makes no sense until you try explaining it aloud. Halfway through, you hear where you went wrong.',{knowledge:2,confidence:1},s=>inSchool(s)&&s.knowledge>=35],
 ['school-behind','The lesson moves on without you','At {school}, the class moves to a new topic before the previous one makes sense. You start avoiding questions.',{knowledge:-1,happiness:-2,confidence:-1},s=>inSchool(s)&&s.knowledge<35],
 ['school-help','Asking before the gap grows','You stay after a lesson to ask for help. The teacher works through one example slowly, and you can do the next one.',{knowledge:2,confidence:1},s=>inSchool(s)&&s.knowledge<55&&s.routines.includes('study')],
 ['school-project','The part nobody expected you to finish','You take responsibility for a difficult part of a group project. When it works, the others ask you to explain how.',{knowledge:1,relationships:1,confidence:2},s=>inSchool(s)&&s.knowledge>=65],
 ['school-forgotten','The forgotten assignment','A rushed morning ends with your assignment left at home. You spend the lesson worrying about it instead of listening.',{knowledge:-1,happiness:-1,stress:1},s=>inSchool(s)&&s.stress>=45],
 ['school-lunch','Making lunch last','You eat slowly so that nobody notices how little there is. By the afternoon, concentrating takes effort.',{health:-2,knowledge:-1,happiness:-2},s=>inSchool(s)&&s.flags.foodInsecure],
 ['school-books','A used book with useful margins','A second-hand schoolbook arrives with someone else’s notes in the margins. A few of them help more than the printed explanation.',{knowledge:2,happiness:1},s=>inSchool(s)&&s.strata<=2],
 ['school-tutor','Extra help after class','Your family can arrange extra tuition. More explanations help, though the longer day leaves you less time to yourself.',{knowledge:2,happiness:-1},s=>inSchool(s)&&s.strata>=4],
 ['school-bus','The journey takes the morning','The journey to {school} takes longer than usual. You arrive tired and miss the beginning of the lesson.',{health:-1,knowledge:-1,stress:1},s=>inSchool(s)&&!s.urban&&s.country.infra<65],
 ['school-stage','Getting through the school performance','You forget a line, recover and finish. Afterwards you remember the recovery more than the mistake.',{confidence:2,happiness:1},s=>inSchool(s)&&s.relationships>=50],
 ['school-excluded','A group formed without you','Groups are chosen before you know anyone is choosing. You work alone and say you prefer it that way.',{relationships:-2,happiness:-2},s=>inSchool(s)&&s.relationships<35],
 ['school-included','A place made beside them','Someone moves a bag to make room for you. By the end of the lesson, you have agreed to work together again.',{relationships:2,happiness:1},s=>inSchool(s)&&s.relationships>=40],
 ['school-library','The book you keep renewing','You keep renewing a book connected with {hobby}. Eventually you begin trying some of its ideas yourself.',{knowledge:2,happiness:1},s=>inSchool(s)&&s.interests.length>0,{practice:.2}],
 ['school-sleep','Too little sleep before a lesson','You struggle to stay awake, then discover that the material you missed is needed for the next topic.',{health:-1,knowledge:-1,happiness:-1},s=>inSchool(s)&&s.health<45],
 ['school-question','A question worth following','A question from class stays with you. You look it up at home and return with another question.',{knowledge:2,confidence:1},s=>inSchool(s)&&s.knowledge>=55],
 ['school-no-fees','Materials the household cannot replace','A needed item wears out. The family has other expenses first, so you improvise and take longer over each task.',{knowledge:-1,stress:1},s=>inSchool(s)&&s.strata<=1],
 ['school-neighbour','Helping a younger pupil','A younger pupil asks how to solve something you once found difficult. Teaching it shows you how far you have come.',{knowledge:1,relationships:2},s=>inSchool(s)&&s.age>=11&&s.knowledge>=60],
 ['school-perfect-pressure','Being expected to get it right again','After a strong result, everyone assumes the next one will be just as good. Pride starts to feel like pressure.',{confidence:1,happiness:-1,stress:2},s=>inSchool(s)&&s.knowledge>=75],
 ['school-rebound','A result that improves','Your result is better than the last one. It is not the highest in class, but you know which effort made the difference.',{knowledge:1,happiness:2,confidence:1},s=>inSchool(s)&&s.routines.includes('study')],
 ['school-playtime','The afternoon you needed','After school you spend an afternoon playing rather than preparing. You come back to your work less restless.',{health:1,happiness:2},s=>inSchool(s)&&s.happiness<45&&s.stress<70]
]);
group('friend',8,85,'Friendship',[
 ['friend-laugh','A joke that keeps returning','You and {person} cannot stop laughing at something that would make little sense to anyone else.',{happiness:2,relationships:1},(s,p)=>p.close>=60],
 ['friend-secret','Something {person} trusts you with','{person} tells you something difficult. You listen and keep the confidence afterwards.',{relationships:2,confidence:1},(s,p)=>p.close>=65&&s.relationships>=45],
 ['friend-distance','Another unanswered message','You leave a message from {person} unanswered until replying feels awkward. The gap becomes harder to explain.',{relationships:-2,happiness:-1},s=>!s.routines.includes('connection')&&s.stress>45],
 ['friend-cheap-plan','An invitation you can afford','You tell {person} that money is tight. They suggest a free walk instead, and the conversation lasts just as long.',{relationships:2,happiness:2,stress:-1},(s,p)=>s.age>=18&&poor(s)&&p.close>=55],
 ['friend-expensive-plan','The plan costs too much','The group chooses something beyond your budget. You decline, then spend the evening wondering what you missed.',{happiness:-2,relationships:-1},s=>s.age>=13&&poor(s)],
 ['friend-shared-hobby','A technique passed between friends','You and {person} spend time on {hobby}. Their way of doing one small thing changes how you practise.',{knowledge:1,relationships:2},s=>s.interests.length>0,{practice:.25}],
 ['friend-disagreement','A disagreement you cannot laugh away','A disagreement with {person} becomes personal. You both need time before speaking easily again.',{relationships:-2,happiness:-1,stress:1},(s,p)=>p.close<60||s.stress>65],
 ['friend-apology','Making the first apology','You contact {person} without waiting to be proved right. The first conversation is awkward; the second is easier.',{relationships:3,happiness:1},(s,p)=>p.close<55&&s.relationships>=40],
 ['friend-achievement','Good news from {person}','{person} calls with good news. You are pleased for them, even while comparing it with your own plans.',{happiness:1,relationships:1},s=>s.age>=18],
 ['friend-care','Company on a difficult day','{person} stays with you through a difficult afternoon. You do not solve everything, but you stop carrying it entirely alone.',{happiness:3,relationships:2,stress:-2},(s,p)=>s.happiness<35&&p.close>=65],
 ['friend-childhood','Remembering who you used to be','You and {person} remember an earlier version of yourselves. Each of you supplies details the other had forgotten.',{happiness:2,relationships:2},(s,p)=>s.age>=30&&p.knownSince!==undefined&&s.age-p.knownSince>=10],
 ['friend-move-away','Plans become harder to arrange','{person} moves farther away. Calls become the way you keep the friendship alive.',{relationships:-1,happiness:-1},(s,p)=>s.age>=18&&p.residence!=='Your household']
]);
group('parent',6,55,'Parents',[
 ['parent-recipe','Learning {person}’s way of cooking','{person} explains a familiar meal while you help. Their measurements are mostly gestures and judgements.',{knowledge:1,relationships:2},(s,p)=>p.close>=55],
 ['parent-school-effort','Someone notices the effort','{person} asks how much work a school task took, rather than only asking about the mark.',{happiness:2,relationships:2},(s,p)=>s.age<=18&&inSchool(s)&&p.close>=65],
 ['parent-silence','A conversation avoided','You and {person} keep the conversation practical. There is something neither of you is ready to bring up.',{relationships:-1,happiness:-1},(s,p)=>p.close<45],
 ['parent-care-trip','An appointment with {person}','You accompany {person} to an appointment. Waiting together gives the two of you time for a conversation you rarely have.',{relationships:2,stress:1},(s,p)=>s.age>=18&&p.age>=60,{costRate:.001}],
 ['parent-memory','Hearing a story differently','{person} tells a familiar story. This time you ask what it felt like for them, and hear a part they usually leave out.',{knowledge:1,relationships:2},s=>s.age>=18],
 ['parent-boundary','Saying no without ending the conversation','You explain a limit to {person}. It is uncomfortable, but you keep talking long enough for the reason to be understood.',{confidence:2,relationships:1,stress:1},(s,p)=>s.age>=18&&p.close>=50&&s.relationships>=50],
 ['parent-pressure','Their expectations follow you home','{person} asks again about a path you do not want. You become defensive before either of you has said much.',{happiness:-2,relationships:-1,stress:2},s=>s.age>=16&&s.age<30&&s.stress>50],
 ['parent-retired','A new routine after retirement','{person} has more time and less work structure. A small shared task gives the visit a purpose.',{relationships:2,happiness:1},(s,p)=>p.retired],
 ['parent-bill','Helping with a parent’s health costs','A modest health-related expense for {person} comes due. You contribute what is needed and help organise the next appointment.',{relationships:2,stress:1},(s,p)=>s.age>=22&&p.health<60,{costRate:.004}],
 ['parent-thanks','A thank-you said before it becomes too late','You tell {person} about one thing they did that stayed with you. The conversation is shorter than you imagined, and more affecting.',{relationships:3,happiness:2},(s,p)=>s.age>=25&&p.age>=60]
]);
group('sibling',18,90,'Adult siblings',[
 ['adult-sibling-call','A call from {person}','You and {person} compare the practical details of your weeks. Familiarity makes it easier to admit what is not going well.',{relationships:2,stress:-1},(s,p)=>p.age>=18&&p.close>=55],
 ['adult-sibling-money','Money makes the conversation awkward','A difference in what you and {person} can afford becomes difficult to ignore. You try to explain without making it a competition.',{relationships:-1,happiness:-1},(s,p)=>p.age>=18&&s.debt>s.country.ppp*.5],
 ['adult-sibling-care','Sharing care with {person}','You and {person} divide errands and visits for an older relative. The work is still tiring, but no longer falls on one person alone.',{relationships:2,stress:-2},(s,p)=>p.age>=18&&s.people.some(x=>x.alive&&['Mother','Father'].includes(x.role)&&x.age>=65)],
 ['adult-sibling-child','Seeing {person} through a child’s eyes','A younger child asks about {person}. Your explanation brings back the games and arguments you shared when you were small.',{happiness:2,relationships:1},s=>alive(s,'Child').length>0],
 ['adult-sibling-repair','Making room for {person} again','You arrange a short meeting with {person} after a strained stretch. Neither of you tries to settle every old argument at once.',{relationships:3,stress:-1},(s,p)=>p.age>=18&&p.close<50],
 ['adult-sibling-help','Practical help from {person}','{person} helps with a task you have not had the energy to manage. Their help leaves you with one less thing to worry about.',{happiness:2,relationships:2,stress:-2},(s,p)=>p.age>=18&&p.close>=70&&s.health<50],
 ['adult-sibling-gather','Finding a day everyone can manage','You and {person} finally agree on a day to gather. Coordinating work and households takes more effort than it used to.',{relationships:2,happiness:1},(s,p)=>p.age>=18],
 ['adult-sibling-tradition','A family custom carried forward','You and {person} keep a small family custom going in your own way. The details have changed, but the connection remains.',{relationships:2,happiness:2},(s,p)=>p.age>=18&&s.age>=30]
]);
group('child',18,95,'Parenting',[
 ['child-first-story','A story invented by {person}','{person}, {personAge}, tells you a story that wanders in several directions. You listen to the ending they choose.',{happiness:2,relationships:2},(s,p)=>p.age>=3&&p.age<=7],
 ['child-night','A broken night with {person}','{person} wakes repeatedly. You get through the next day on little sleep.',{health:-2,happiness:-1,relationships:1},(s,p)=>p.age<=3],
 ['child-question','A question you cannot answer quickly','{person} asks a question about how people live. You promise to find out rather than inventing an answer.',{knowledge:1,relationships:2},(s,p)=>p.age>=6&&p.age<=12],
 ['child-homework','Homework takes over the evening','{person} gets frustrated with schoolwork. Your own tiredness makes patience harder to find.',{happiness:-1,relationships:-1,stress:2},(s,p)=>p.age>=7&&p.age<=15&&s.stress>60],
 ['child-homework-help','Finding another way to explain it','You help {person} with a difficult topic. A different example works better than repeating the first explanation.',{knowledge:1,relationships:2},(s,p)=>p.age>=7&&p.age<=15&&s.knowledge>=55],
 ['child-audience','Being there when {person} looks for you','At a small school event, {person} searches the audience. You wave, and see their shoulders relax.',{relationships:3,happiness:2},(s,p)=>p.age>=5&&p.age<=16],
 ['child-privacy','A closed door you choose to respect','{person} wants more privacy. You agree on a way to check in without treating every closed door as a problem.',{relationships:2,confidence:1},(s,p)=>p.age>=12&&p.age<=18&&s.relationships>=45],
 ['child-savings','Something bought with their own savings','{person} gives you something small bought with saved money. You notice how carefully they watch your response.',{relationships:3,happiness:2},(s,p)=>p.age>=9&&p.age<=17],
 ['child-fees','The next school expense','A school-related expense for {person} arrives alongside the other bills. You make room for it in the budget.',{relationships:1,stress:1},(s,p)=>p.age>=6&&p.age<=17,{costRate:.004}],
 ['child-leaving','Learning to be useful differently','{person} manages a problem without asking you first. You feel proud, and unexpectedly left out.',{happiness:1,relationships:1},(s,p)=>p.age>=18],
 ['child-adult-visit','{person} brings an ordinary afternoon','{person} visits without an occasion. The conversation moves between their plans and small things at home.',{relationships:2,happiness:2},(s,p)=>p.age>=18&&p.close>=60],
 ['child-worried','{person} notices your strain','{person} asks why you seem worried. You explain enough to be honest without asking them to carry the whole problem.',{relationships:2,stress:-1},(s,p)=>p.age>=10&&p.age<=17&&s.debt>s.country.ppp*.4]
]);
group('partner',18,95,'Partnership',[
 ['partner-ordinary','An ordinary evening that goes well','You and {person} finish the chores, then stay together without needing a plan. The ease between you feels worth protecting.',{happiness:2,relationships:2},(s,p)=>p.close>=65],
 ['partner-small-repair','A small repair to a recurring argument','You and {person} change one practical arrangement rather than having the whole argument again.',{relationships:2,stress:-2},(s,p)=>p.close>=50&&s.relationships>=50],
 ['partner-overwork','Work arrives home before you do','Even at home, you keep thinking about work. {person} notices how little of your attention is left.',{relationships:-2,happiness:-1},s=>working(s)&&s.stress>65],
 ['partner-budget','A budget made together','You and {person} write down what is actually owed and what can wait. The numbers are still difficult, but less mysterious.',{relationships:2,stress:-3},(s,p)=>s.debt>0&&p.close>=50],
 ['partner-resentment','The same bill, the same argument','Another bill reopens an argument about money. Neither of you feels heard.',{relationships:-3,happiness:-2,stress:2},(s,p)=>s.debt>s.country.ppp*.8&&p.close<55],
 ['partner-recovery','Care received without keeping score','While you are unwell, {person} takes over some ordinary tasks. You can rest instead of explaining why you need to.',{health:2,relationships:2,happiness:1},(s,p)=>s.health<45&&p.close>=65],
 ['partner-hobby','Learning something {person} enjoys','You try something {person} enjoys without pretending to be good at it. Being taught changes the rhythm between you.',{happiness:2,relationships:2},(s,p)=>p.close>=60],
 ['partner-separate-time','Time apart that helps you reconnect','You and {person} make room for separate interests. There is more to tell each other afterwards.',{happiness:2,relationships:1},(s,p)=>p.close>=65&&s.interests.length>0],
 ['partner-missed-date','A plan you forget to protect','You let another obligation replace time arranged with {person}. It is not the first time, and they say so.',{relationships:-3,happiness:-1},(s,p)=>s.stress>70||p.close<45],
 ['partner-looking-back','Remembering the early days','You and {person} remember how cautiously you first got to know each other. Some details still make you laugh.',{relationships:2,happiness:2},(s,p)=>(p.relationshipYears||0)>=5],
 ['partner-caring-child','Taking turns so someone can sleep','You and {person} divide the night’s demands. Neither of you gets enough sleep, but sharing the work matters.',{health:-1,relationships:2},s=>alive(s,'Child').some(p=>p.age<=2)],
 ['partner-later-life','A slower routine together','You and {person} adjust the day around energy and appointments. Small acts of care have become part of the relationship.',{relationships:2,happiness:1},(s,p)=>s.age>=65&&p.close>=55]
]);
group('pet',6,95,'Companions',[
 ['pet-settling','{person} chooses a place to sleep','{person} finally settles in one place at home. You learn to leave that corner undisturbed.',{happiness:2,relationships:1},(s,p)=>p.age<=2],
 ['pet-training','The first command that sticks','After patient practice, {person} responds to a familiar cue. You realise how much consistency matters.',{happiness:2,confidence:1},(s,p)=>p.kind==='dog'&&p.age<=5,{petBond:4}],
 ['pet-routine','Someone waiting for you','{person} is waiting when you come home. The ordinary greeting changes the feel of a difficult day.',{happiness:3,stress:-2},s=>s.happiness<50],
 ['pet-walk','A walk because {person} needs one','You would have stayed inside, but {person} needs a walk. You return feeling a little more awake.',{health:2,happiness:1},(s,p)=>p.kind==='dog'],
 ['pet-window','A warm place beside {person}','You sit near {person} in a warm patch of light. For a little while you stop thinking about what needs doing.',{happiness:2,stress:-2},(s,p)=>p.kind==='cat'],
 ['pet-chewed','Something you should have put away','{person} damages something left within reach. Replacing it costs money; changing the routine takes patience.',{happiness:-1,stress:1},(s,p)=>p.age<=3&&s.age>=18,{costRate:.002}],
 ['pet-bill','A routine vet visit for {person}','{person} needs a routine veterinary appointment. You arrange transport and pay the small bill.',{happiness:1,stress:1},s=>s.age>=18,{costRate:.004,petHealth:4}],
 ['pet-old','Keeping pace with {person}','{person} is getting older and moves more slowly. You shorten the outing and stay beside them.',{relationships:2,happiness:1},(s,p)=>p.age>=9,{petBond:3}],
 ['pet-child','A gentler way of approaching {person}','A child in the household learns to let {person} approach first. You see the animal become more comfortable.',{relationships:2,happiness:2},s=>alive(s,'Child').some(p=>p.age>=3&&p.age<=9),{petBond:3}],
 ['pet-tight-budget','Making room for {person}’s food','Money is tight, but {person} still needs care. You cut a small personal expense to keep the familiar routine.',{happiness:-1,relationships:1,stress:1},s=>s.age>=18&&poor(s)],
 ['pet-ill-sign','You notice a change in {person}','{person} seems less active than usual. You watch closely and make time to seek advice.',{happiness:-1,stress:2},(s,p)=>p.age>=7,{petHealth:-2}],
 ['pet-visit','An unexpected welcome','{person} takes an unusual interest in a visitor. The resulting conversation is warmer than you expected.',{happiness:2,relationships:1},s=>s.relationships>=45]
]);
group('self',18,70,'Work',[
 ['work-first-pay','The first pay you can plan around','Your earnings from {job} arrive. You begin dividing them between what is already owed and what might become possible.',{confidence:2,happiness:1},s=>working(s)&&(s.workYears||0)<=1],
 ['work-mistake','A mistake you have to put right','At work, an avoidable mistake takes time to correct. You understand the process better by the end, but the day is tiring.',{knowledge:1,happiness:-1,stress:2},s=>working(s)&&O.skillLevel(s,s.job,'work')<5],
 ['work-trusted','A task left in your hands','Someone at work trusts you with a task they once checked closely. You finish it without needing the same guidance.',{confidence:2,knowledge:1},s=>working(s)&&O.skillLevel(s,s.job,'work')>=5],
 ['work-mentor','Explaining the job to someone new','You show a new colleague how to avoid a mistake you once made. Explaining it sharpens your own understanding.',{knowledge:1,relationships:2},s=>working(s)&&O.skillLevel(s,s.job,'work')>=9],
 ['work-overload','Too much to finish well','Work leaves more tasks than time. You finish late and carry the unfinished parts home in your head.',{health:-2,happiness:-2,stress:3},s=>working(s)&&s.stress>=60],
 ['work-boundary','Protecting the end of the day','You arrange a clearer end to the working day. The work remains, but recovery stops being an afterthought.',{health:1,happiness:1,stress:-2},s=>working(s)&&s.routines.includes('outdoors')],
 ['work-parttime','Working between classes','A shift fits between study commitments, but leaves little room for rest. The pay helps; the schedule still takes a toll.',{health:-1,knowledge:-1,stress:2},s=>working(s)&&student(s)&&s.employment.mode==='part-time'],
 ['work-degree-use','Something from your course proves useful','A task at work calls for something you studied. Using it makes the qualification feel less abstract.',{knowledge:1,confidence:2},s=>working(s)&&!!s.flags.completedDegree],
 ['work-hobby-use','An interest becomes useful at work','A skill from {hobby} helps you solve an awkward task at work. A colleague asks where you learnt it.',{confidence:2,knowledge:1},s=>working(s)&&s.interests.some(n=>O.skillLevel(s,n)>=5),{practice:.15}],
 ['work-small-bonus','A small payment for extra responsibility','You receive a small additional payment for taking responsibility for a difficult task. You decide where it is most needed.',{confidence:1,happiness:1},s=>working(s)&&O.skillLevel(s,s.job,'work')>=7,{earnRate:.004}],
 ['work-health-limit','A shift your health makes harder','You need more time to get through the work. The strain makes it harder to recover before the next shift.',{health:-2,happiness:-1},s=>working(s)&&s.health<40],
 ['work-pay-delay','Pay arrives later than expected','A delay in pay forces you to rearrange bills. The work has been done, but the waiting still costs you peace of mind.',{happiness:-1,stress:3},s=>working(s)&&s.cash<s.country.ppp*.05],
 ['work-conflict','A strained conversation at work','A disagreement about how work is shared becomes personal. The atmosphere stays tense for several days.',{relationships:-2,happiness:-1,stress:2},s=>working(s)&&s.relationships<40],
 ['work-colleague-kind','A colleague makes room for a hard week','A colleague helps you through an overloaded part of the week. You make a point of returning the favour later.',{relationships:2,stress:-2},s=>working(s)&&s.relationships>=60],
 ['work-commute','The commute uses up your recovery time','The journey between home and {job} takes more energy than you expected. You begin the next day already tired.',{health:-1,happiness:-1,stress:2},s=>working(s)&&s.urban&&s.employment.mode==='full-time']
]);
group('self',18,60,'University',[
 ['uni-first-seminar','Finding your voice in {course}','You speak during a class on {course}. Your answer is incomplete, but the discussion helps you understand what was missing.',{knowledge:2,confidence:1},s=>student(s)&&s.knowledge>=40],
 ['uni-lost','The reading is getting away from you','The reading for {course} is accumulating faster than you can understand it. Avoiding the next session makes the gap feel larger.',{knowledge:-1,happiness:-2,stress:2},s=>student(s)&&s.knowledge<40],
 ['uni-study-group','A study group that works','You find people who explain different parts of {course} clearly. Working together makes the difficult material less isolating.',{knowledge:2,relationships:2},s=>student(s)&&s.relationships>=50],
 ['uni-interest','The topic you keep reading about','A topic in {course} connects with {hobby}. You continue reading after the assignment is finished.',{knowledge:2,happiness:1},s=>student(s)&&s.interests.length>0,{practice:.2}],
 ['uni-finance','Tuition is not the only expense','Materials, travel and ordinary living costs make the {course} year more expensive than the tuition quote alone.',{happiness:-1,stress:2},s=>student(s)&&poor(s)],
 ['uni-project','A project worth the effort','Your work for {course} receives thoughtful feedback. You can see which parts have improved through practice.',{knowledge:2,confidence:2},s=>student(s)&&s.knowledge>=65],
 ['uni-sleep','An assignment finished at the expense of sleep','You finish work for {course} late at night. The next day’s class is harder to follow.',{health:-2,knowledge:-1,stress:1},s=>student(s)&&s.stress>55],
 ['uni-office-hours','Using the help that is offered','You bring a specific question about {course} to a tutor. The conversation gives you a way to tackle the next piece yourself.',{knowledge:2,confidence:1},s=>student(s)&&s.routines.includes('study')],
 ['uni-portfolio','Something you can show beyond a grade','You keep a piece of work from {course} for a portfolio. It gives you a concrete way to explain what you can do.',{confidence:2,knowledge:1},s=>student(s)&&s.study.progress>=1],
 ['uni-patience','Learning takes longer than the timetable','Progress in {course} is slower during a difficult spell. You choose to protect the essentials instead of pretending nothing has changed.',{knowledge:1,stress:-1},s=>student(s)&&(s.health<45||s.happiness<35)]
]);
group('self',18,95,'Money & daily life',[
 ['budget-cushion','A buffer does its quiet work','A modest expense arrives, and you can pay it without rearranging the rest of the month. You notice what the savings buffer buys you.',{happiness:1,stress:-2},s=>rich(s),{costRate:.002}],
 ['budget-empty','Checking the balance again','You check the balance even though you know what is there. With little room left, a small change can undo a careful plan.',{happiness:-2,stress:2},s=>poor(s)],
 ['budget-debt-reminder','A repayment shapes the weekend','A repayment leaves less room for leisure. You choose a cheaper plan rather than adding another expense to the balance.',{happiness:-1,stress:1},s=>s.debt>0],
 ['budget-repair','Repairing rather than replacing','You repair a worn household item rather than replace it. The result is imperfect but useful.',{knowledge:1,confidence:1},s=>poor(s)],
 ['budget-shared-meal','A meal shared without keeping count','A neighbour shares food when the week is tight. You accept, and make plans to contribute when you can.',{health:1,happiness:2,relationships:2},s=>poor(s)&&s.relationships>=60],
 ['budget-avoid-call','Avoiding a call about money','You let a call about an unpaid balance go unanswered. The immediate relief fades, and the worry stays.',{happiness:-2,stress:2},s=>s.debt>s.country.ppp*.6&&s.happiness<40],
 ['budget-planning','A plan that names the actual costs','You write down earnings, regular costs and the remaining debt. Choosing what to tackle first feels easier once the amounts are visible.',{knowledge:1,stress:-2},s=>s.debt>0&&s.knowledge>=45],
 ['budget-small-freedom','One small choice without calculation','You buy an ordinary comfort without having to compare it with every other obligation. It feels like a kind of freedom.',{happiness:2},s=>rich(s),{costRate:.002}],
 ['budget-rent-worry','Another reminder of the rent','The next rent payment is approaching. You run through the available money before making any other plans.',{happiness:-1,stress:2},s=>s.housing.kind==='rented'&&poor(s)],
 ['budget-home-work','The home needs attention','A small household repair cannot wait indefinitely. You arrange the materials and get it done.',{confidence:1,stress:1},s=>s.housing.kind==='owned',{costRate:.003}],
 ['budget-generosity','Giving help you can sustain','You help someone with a modest practical need. This time it does not put your own essentials at risk.',{relationships:2,happiness:1},s=>rich(s)&&s.relationships>=50,{costRate:.002}],
 ['budget-worry-body','Worry follows you into the night','You lie awake going over the same financial problem. The following day begins with less energy than it should.',{health:-2,happiness:-2,stress:2},s=>s.debt>s.country.ppp&&s.cash<s.country.ppp*.04]
]);
group('self',18,95,'Personal time',[
 ['adult-morning','A morning without rushing','You have enough time to finish one thing before beginning another. The calm lasts into the rest of the day.',{happiness:2,stress:-1},s=>s.stress<50],
 ['adult-invitations','Saying yes to a small invitation','You accept an invitation you nearly declined. Ordinary conversation leaves you feeling more connected to where you live.',{relationships:2,happiness:1},s=>s.relationships>=35],
 ['adult-isolation','A day with nobody to speak to','A day passes without a proper conversation. You notice the silence most when something happens that you want to tell someone.',{happiness:-2,relationships:-1},s=>s.relationships<25],
 ['adult-hobby-return','Returning to {hobby}','You return to {hobby} after a gap. Some parts feel unfamiliar; others come back before you expect them to.',{happiness:2,knowledge:1},s=>s.interests.length>0,{practice:.25}],
 ['adult-hobby-plateau','The part of {hobby} that still resists you','Progress in {hobby} stalls. Going back to the basics is frustrating, but you begin to see the problem more clearly.',{knowledge:1,confidence:-1},s=>s.interests.length>0&&O.skillLevel(s,s.interests[0])>=5,{practice:.15}],
 ['adult-teaching-hobby','Someone asks you to show them','Your practice in {hobby} is useful to someone just starting. Teaching them makes the skill feel more shared.',{relationships:2,confidence:2},s=>s.interests.some(n=>O.skillLevel(s,n)>=9),{practice:.2}],
 ['adult-hobby-show','Showing something you made','You show someone a result of your work in {hobby}. They notice a detail you had spent a long time getting right.',{happiness:2,confidence:1},s=>s.interests.some(n=>O.skillLevel(s,n)>=5)],
 ['adult-keep-rest','Rest you do not have to earn','You keep a period of rest in the day even though the task list is unfinished. You return with a little more patience.',{health:1,happiness:1,stress:-2},s=>s.routines.includes('outdoors')],
 ['adult-cancelled','Plans cancelled by exhaustion','You cancel something you wanted to do because you are too tired to enjoy it. Rest is necessary, but the loss still disappoints you.',{happiness:-2,health:1},s=>s.health<40],
 ['adult-missed-interest','The interest that keeps being postponed','You put away the materials for {hobby} again without using them. The missing time begins to feel like a loss of part of yourself.',{happiness:-2},s=>s.interests.length>0&&!s.routines.includes('practice')&&s.stress>65],
 ['adult-photograph','The story outside the photograph','An old photograph brings back what happened outside the frame. You write down the detail before it slips away again.',{happiness:1,knowledge:1},s=>s.age>=30],
 ['adult-reconsider','An ambition changes shape','You realise that an older ambition no longer fits the life you have now. Letting it change brings relief as well as sadness.',{happiness:1,confidence:1,stress:-1},s=>s.age>=35&&s.age<=65]
]);
group('lost',10,95,'Remembering',[
 ['lost-saying','A saying you hear in your own voice','You hear yourself repeat something {person} used to say. It brings back a voice and a room more clearly than you expected.',{happiness:1,relationships:1}],
 ['lost-date','A familiar date on the calendar','A date connected with {person} comes round. You make room for the memory rather than trying to work through it unnoticed.',{happiness:-1,relationships:1}],
 ['lost-story-shared','Telling someone about {person}','You tell a younger person a story about {person}. Choosing which detail to explain makes you see the memory differently.',{relationships:2,happiness:1},s=>s.age>=25],
 ['lost-object','An ordinary object kept for a reason','An object that belonged to {person} turns up while tidying. You decide why you want to keep it.',{happiness:1,stress:-1}],
 ['lost-grief-return','A difficult memory returns','Something ordinary brings back the loss of {person}. The rest of the day needs more care than you expected.',{happiness:-2,stress:1},s=>s.happiness<45],
 ['lost-shared-laughter','Remembering the funny part too','A story about {person} ends in laughter. You are glad the memory can hold more than the loss.',{happiness:2,relationships:1},s=>s.relationships>=45]
]);
group('self',60,105,'Later life',[
 ['elder-energy','Planning around your energy','You arrange the day so the demanding task comes first. Adapting the routine lets you keep doing more of what matters.',{health:1,confidence:1},s=>s.health>=35],
 ['elder-appointments','Appointments take up the calendar','Health appointments begin to organise the week. You miss being able to make plans without checking first.',{happiness:-1,stress:1},s=>s.health<50],
 ['elder-neighbour','Being recognised on the usual route','Someone on your usual route greets you by name. Familiarity with a place becomes a form of company.',{relationships:2,happiness:1},s=>s.relationships>=40],
 ['elder-hobby','A skill kept alive by practice','You make time for {hobby}. Years of practice allow small adjustments that would once have taken much more thought.',{knowledge:1,happiness:2},s=>s.interests.some(n=>O.skillLevel(s,n)>=9)],
 ['elder-lonely','An invitation that never quite happens','People talk about arranging a visit, but no date is settled. The waiting leaves the week feeling longer.',{happiness:-2,relationships:-1},s=>s.relationships<35],
 ['elder-stories','A younger person asks how it was','Someone asks about an earlier part of your life. You choose a story that explains more than a list of achievements.',{relationships:2,confidence:1},s=>s.relationships>=45],
 ['elder-free-time','Time changes after work ends','Without work setting the rhythm, you begin building another routine. Some freedom is welcome; some structure is missed.',{happiness:1,stress:-1},s=>s.job==='Retired'],
 ['elder-limits','Accepting help with one task','You accept help with a task that has become difficult. It allows you to keep your energy for something you want to do yourself.',{health:1,relationships:1,confidence:1},s=>s.health<40&&s.relationships>=50]
]);
// Local experiences: specific practices and institutions, with explanations attached.
const local=(codes,rows)=>rows.forEach(([id,min,max,title,body,fx,when,factKey])=>defs.push({id:'local-'+id,subject:'self',min,max,category:'Place & culture',title,body,fx,when:s=>codes.includes(s.country.code)&&(!when||when(s)),factKey,cooldown:14,maxUses:1,specificity:4}));
local(['IN'],[
 ['diwali-small',6,95,'Lighting a small Diwali lamp','Your household marks Diwali with a few lamps and something sweet. Keeping it small lets the evening stay within the budget.',{happiness:2,relationships:2},s=>s.flags.observesTradition&&poor(s),'diwali'],
 ['diwali-gather',6,95,'A Diwali visit','During Diwali, your household visits people it has not seen for a while. The conversations continue after the lamps are lit.',{happiness:2,relationships:2},s=>s.flags.observesTradition&&!poor(s),'diwali'],
 ['holi-friend',8,30,'Friends invite you for Holi','Friends invite you to a Holi gathering. You agree on what you are comfortable with, then join the colour and noise.',{happiness:2,relationships:2},s=>s.relationships>=50,'holi'],
 ['class10-strong',14,16,'Class 10 is approaching','You prepare for your Class 10 board examinations. Your strong understanding helps you use revision time well.',{knowledge:2,confidence:1,stress:2},s=>inSchool(s)&&s.knowledge>=60,'class-10'],
 ['class10-gap',14,16,'Class 10 preparation exposes gaps','Preparing for Class 10 board examinations reveals topics you never quite understood. You need a plan rather than more anxious rereading.',{knowledge:-1,happiness:-1,stress:3},s=>inSchool(s)&&s.knowledge<45,'class-10'],
 ['class12-choice',16,18,'Subjects after Class 10','Conversations about Class 12 subjects make the connection between {hobby} and possible university courses feel more concrete.',{knowledge:2,confidence:1},s=>inSchool(s)&&s.interests.length>0,'class-12'],
 ['kolkata-monsoon',7,80,'Rain changes the journey through Kolkata','Heavy rain slows your journey through Kolkata. You arrive late, tired and with wet belongings to dry.',{health:-1,happiness:-1,stress:1},s=>s.location.name==='Kolkata',null],
 ['village-help',8,70,'An errand near {place}','An older neighbour asks for practical help near {place}. Giving your time turns a familiar face into someone you know.',{relationships:2,confidence:1},s=>!s.urban&&s.relationships>=40,null]
]);
local(['CN'],[
 ['gaokao-ready',16,18,'Preparing for the gaokao','You organise practice papers for the gaokao. Understanding the material helps you decide what to revise rather than treating every topic as equally uncertain.',{knowledge:2,confidence:1,stress:2},s=>inSchool(s)&&s.knowledge>=60,'gaokao'],
 ['gaokao-pressure',16,18,'The gaokao fills the conversation','At home and school, the gaokao keeps returning to the conversation. Worry begins to take time away from useful preparation.',{happiness:-2,stress:3},s=>inSchool(s)&&s.stress>=55,'gaokao'],
 ['spring-travel',6,85,'Making time for Spring Festival','Your household rearranges work and visits around Spring Festival. Reuniting brings familiar comforts and a crowded schedule.',{relationships:2,happiness:2,stress:1},s=>s.flags.observesTradition,'lunar-new-year'],
 ['hongcun-sketch',8,80,'Looking closely at {place}','You spend time looking at old buildings around {place}, noticing rooflines and details you had walked past before.',{knowledge:1,happiness:1},s=>['Hongcun','Xidi'].includes(s.location.name)&&s.interests.some(n=>/art|draw|history/i.test(n)),null]
]);
local(['HK'],[
 ['hkdse-subject',15,18,'An HKDSE subject starts to connect','An HKDSE topic connects with {hobby}. Revision feels less like remembering isolated facts.',{knowledge:2,confidence:1},s=>inSchool(s)&&s.interests.length>0,'hkdse'],
 ['hkdse-strain',16,18,'The HKDSE timetable feels close','As HKDSE examinations approach, you compare what is left to study with the time available. Sleep becomes an easy thing to give up.',{health:-1,happiness:-1,stress:2},s=>inSchool(s)&&s.stress>=50,'hkdse'],
 ['midautumn-lantern',6,90,'An evening at Mid-Autumn','At Mid-Autumn Festival, you join a small gathering with lanterns and shared food. Being together matters more than an elaborate celebration.',{happiness:2,relationships:2},s=>s.flags.observesTradition,'mid-autumn'],
 ['dragonboat-watch',8,85,'Watching the Dragon Boat races','You find a place to watch Dragon Boat racing with someone you know. The effort of moving in time becomes part of the conversation afterwards.',{happiness:2,relationships:1},s=>s.relationships>=40,'dragon-boat'],
 ['tai-o-neighbours',8,85,'An ordinary errand in Tai O','An errand in Tai O takes longer because people stop to talk. You learn which neighbour has been having a difficult week.',{relationships:2,knowledge:1},s=>s.location.name==='Tai O',null],
 ['hongkong-commute',16,70,'A crowded journey across Hong Kong','A crowded public-transport journey leaves you needing quiet before the next obligation. You adjust the timing of the following day.',{happiness:-1,stress:1},s=>s.urban&&(working(s)||inSchool(s)),null]
]);
local(['GB'],[
 ['gcse-revision',14,16,'Making a GCSE revision plan','You break GCSE revision into particular subjects and topics. A plan makes the work easier to begin.',{knowledge:2,stress:-1},s=>inSchool(s)&&!/Scotland|Edinburgh/.test(O.placeLabel(s))&&s.routines.includes('study'),'gcse'],
 ['alevel-subject',16,18,'Going deeper in fewer subjects','Studying at A-level or equivalent means spending longer with fewer subjects. You discover whether the interest survives the difficult parts.',{knowledge:2,confidence:1},s=>inSchool(s)&&!/Scotland|Edinburgh/.test(O.placeLabel(s)),'a-level'],
 ['bonfire-company',7,90,'An evening around Bonfire Night','You join a local Bonfire Night gathering with people you know. The cold journey back is filled with talk about the display.',{happiness:2,relationships:1},s=>s.relationships>=45,'bonfire-night'],
 ['village-recognise',7,90,'Familiar faces near {place}','Walking near {place}, you are stopped by people who know your household. A brief errand becomes a conversation about how everyone is doing.',{relationships:2,happiness:1},s=>!s.urban,null]
]);
local(['KE'],[
 ['kenya-school-stage',12,17,'A new stage of school','The next school stage brings different subjects and assessment arrangements. You ask which choices affect the route you can take afterwards.',{knowledge:2,confidence:1},s=>inSchool(s),'kenya-senior-school'],
 ['iten-run',9,65,'An early run near Iten','You join an early run near Iten. You cannot keep everyone’s pace, but you finish more than you expected.',{health:2,happiness:1},s=>s.location.name==='Iten'&&s.health>=50,null],
 ['kenya-hands-help',10,70,'Helping with work near {place}','You lend time and effort to a neighbour’s practical task. Afterwards, you know each other better than before.',{relationships:2,health:-1},s=>!s.urban&&s.relationships>=40,null]
]);
local(['JP'],[
 ['obon-return',8,90,'An Obon visit','Your household makes time for Obon observances. Remembering ancestors opens a conversation about relatives you knew only through stories.',{relationships:2,knowledge:1},s=>s.flags.observesTradition,'obon'],
 ['kyoto-walk',8,85,'A familiar route through Kyoto','You walk a familiar route through Kyoto with someone close, noticing how different it feels without rushing to an obligation.',{happiness:2,relationships:1},s=>s.location.name==='Kyoto'&&s.relationships>=40,null],
 ['ogimachi-neighbour',8,80,'A task shared in Ogimachi','A practical task near home brings neighbours together. You learn a method from someone who has done it for years.',{knowledge:1,relationships:2},s=>s.location.name==='Ogimachi',null]
]);
local(['IR','UZ','TJ','AZ'],[['nowruz-visit',6,95,'A Nowruz visit','Your household marks Nowruz with a visit and a carefully prepared meal. Familiar customs help frame what everyone hopes for in the coming year.',{happiness:2,relationships:2},s=>s.flags.observesTradition,'nowruz']]);
local(['KR'],[['chuseok-gather',6,95,'Gathering for Chuseok','Your household makes time for a Chuseok gathering. Food and family stories make the visit feel connected to earlier generations.',{happiness:2,relationships:2},s=>s.flags.observesTradition,'chuseok']]);
local(['TH'],[['songkran-respect',7,90,'A quieter part of Songkran','Alongside the public celebrations, you spend part of Songkran visiting someone older and listening to their wishes for the new year.',{relationships:2,happiness:1},s=>s.flags.observesTradition,'songkran']]);
local(['BD','PK','ID','MY','EG','SA','AE'],[
 ['eid-gather',6,95,'An Eid al-Fitr meal','Your household joins an Eid al-Fitr meal after Ramadan. Sharing food and visits makes room for people whose weeks have been difficult.',{happiness:2,relationships:2},s=>s.flags.observesTradition,'eid-al-fitr'],
 ['iftar-help',10,80,'Helping prepare iftar','You help prepare an iftar meal during Ramadan. The work is shared, and the conversation continues after everyone sits down.',{relationships:2,happiness:1},s=>s.flags.observesTradition,'ramadan']
]);
local(['GH'],[['homowo-meal',7,95,'A Homowo gathering','Your household joins a Homowo gathering, with food and stories about how the occasion is remembered locally.',{happiness:2,relationships:2},s=>s.flags.observesTradition&&s.location.name==='Accra','homowo'],['wassce-work',16,19,'Preparing for WASSCE','WASSCE preparation turns broad ambitions into subjects and tasks you can work on. The certificate is a step, rather than a promised job.',{knowledge:2,stress:1},s=>inSchool(s),'wassce']]);
local(['ET'],[['meskel-gather',7,95,'A Meskel gathering','Your household joins others for Meskel. The gathering gives you time with people whose lives rarely fit the same schedule.',{relationships:2,happiness:2},s=>s.flags.observesTradition,'meskel']]);
local(['PL'],[['matura-plan',17,19,'Planning for the matura','You compare matura subjects with courses you might apply for. The practical requirements make your next step more specific.',{knowledge:2,confidence:1},s=>inSchool(s),'matura']]);
local(['US','GB','PL','GH','NG','KE','BR','DE','IT'],[['christmas-small',6,95,'A Christmas gathering kept simple','Your household keeps Christmas modest this year. Food and time together matter more than the number of presents.',{relationships:2,happiness:2},s=>s.flags.observesTradition&&poor(s),'christmas']]);
// Materialise serialisable records: queued moments retain their subject identity.
function subjects(s,d){if(d.subject==='self')return [s];if(d.subject==='pet')return s.memories.pet?.alive?[s.memories.pet]:[];if(d.subject==='lost')return s.people.filter(p=>!p.alive&&['Mother','Father','Sibling','Partner','Friend','Grandparent'].includes(p.role));if(d.subject==='parent')return s.people.filter(p=>p.alive&&['Mother','Father'].includes(p.role));return alive(s,d.subject[0].toUpperCase()+d.subject.slice(1));}
function eligible(s,d,p){return !!p&&(d.subject==='self'||(d.subject==='lost'?!p.alive:p.alive!==false))&&s.age>=d.min&&s.age<=d.max&&d.when(s,p);}
function key(d,p){return d.id+'|'+(p.id||p.kind||'self');}
function text(t,s,p){const v={person:p===s?'you':p.name,personAge:p.age,place:s.location?.name||s.country.name,hobby:s.interests[0]||'an interest you have been exploring',job:s.job||'work',course:s.study?.course||'your course',school:O.schoolLabel(s)};return String(t).replace(/\{(\w+)\}/g,(_,k)=>v[k]??'');}
O.MOMENT_DEFS=defs;
O.momentCandidates=function(s){O.ensureClarity(s);return defs.flatMap(d=>subjects(s,d).filter(p=>eligible(s,d,p)).filter(p=>{const k=key(d,p),last=s.flags.momentHistory[k];return (last===undefined||s.age-last>=d.cooldown)&&(s.flags.momentCounts[k]||0)<d.maxUses;}).map(p=>({d,p,key:key(d,p),weight:(d.specificity||1)+(d.subject!=='self'?3:0)+(d.when?1:0)})));};
function materialise(s,c){return {id:'moment-'+c.d.id,dynamicMoment:c.d.id,subjectId:c.p===s?'self':c.p.id||'pet',momentKey:c.key,title:text(c.d.title,s,c.p),description:text(c.d.body,s,c.p),scene:'household',kind:'story',type:'story',effect:'dynamic-moment',factKey:c.d.factKey||null};}
O.pickStories=function(s,n){const pool=O.momentCandidates(s),result=[],categories={};for(let i=0;i<n&&pool.length;i++){const eligiblePool=pool.filter(c=>(categories[c.d.category]||0)<2),choice=O.weighted(s,eligiblePool.length?eligiblePool:pool,c=>c.weight);result.push(materialise(s,choice));categories[choice.d.category]=(categories[choice.d.category]||0)+1;pool.splice(pool.indexOf(choice),1);}return result;};
const fire=O.fireStory;O.fireStory=function(s,item){if(!item.dynamicMoment)return fire(s,item);O.ensureClarity(s);const d=defs.find(x=>x.id===item.dynamicMoment);if(!d)return;const p=item.subjectId==='self'?s:item.subjectId==='pet'?s.memories.pet:s.people.find(p=>p.id===item.subjectId);if(!p||!eligible(s,d,p))return;
 const k=key(d,p);if(s.flags.momentHistory[k]!==undefined&&s.age-s.flags.momentHistory[k]<d.cooldown)return;
 s.flags.momentHistory[k]=s.age;s.flags.momentCounts[k]=(s.flags.momentCounts[k]||0)+1;
 const before={cash:s.cash,debt:s.debt},fx=typeof d.fx==='function'?d.fx(s,p):d.fx,actual=Object.fromEntries(Object.entries(fx).map(([name,n])=>[name,clamp(s[name]+n)-s[name]]));O.adjust(s,fx);if(p!==s&&p.close!==undefined&&actual.relationships)p.close=clamp(p.close+actual.relationships);
 if(d.practice&&s.interests[0])O.practice(s,s.interests[0],d.practice);if(d.petBond)p.bond=clamp((p.bond||55)+d.petBond);if(d.petHealth)p.health=clamp((p.health||70)+d.petHealth);
 let description=text(d.body,s,p);if(d.costRate){const cost=Math.round(s.country.ppp*d.costRate),pool=s.age<18?'familyCash':'cash',paid=Math.min(s[pool]||0,cost);s[pool]=Math.max(0,(s[pool]||0)-paid);const unpaid=cost-paid;if(unpaid&&s.age>=18){s.debt+=unpaid;if(!O.canBorrow(s,unpaid)){s.flags.arrears=(s.flags.arrears||0)+unpaid;s.flags.creditMisses++;}}description+=` Cost ${O.money(cost)}: ${O.money(paid)} paid${unpaid?`; ${O.money(unpaid)} ${s.age>=18?'remains owed':'could not be covered by the household'}`:''}.`;}
 if(d.earnRate){const n=Math.round(s.country.ppp*d.earnRate);s.cash+=n;description+=` Extra earnings ${O.money(n)}.`;}
 O.journal(s,text(d.title,s,p),description,'life');const e=s.journal[0];e.effects=actual;e.money={cash:s.cash-before.cash,debt:s.debt-before.debt};e.factKey=d.factKey;e.context=O.preciseContext(s,e);e.momentId=d.id;e.subjectId=item.subjectId;e.tone=Object.entries(actual).reduce((n,[k,v])=>n+(k==='stress'?-v:v),0)>=0?'good':'bad';s.lastOutcome='';s.scene='household';
};
window.dispatchEvent?.(new Event('other-lives-ready'));
})(window.OL);
