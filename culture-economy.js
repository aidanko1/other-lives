/* Other Lives v5 — fixed 2024 snapshot, country-specific cultural & family model, annual Spend.
   Each example tradition is optional and never assumed of every resident.
   Financial values remain modelled PPP units, NOT local retail prices. */
(function(O){
'use strict';
const PROFILE = {
  "AF": {
    "name": "Nowruz",
    "detail": "Spring gatherings, food and visiting relatives",
    "countrySpecific": true,
    "fertility2024": 4.8
  },
  "AL": {
    "name": "Dita e Verës",
    "detail": "Springtime visits and seasonal celebrations",
    "countrySpecific": true,
    "fertility2024": 1.3
  },
  "DZ": {
    "name": "Eid al-Fitr",
    "detail": "Family visits, shared food and gifts",
    "countrySpecific": true,
    "fertility2024": 2.7
  },
  "AO": {
    "name": "Carnival",
    "detail": "Costumes, music and public gatherings",
    "countrySpecific": true,
    "fertility2024": 5.0
  },
  "AR": {
    "name": "Día de la Tradición",
    "detail": "Music, food and community celebrations",
    "countrySpecific": true,
    "fertility2024": 1.5
  },
  "AM": {
    "name": "Vardavar",
    "detail": "Summer water festivities and family gatherings",
    "countrySpecific": true,
    "fertility2024": 1.7
  },
  "AU": {
    "name": "ANZAC Day",
    "detail": "Commemoration, family conversations and community events",
    "countrySpecific": true,
    "fertility2024": 1.5
  },
  "AT": {
    "name": "Advent markets",
    "detail": "Winter markets and seasonal traditions",
    "countrySpecific": true,
    "fertility2024": 1.3
  },
  "AZ": {
    "name": "Novruz",
    "detail": "Spring cleaning, family meals and visits",
    "countrySpecific": true,
    "fertility2024": 1.4
  },
  "BD": {
    "name": "Pohela Boishakh",
    "detail": "Bangla New Year fairs, music and food",
    "countrySpecific": true,
    "fertility2024": 2.1
  },
  "BE": {
    "name": "Carnival of Binche",
    "detail": "Parades and community festivities",
    "countrySpecific": true,
    "fertility2024": 1.4
  },
  "BJ": {
    "name": "Voodoo Festival",
    "detail": "Traditional ceremonies observed by some communities",
    "countrySpecific": true,
    "fertility2024": 4.5
  },
  "BO": {
    "name": "Carnaval de Oruro",
    "detail": "Parades, dance and regional traditions",
    "countrySpecific": true,
    "fertility2024": 2.5
  },
  "BR": {
    "name": "Festa Junina",
    "detail": "Community dances, food and seasonal fairs",
    "countrySpecific": true,
    "fertility2024": 1.6
  },
  "BG": {
    "name": "Baba Marta",
    "detail": "Spring martenitsa exchanges",
    "countrySpecific": true,
    "fertility2024": 1.7
  },
  "BT": {
    "name": "Tshechu",
    "detail": "Religious dance festivals in local districts",
    "countrySpecific": true,
    "fertility2024": 1.4
  },
  "BW": {
    "name": "Dikgafela",
    "detail": "Community harvest gatherings and celebrations",
    "countrySpecific": true,
    "fertility2024": 2.7
  },
  "CA": {
    "name": "Canada Day",
    "detail": "Neighbourhood celebrations and family outings",
    "countrySpecific": true,
    "fertility2024": 1.3
  },
  "KH": {
    "name": "Khmer New Year",
    "detail": "Family visiting, temple customs and celebrations",
    "countrySpecific": true,
    "fertility2024": 2.5
  },
  "CM": {
    "name": "Ngondo Festival",
    "detail": "Duala community river and cultural celebrations",
    "countrySpecific": true,
    "fertility2024": 4.3
  },
  "CL": {
    "name": "Fiestas Patrias",
    "detail": "Family gatherings, music and food",
    "countrySpecific": true,
    "fertility2024": 1.1
  },
  "CN": {
    "name": "Lunar New Year",
    "detail": "Family reunion meals and travel",
    "countrySpecific": true,
    "fertility2024": 1.0
  },
  "CO": {
    "name": "Feria de las Flores",
    "detail": "Flower parades and cultural celebrations in Medellín",
    "countrySpecific": true,
    "fertility2024": 1.6
  },
  "CR": {
    "name": "Día de la Mascarada",
    "detail": "Traditional masks and local parades",
    "countrySpecific": true,
    "fertility2024": 1.3
  },
  "HR": {
    "name": "Sinjska Alka",
    "detail": "A historic regional equestrian festival",
    "countrySpecific": true,
    "fertility2024": 1.5
  },
  "CU": {
    "name": "Carnaval de Santiago",
    "detail": "Street music, parades and community traditions",
    "countrySpecific": true,
    "fertility2024": 1.4
  },
  "CY": {
    "name": "Kataklysmos",
    "detail": "Waterfront fairs and spring celebrations",
    "countrySpecific": true,
    "fertility2024": 1.4
  },
  "CZ": {
    "name": "Masopust",
    "detail": "Carnival costumes, local food and parades",
    "countrySpecific": true,
    "fertility2024": 1.4
  },
  "DK": {
    "name": "Sankt Hans",
    "detail": "Midsummer gatherings and bonfires",
    "countrySpecific": true,
    "fertility2024": 1.5
  },
  "DO": {
    "name": "Carnaval Dominicano",
    "detail": "Costumes, music and street parades",
    "countrySpecific": true,
    "fertility2024": 2.2
  },
  "EC": {
    "name": "Fiestas de Quito",
    "detail": "Regional cultural events and neighbourhood gatherings",
    "countrySpecific": true,
    "fertility2024": 1.8
  },
  "EG": {
    "name": "Sham el-Nessim",
    "detail": "Spring outings and shared family food",
    "countrySpecific": true,
    "fertility2024": 2.7
  },
  "SV": {
    "name": "Fiestas Agostinas",
    "detail": "Local religious and civic celebrations",
    "countrySpecific": true,
    "fertility2024": 1.8
  },
  "EE": {
    "name": "Jaanipäev",
    "detail": "Midsummer bonfires and gatherings",
    "countrySpecific": true,
    "fertility2024": 1.2
  },
  "ET": {
    "name": "Enkutatash",
    "detail": "Ethiopian New Year family greetings and meals",
    "countrySpecific": true,
    "fertility2024": 3.9
  },
  "FJ": {
    "name": "Diwali",
    "detail": "Celebrations in some Fiji Indo-Fijian communities",
    "countrySpecific": true,
    "fertility2024": 2.3
  },
  "FI": {
    "name": "Juhannus",
    "detail": "Midsummer lakeside and family gatherings",
    "countrySpecific": true,
    "fertility2024": 1.3
  },
  "FR": {
    "name": "Fête de la Musique",
    "detail": "Public concerts and neighbourhood music",
    "countrySpecific": true,
    "fertility2024": 1.6
  },
  "GE": {
    "name": "Tbilisoba",
    "detail": "Autumn city events, regional music and food",
    "countrySpecific": true,
    "fertility2024": 1.8
  },
  "DE": {
    "name": "Weihnachtsmarkt",
    "detail": "Winter markets and seasonal gatherings",
    "countrySpecific": true,
    "fertility2024": 1.4
  },
  "GH": {
    "name": "Homowo",
    "detail": "Ga community harvest traditions and family visits",
    "countrySpecific": true,
    "fertility2024": 3.3
  },
  "GR": {
    "name": "Apokries",
    "detail": "Carnival costumes and regional celebrations",
    "countrySpecific": true,
    "fertility2024": 1.2
  },
  "GT": {
    "name": "Semana Santa",
    "detail": "Processions, cultural displays and travel",
    "countrySpecific": true,
    "fertility2024": 2.3
  },
  "HT": {
    "name": "Rara season",
    "detail": "Street music traditions and community events",
    "countrySpecific": true,
    "fertility2024": 2.6
  },
  "HN": {
    "name": "Feria Juniana",
    "detail": "Regional fairs and performances",
    "countrySpecific": true,
    "fertility2024": 2.5
  },
  "HK": {
    "name": "Mid-Autumn Festival",
    "detail": "Lanterns, family reunions and mooncakes",
    "countrySpecific": true,
    "fertility2024": 0.8
  },
  "HU": {
    "name": "Busójárás",
    "detail": "Masked carnival traditions in Mohács",
    "countrySpecific": true,
    "fertility2024": 1.4
  },
  "IS": {
    "name": "Þorrablót",
    "detail": "Traditional seasonal meals and gatherings",
    "countrySpecific": true,
    "fertility2024": 1.6
  },
  "IN": {
    "name": "Diwali",
    "detail": "Lights, household visits and celebrations in many communities",
    "countrySpecific": true,
    "fertility2024": 2.0
  },
  "ID": {
    "name": "Lebaran",
    "detail": "Eid homecoming journeys and family visits",
    "countrySpecific": true,
    "fertility2024": 2.1
  },
  "IR": {
    "name": "Nowruz",
    "detail": "Persian New Year visits and family meals",
    "countrySpecific": true,
    "fertility2024": 1.7
  },
  "IQ": {
    "name": "Nowruz",
    "detail": "Spring celebrations in Kurdish communities",
    "countrySpecific": true,
    "fertility2024": 3.2
  },
  "IE": {
    "name": "St Patrick’s Day",
    "detail": "Parades, public events and gatherings",
    "countrySpecific": true,
    "fertility2024": 1.5
  },
  "IL": {
    "name": "Hanukkah",
    "detail": "Lights, gatherings and traditions in Jewish households",
    "countrySpecific": true,
    "fertility2024": 2.9
  },
  "IT": {
    "name": "Ferragosto",
    "detail": "Summer trips and family gatherings",
    "countrySpecific": true,
    "fertility2024": 1.2
  },
  "CI": {
    "name": "Fête de l'Abissa",
    "detail": "Nzima community cultural performances",
    "countrySpecific": true
  },
  "JM": {
    "name": "Emancipation Day",
    "detail": "Community remembrance and music",
    "countrySpecific": true
  },
  "JP": {
    "name": "Hanami",
    "detail": "Cherry blossom outings and picnics",
    "countrySpecific": true
  },
  "JO": {
    "name": "Eid al-Adha",
    "detail": "Family visiting and shared meals",
    "countrySpecific": true
  },
  "KZ": {
    "name": "Nauryz",
    "detail": "Spring feasts and community events",
    "countrySpecific": true
  },
  "KE": {
    "name": "Jamhuri Day",
    "detail": "Civic celebrations and local gatherings",
    "countrySpecific": true
  },
  "KR": {
    "name": "Chuseok",
    "detail": "Harvest family visits and memorial traditions",
    "countrySpecific": true
  },
  "KW": {
    "name": "National Day",
    "detail": "Family gatherings and public celebrations",
    "countrySpecific": true
  },
  "KG": {
    "name": "Nooruz",
    "detail": "Spring visiting and festivities",
    "countrySpecific": true
  },
  "LA": {
    "name": "Pi Mai",
    "detail": "Lao New Year celebrations and water festivities",
    "countrySpecific": true
  },
  "LV": {
    "name": "Jāņi",
    "detail": "Midsummer songs, wreaths and gatherings",
    "countrySpecific": true
  },
  "LB": {
    "name": "Eid al-Fitr",
    "detail": "Celebrations in many Muslim households",
    "countrySpecific": true
  },
  "LT": {
    "name": "Joninės",
    "detail": "Summer bonfires, songs and family visits",
    "countrySpecific": true
  },
  "LU": {
    "name": "Schueberfouer",
    "detail": "Annual city fair and outings",
    "countrySpecific": true
  },
  "MY": {
    "name": "Hari Raya Aidilfitri",
    "detail": "Open-house visits and family gatherings",
    "countrySpecific": true
  },
  "MV": {
    "name": "Eid al-Fitr",
    "detail": "Family visits and festive meals",
    "countrySpecific": true
  },
  "ML": {
    "name": "Tabaski",
    "detail": "Family obligations and festive preparations",
    "countrySpecific": true
  },
  "MT": {
    "name": "Village festas",
    "detail": "Local patron-saint celebrations",
    "countrySpecific": true
  },
  "MX": {
    "name": "Día de Muertos",
    "detail": "Family remembrances and offerings",
    "countrySpecific": true
  },
  "MD": {
    "name": "Mărțișor",
    "detail": "Spring tokens and family customs",
    "countrySpecific": true
  },
  "MN": {
    "name": "Naadam",
    "detail": "Wrestling, archery and horse-racing traditions",
    "countrySpecific": true
  },
  "MA": {
    "name": "Eid al-Adha",
    "detail": "Family celebrations and food preparations",
    "countrySpecific": true
  },
  "MZ": {
    "name": "Independence Day",
    "detail": "Public commemorations and gatherings",
    "countrySpecific": true
  },
  "MM": {
    "name": "Thingyan",
    "detail": "New Year water festivities",
    "countrySpecific": true
  },
  "NP": {
    "name": "Dashain",
    "detail": "Family visits, blessings and seasonal gatherings",
    "countrySpecific": true
  },
  "NL": {
    "name": "Koningsdag",
    "detail": "Street markets and public celebrations",
    "countrySpecific": true
  },
  "NZ": {
    "name": "Matariki",
    "detail": "Māori New Year observances and community events",
    "countrySpecific": true
  },
  "NI": {
    "name": "La Purísima",
    "detail": "Family and neighbourhood religious celebrations",
    "countrySpecific": true
  },
  "NE": {
    "name": "Tabaski",
    "detail": "Community gatherings and shared meals",
    "countrySpecific": true
  },
  "NG": {
    "name": "New Yam Festival",
    "detail": "Harvest traditions in some Igbo communities",
    "countrySpecific": true
  },
  "NO": {
    "name": "Constitution Day",
    "detail": "Parades, family visits and children's celebrations",
    "countrySpecific": true
  },
  "OM": {
    "name": "Eid al-Fitr",
    "detail": "Family celebrations and outings",
    "countrySpecific": true
  },
  "PK": {
    "name": "Eid al-Fitr",
    "detail": "Family visits, gifts and celebrations",
    "countrySpecific": true
  },
  "PA": {
    "name": "Carnaval",
    "detail": "Community parades and family outings",
    "countrySpecific": true
  },
  "PY": {
    "name": "Festival de San Juan",
    "detail": "Traditional local games and celebrations",
    "countrySpecific": true
  },
  "PE": {
    "name": "Inti Raymi",
    "detail": "Andean winter-solstice festival in Cusco",
    "countrySpecific": true
  },
  "PH": {
    "name": "Sinulog",
    "detail": "Processions, dance and regional celebrations",
    "countrySpecific": true
  },
  "PL": {
    "name": "Wigilia",
    "detail": "Christmas Eve family meals in many households",
    "countrySpecific": true
  },
  "PT": {
    "name": "Santos Populares",
    "detail": "Neighbourhood June celebrations",
    "countrySpecific": true
  },
  "QA": {
    "name": "Qatar National Day",
    "detail": "Community celebrations and civic events",
    "countrySpecific": true
  },
  "RO": {
    "name": "Mărțișor",
    "detail": "Spring gifts and seasonal traditions",
    "countrySpecific": true
  },
  "RU": {
    "name": "Maslenitsa",
    "detail": "Late-winter public festivities",
    "countrySpecific": true
  },
  "RW": {
    "name": "Umuganda",
    "detail": "Monthly community work, discussion and social contact",
    "countrySpecific": true
  },
  "SA": {
    "name": "Eid al-Fitr",
    "detail": "Family visits and festive celebrations",
    "countrySpecific": true
  },
  "SN": {
    "name": "Grand Magal",
    "detail": "Touba pilgrimage and family arrangements among Mouride followers",
    "countrySpecific": true
  },
  "RS": {
    "name": "Slava",
    "detail": "Family patron-saint traditions in Orthodox households",
    "countrySpecific": true
  },
  "SG": {
    "name": "National Day",
    "detail": "Neighbourhood celebrations and public events",
    "countrySpecific": true
  },
  "SK": {
    "name": "Fašiangy",
    "detail": "Carnival customs and community gatherings",
    "countrySpecific": true
  },
  "SI": {
    "name": "Kurentovanje",
    "detail": "Traditional carnival costumes",
    "countrySpecific": true
  },
  "ZA": {
    "name": "Heritage Day",
    "detail": "Cultural events and family gatherings",
    "countrySpecific": true
  },
  "ES": {
    "name": "Las Fallas",
    "detail": "Valencia's spring community celebrations",
    "countrySpecific": true
  },
  "LK": {
    "name": "Sinhala and Tamil New Year",
    "detail": "New-year foods, games and visiting",
    "countrySpecific": true
  },
  "SD": {
    "name": "Eid al-Fitr",
    "detail": "Family visiting and community celebrations",
    "countrySpecific": true
  },
  "SE": {
    "name": "Midsommar",
    "detail": "Flower crowns and summer gatherings",
    "countrySpecific": true
  },
  "CH": {
    "name": "Sechseläuten",
    "detail": "Traditional spring festivities in Zurich",
    "countrySpecific": true
  },
  "TW": {
    "name": "Dragon Boat Festival",
    "detail": "Community races and seasonal food",
    "countrySpecific": true
  },
  "TJ": {
    "name": "Navruz",
    "detail": "Spring meals, visiting and neighbourhood events",
    "countrySpecific": true
  },
  "TZ": {
    "name": "Saba Saba",
    "detail": "Civic trade fairs and family outings",
    "countrySpecific": true
  },
  "TH": {
    "name": "Songkran",
    "detail": "Thai New Year visiting and water festivities",
    "countrySpecific": true
  },
  "TN": {
    "name": "Mawlid",
    "detail": "Community and family celebrations in some Muslim households",
    "countrySpecific": true
  },
  "TR": {
    "name": "Ramazan Bayramı",
    "detail": "Family visits, sweets and greetings",
    "countrySpecific": true
  },
  "TM": {
    "name": "Nowruz",
    "detail": "Spring visiting and festivities",
    "countrySpecific": true
  },
  "UG": {
    "name": "Independence Day",
    "detail": "Civic remembrance and community events",
    "countrySpecific": true
  },
  "UA": {
    "name": "Vyshyvanka Day",
    "detail": "Traditional embroidered-clothing celebrations",
    "countrySpecific": true
  },
  "AE": {
    "name": "Eid al-Fitr",
    "detail": "Family visits and community festivities",
    "countrySpecific": true
  },
  "GB": {
    "name": "Bonfire Night",
    "detail": "Seasonal fireworks and neighbourhood gatherings",
    "countrySpecific": true
  },
  "US": {
    "name": "Thanksgiving",
    "detail": "Family meals and travel for households that observe it",
    "countrySpecific": true
  },
  "UY": {
    "name": "Carnaval",
    "detail": "Community parades and music",
    "countrySpecific": true
  },
  "UZ": {
    "name": "Navruz",
    "detail": "Spring celebrations and family meals",
    "countrySpecific": true
  },
  "VE": {
    "name": "Carnaval",
    "detail": "Neighbourhood celebrations and family outings",
    "countrySpecific": true
  },
  "VN": {
    "name": "Tết",
    "detail": "Vietnamese lunar New Year family visits",
    "countrySpecific": true
  },
  "YE": {
    "name": "Eid al-Fitr",
    "detail": "Family visiting and local celebrations",
    "countrySpecific": true
  },
  "ZM": {
    "name": "Kuomboka",
    "detail": "Lozi community ceremonial migration traditions",
    "countrySpecific": true
  },
  "ZW": {
    "name": "Independence Day",
    "detail": "Public events and family gatherings",
    "countrySpecific": true
  }
};
const CORE = O.COUNTRIES;
O.COUNTRIES = CORE.filter(c=>!!PROFILE[c.code]);
const FALLBACK_FERTILITY={"West Africa":4.2,"Central Africa":4.6,"East Africa":3.9,"North Africa":2.7,"Southern Africa":2.7,"South Asia":2.3,"East Asia":1.25,"Southeast Asia":2.05,"Central Asia":2.8,"Middle East":2.7,"Eastern Europe":1.45,"Southern Europe":1.45,"Northern Europe":1.6,"Western Europe":1.5,"North America":1.8,"South America":1.9,"Central America":2.2,"Caribbean":1.9,"Oceania":1.8,"Pacific Islands":2.65};
const SAVE_VERSION='fixed-2024-cultural-v1';
O.CULTURAL_SNAPSHOT=PROFILE;
O.FIXED_DATA_VERSION=SAVE_VERSION;
O.refreshWorldData=async()=>false; // no network, no cached live override
O.WB_WORLD={status:()=> 'fixed',get:()=>null,meta:()=>({mode:'offline-fixed',version:SAVE_VERSION,countries:O.COUNTRIES.length})};
const oldMake=O.create;
const oldEnsure=O.ensureTimeline;
const oldStories=O.pickStories;
const oldFire=O.fireStory;
const names=(s)=>((s.people||[]).filter(p=>p.alive&&['Mother','Father'].includes(p.role)).map(p=>O.personLabel(p)).join(' and ')||'your family');
const num=(x,d)=>Number.isFinite(x)?x:d;
const weightedSample=(s,arr)=>arr[Math.min(arr.length-1,Math.floor(O.rand(s)*arr.length))];
const traditional=(s)=>{const item=PROFILE[s.country.code];return item?.name||'a community occasion'};
function ensure(s){
 if(!s||!s.country)return s;
 if(!s.flags)s.flags={};
 if(!s.spendHistory)s.spendHistory=[];
 if(!s.flags.spendYearUsed)s.flags.spendYearUsed={};
 if(!s.spendingYear||!Array.isArray(s.spendingOffers)||s.spendingYear!==s.age){
    s.spendingYear=s.age;s.spendingOffers=makeOffers(s);
 }
 if(!s.familyContext){
  const fertility=PROFILE[s.country.code]?.fertility2024;
  s.familyContext={fertility:Number.isFinite(fertility)?fertility:null,modelFertility:Number.isFinite(fertility)?fertility:num(FALLBACK_FERTILITY[s.country.region],2.3),tradition:traditional(s),note:'Fertility is a national population indicator; it does not determine this family’s number of children.'};
 }
 if(!Number.isFinite(s.familyCash))s.familyCash=Math.max(0,Math.round(s.familyIncome*(s.strata<=1?.07:.17)));
 if(s.age>=12&&s.age<18&&s.youthCashYear!==s.age){
   const allowanceRate=s.strata<=1?.00003:s.strata<=3?.00013:s.strata<=5?.0004:.001;
   const expected=Math.max(0,Math.min(s.strata>=6?180:65,Math.round((s.country.ppp||8000)*allowanceRate*(.8+s.age/25))));
   const funded=Math.min(num(s.familyCash,0),expected);
   s.youthCash=funded;s.familyCash=Math.max(0,s.familyCash-funded);s.youthCashYear=s.age;
 }
 if(!s.flags.familyTradition)s.flags.familyTradition=traditional(s);
 if(typeof s.flags.observesTradition!=='boolean')s.flags.observesTradition=(hash(s.seed+'|'+s.country.code+'|home-festival')%100)<56; // narrative variation, not a researched participation rate
 return s;
}
O.ensureLifeCulture=ensure;
O.create=function(settings){
 const s=oldMake(settings);
 const c=PROFILE[s.country.code];
 s.familyContext={fertility:num(c.fertility2024,null),modelFertility:num(c.fertility2024,FALLBACK_FERTILITY[s.country.region]||2.3),tradition:c.name,note:'2024 national total fertility is NOT the number of siblings in an individual family.'};
 s.flags.familyTradition=c.name;
 s.flags.observesTradition=O.chance(s,.56); // illustrative family-specific variation, not national prevalence
 // Household money separate from long-term assets, keeping expensive items inaccessible.
 s.familyCash=Math.max(10,Math.round(s.familyIncome*(s.strata<=1?.07:s.strata<=3?.16:.24)*(0.6+O.rand(s)*.9)));
 const parents=s.people.filter(p=>['Mother','Father'].includes(p.role));
 const locale=(O.LOCAL_STORIES||{})[s.country.code];
 const work=(locale?.jobs||[]).map(x=>typeof x==='string'?x:x.title).filter(Boolean);
 const regionJob=(O.REGION_SECTORS||{})[s.country.region]||[];
 for(const p of parents){if(work.length&&O.chance(s,.70))p.job=O.pick(s,work);else if(regionJob.length)p.job=O.pick(s,regionJob);}
 // Existing siblings at birth: national fertility is used as a weak directional prior only.
 const target=Math.min(6,Math.max(0,Math.round((s.familyContext.modelFertility-1)*.47+O.int(s,-1,1))));
 while(s.people.filter(p=>p.role==='Sibling').length<target){const g=O.chance(s,.49)?'F':'M';s.people.push(O.person(s,'Sibling',O.int(s,1,11),g,s.name.split(' ').at(-1)));}
 s.birthDescription+=` ${s.flags.observesTradition?`Your household sometimes marks ${c.name}.`:`${c.name} is observed by some people around you, though your household does not usually celebrate it.`} Customs vary by community and family. The budget must stretch across ${s.people.filter(p=>['Sibling','Mother','Father','Grandparent'].includes(p.role)).length+1} people.`;
 O.journal(s,'Family and local life',`You grow up among ${names(s)}. ${s.flags.observesTradition?`Your family sometimes joins ${c.name}, shaped by its own beliefs, time and budget.`:`You see or hear about ${c.name}, even though your family doesn't normally observe it.`} What feels ordinary to one household may be unfamiliar to another.`, 'family');
 s.spendingYear=s.age;s.spendingOffers=makeOffers(s);s.spendHistory=[];return s;
};
O.ensureTimeline=function(s){oldEnsure(s);ensure(s);return s};
function childAccessibleBudget(s){
 if(s.age<13) return Math.max(8,Math.round(totalCost(s,0.0025 + s.age*0.00035,8)));
 if(s.age<18) return Math.max(20,Math.round(totalCost(s,0.006 + (s.age-13)*0.0012,20)));
 return num(s.cash,0);
}
function cashPool(s){return s.age<12?0:s.age<18?num(s.youthCash,0):num(s.cash,0)}
function totalCost(s,factor,floor=4){return Math.max(floor,Math.round(s.country.ppp*factor));}
function catalog(s){
 const adult=s.age>=18,independent=s.age>=16,young=s.age<13;
 const p=s.country.ppp||8000, region=s.country.region;
 const offer=(id,title,detail,fac,bucket,delta={},tag='Everyday life')=>({id,title,detail,cost:totalCost(s,fac),bucket,delta,tag});
 const cheap=(id,title,detail,fac,delta={},tag='Everyday life')=>offer(id,title,detail,fac,adult?'personal':'household',delta,tag);
 const items=[
 cheap('social','A meal or afternoon with loved ones',`Spend time with ${names(s)} or neighbours.`,.003,{happiness:3,relationships:3},'Relationships'),
 cheap('fest',s.flags.observesTradition?'Contribute to '+traditional(s):'Join a local community outing',s.flags.observesTradition?`Food, visits or small gifts connected to ${traditional(s)}. Participation varies by household.`:`A voluntary outing to a public event or with neighbours near ${traditional(s)}. You needn't share the observance.`,.008,{happiness:4,relationships:3},'Community'),
 cheap('supplies',young?'School supplies and books':'Books and learning materials','Support a subject or skill that interests you.',.007,{knowledge:4,confidence:1},'Learning'),
 cheap('medicine','Clinic visit and preventive care','Travel, consultation or preventive care where accessible. This is not a guarantee of access.',.013,{health:5,stress:-2},'Health'),
 cheap('sport','Sports, music or craft materials',`Explore ${s.flags.personalThread||'a hobby'} with suitable equipment or lessons.`,.018,{happiness:4,knowledge:2},'Interests'),
 cheap('transport','Improved transport for the year',`Reduce some travel strain in ${s.urban?'your town or city':'your rural area'}.`,.027,{stress:-4,knowledge:1},'Mobility'),
 cheap('familycare','Help with a family expense','Pay toward childcare, care for elders, or shared household needs.',.023,{relationships:5,stress:-1},'Family'),
 cheap('repairs','Repair or improve the home','Address leaks, heating, overcrowding or damaged essentials, where resources permit.',.049,{health:2,stress:-3},'Housing'),
 cheap('skills','Training course or exam preparation','Spend resources on opportunities, not a guaranteed qualification.',.054,{knowledge:7,confidence:2},'Learning'),
 cheap('trip','A regional trip to visit loved ones','Travel and accommodation may be limited by distance, documents and finances.',.069,{happiness:5,relationships:3},'Travel'),
 cheap('equipment','Equipment for work or a small enterprise','Tools or supplies could help an existing skill or enterprise.',.079,{knowledge:2,confidence:4},'Work'),
 cheap('appliance','Practical household appliance or device','Reduce recurring time costs for some family tasks.',.039,{happiness:2,stress:-2},'Home'),
 cheap('vehicle','A used vehicle or long-distance transport option','Travel and upkeep create continuing expenses; not feasible in all places.',.31,{stress:-3,confidence:2},'Mobility'),
 cheap('holiday','A holiday outside your region','A discretionary luxury unavailable to many households.',.17,{happiness:7},'Travel'),
 cheap('invest','Put funds into savings or investments','Building savings can protect against shocks; returns are uncertain.',.042,{confidence:1},'Money')
 ];
 // Stage gating reflects the *nature* of spending, rather than generic universal purchases.
 let ids=young?['social','fest','supplies','medicine','sport','transport','familycare']:
 s.age<18?['social','fest','supplies','medicine','sport','transport','skills','familycare','trip']:
 ['social','fest','medicine','sport','transport','familycare','repairs','skills','trip','equipment','appliance','vehicle','holiday','invest'];
 if(s.age>68)ids=ids.filter(id=>id!=='skills'||s.knowledge<70);
 if(s.strata<3)ids=ids.filter(id=>!['holiday','vehicle'].includes(id));
 if(s.strata>=6)ids.push('holiday');
 if(!s.school&&s.age<16)ids=ids.filter(id=>id!=='supplies');
 if(!s.income&&adult)ids=ids.filter(id=>id!=='equipment');
 if(region==='Pacific Islands'||region==='Oceania')ids=ids.filter(id=>id!=='vehicle'||s.urban);
 // Stable reproducible annual rotation using life seed + age; never re-roll on opening menu.
 const order=ids.slice().sort((a,b)=>hash(s.seed+'|'+s.age+'|'+a)-hash(s.seed+'|'+s.age+'|'+b));
 const essential=ids.includes('fest')?['fest','medicine']:['medicine','social'];
 const chosen=new Set([...essential,...order.slice(0,s.strata>=5?8:6)]);
 return items.filter(item=>chosen.has(item.id));
}
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0}
function makeOffers(s){
 if(s.age<12)return [];
 if(s.age<18){
   const permitted=new Set(['social','fest','supplies','sport','transport','trip']);
   const offers=catalog(s).filter(o=>permitted.has(o.id));
   const free=[{id:'free-social',title:'Spend time with a friend or family member',detail:'A walk or conversation that does not require spending money.',tag:'Relationships',bucket:'pocket',delta:{relationships:2,happiness:1},cost:0,year:s.birthYear+s.age},
    {id:'free-curiosity',title:'Explore an interest with what you have',detail:'Practise a skill, talk with someone experienced or read materials already available.',tag:'Learning',bucket:'pocket',delta:{knowledge:2,happiness:1},cost:0,year:s.birthYear+s.age}];
   return [...free,...offers.map(o=>({...o,bucket:'pocket',cost:Math.max(1,Math.round(o.cost*.10)),year:s.birthYear+s.age}))];
 }
 return catalog(s).map(o=>({...o,year:s.birthYear+s.age}));
}
O.spendFunds=cashPool;
O.spendOffers=function(s){ensure(s);return s.spendingOffers};
O.buy=function(s,id){ensure(s);if(s.status!=='alive')return {ok:false,message:'This life has ended.'};if(s.age<12)return {ok:false,message:'At this age, parents and guardians handle spending decisions.'};
 const offer=s.spendingOffers.find(o=>o.id===id);if(!offer)return {ok:false,message:'This item is not offered this year.'};
 if(s.flags.spendYearUsed[s.age]?.includes(id))return {ok:false,message:'Already purchased this year.'};
 if(cashPool(s)<offer.cost)return {ok:false,message:'Insufficient '+(s.age<18?'pocket money':'personal cash')+'.'};
 if(s.age<18)s.youthCash=Math.max(0,(s.youthCash||0)-offer.cost);else s.cash=Math.max(0,s.cash-offer.cost);
 O.adjust(s,offer.delta);if(id==='invest'&&s.age>=18)s.investments=(s.investments||0)+Math.round(offer.cost*.93);
 if(!s.flags.spendYearUsed[s.age])s.flags.spendYearUsed[s.age]=[];s.flags.spendYearUsed[s.age].push(id);
 s.spendHistory.unshift({age:s.age,year:s.birthYear+s.age,id,title:offer.title,cost:offer.cost,from:s.age<18?'Allowance':'Personal'});
 O.journal(s,s.age<18?'Your activity: '+offer.title:'Spend: '+offer.title,s.age<18?(offer.cost===0?`You make time for ${offer.title.toLowerCase()}. No money changes hands. ${offer.detail}`:`You use ${O.money(offer.cost)} of your small allowance on ${offer.title.toLowerCase()}. ${offer.detail}`):`You spend ${O.money(offer.cost)} (illustrative international purchasing-power units) on ${offer.title.toLowerCase()}. ${offer.detail}`,'money');
 return {ok:true,message:offer.title+' recorded.'};
};
O.registerAnnualStage('culture',s=>{

 return ()=>{
 if(s.age<=20){
  ensure(s);
  const deps=1+s.people.filter(p=>p.role==='Sibling'&&p.alive).length;
  const householdCost=Math.min(.97,.68+.035*deps+(s.urban?.055:.015)-(s.strata>=5?.10:0));
  const change=Math.round(s.familyIncome*(1-householdCost));
  s.familyCash=Math.max(0,s.familyCash+change);
  s.familyAssets=Math.max(0,s.familyAssets+Math.round(change*.22));
  if(s.age>=2&&s.age<=12&&s.people.filter(p=>p.role==='Sibling').length<6&&s.people.find(p=>p.role==='Mother'&&p.alive&&p.age<46)&&O.chance(s,Math.max(.01,Math.min(.20,(s.familyContext.modelFertility-1)*.05)))){
    const g=O.chance(s,.5)?'F':'M';const child=O.person(s,'Sibling',0,g,s.name.split(' ').at(-1));s.people.push(child);O.journal(s,'A new sibling',`Your family welcomes ${O.personLabel(child)}. The new arrival changes household finances and responsibilities.`,'family');
  }
 }
 if(s.status==='alive')ensure(s);
 };
});
O.pickStories=function(s,n){
 let results=oldStories(s,n);
 if(n<1||s.age<4||!PROFILE[s.country.code])return results;
 // At most one cultural life detail in a year, with variable outcomes and no mandatory participation.
 if(O.chance(s,s.age<16?.56:.45)){
   const home=names(s),c=PROFILE[s.country.code],struggling=s.flags.foodInsecure||s.strata<=1;
   const budget=struggling?`This year ${home} discuss whether small festive expenses can fit into a tight budget.`:s.strata>=6?'Your household can afford travel and gatherings that others might not.':'The family considers travel, food and work schedules.';
   const candidates=[
     {title:s.flags.observesTradition?`Preparing for ${c.name}`:`Seeing ${c.name} around you`,description:`In ${s.country.name}, you notice ${c.name}: ${c.detail.toLowerCase()}. ${s.flags.observesTradition?`${budget} Your household considers whether and how to join.`:'Your family does not typically observe it, though some neighbours do.'}`,scene:'home',effect:'culture-'+s.country.code},
     {title:`Neighbours and ${c.name}`,description:`A neighbour talks about ${c.name}. Different families observe it differently, or not at all. The conversation reminds you how varied life can be within ${s.country.name}.`,scene:'city',effect:'culture-'+s.country.code},
   ];
   results[O.int(s,0,results.length-1)]=O.pick(s,candidates);
 }
 return results;
};
O.worldFactHTML=function(s,esc){
 const rec=PROFILE[s.country.code]; if(!rec)return '';
 const fertile=rec.fertility2024;
 const text=`<div class="panel-label">${esc(s.country.name)} · Indicative 2024-era snapshot</div><div class="fact-bubble"><strong>Community and culture</strong><p>${esc(rec.name)} — ${esc(rec.detail)}. A local example, not something every family observes.</p><p class="tiny">Examples of intangible cultural heritage: <a target="_blank" rel="noopener noreferrer" href="https://ich.unesco.org/en/lists">UNESCO heritage lists ↗</a></p></div>`;
 const stat=Number.isFinite(fertile)?`<div class="fact-bubble"><strong>ⓘ Indicative fertility, about ${fertile.toFixed(1)} births per woman (2024-era)</strong><p class="tiny">Rounded country-level estimate, referencing World Bank series SP.DYN.TFRT.IN; the exact 2024 value has not been individually audited. This is a population rate, not the size of your character’s actual family or a personal probability. <a target="_blank" rel="noopener noreferrer" href="https://data.worldbank.org/indicator/SP.DYN.TFRT.IN?locations=${encodeURIComponent(s.country.code)}">Data ↗</a></p></div>`:'';
 return text+stat+`<p class="tiny muted">This game uses a frozen reference period. Income, spending, family decisions and many life risks are illustrative game mechanics—not verified national expenditure or demographic distributions. No background statistics requests are made.</p>`;
};

// Fixed population indicators are contextual notes tied to a relevant life event;
// they are never stand-alone odds for this particular fictional character.
O.contextForDecision=function(s,e){
 if(!s||!e)return null;
 const title=typeof e.title==='function'?e.title(s):String(e.title||'');
 const key=[e.id||'',e.category||'',title].join(' ').toLowerCase();
 const data=O.countryEvidence?.(s);
 if(s.age<=5&&/vaccin|immuni[sz]|infant|early.health|childhood.health/.test(key)&&Number.isFinite(data?.under5))
  return {text:`In ${s.country.name}, the reference under-five mortality estimate was ${Number(data.under5).toFixed(1)} deaths per 1,000 live births. That population rate does not determine whether this child is vaccinated or becomes ill.`,source:'UNICEF/UN IGME (under-five mortality)',url:data.under5Source||'https://data.worldbank.org/indicator/SH.DYN.MORT'};
 if(s.age>=14&&/marriage|marry|family planning|partner.*future|child marriage/.test(key)){
  const f=O.COUNTRY_CONTEXT?.[s.country.code]?.facts?.[0];
  if(f&&/married|marriage|union/.test(f.text||''))return f;
 }
 const profile=PROFILE[s.country.code];
 if(profile&&/festival|celebrat|tradition|holiday|community gathering|spend.*fest/.test(key))
  return {text:`${profile.name} is one example of a cultural occasion in ${s.country.name}. Customs differ across communities and households, and some people do not observe it.`,source:'Cultural background',url:'https://ich.unesco.org/en/lists'};
 if(/new sibling|another child|family size|sibling arrives|birth in the family/.test(key)&&Number.isFinite(profile?.fertility2024))
  return {text:`The approximate 2024-era fertility figure recorded for ${s.country.name} is approximately ${profile.fertility2024.toFixed(1)} births per woman. It is not this household's expected number of children.`,source:'World Bank SP.DYN.TFRT.IN (2024)',url:`https://data.worldbank.org/indicator/SP.DYN.TFRT.IN?locations=${encodeURIComponent(s.country.code)}`};
 return null;
};
O.contextForJournal=function(s,entry){
 if(!entry)return null;
 const txt=`${entry.title||''} ${entry.description||''}`.toLowerCase();
 const profile=PROFILE[s.country.code];
 if(entry.age===0&&/family and local life|a beginning/.test(txt)&&Number.isFinite(profile?.fertility2024))
  return {text:`The approximate 2024-era fertility figure for ${s.country.name} was approximately ${profile.fertility2024.toFixed(1)} births per woman. This population statistic does not determine this household's family size.`,source:'World Bank SP.DYN.TFRT.IN (2024)',url:`https://data.worldbank.org/indicator/SP.DYN.TFRT.IN?locations=${encodeURIComponent(s.country.code)}`};
 if(profile&&(txt.includes(profile.name.toLowerCase()))&&/prepar|neighbour|festival|celebrat|tradition|gathering|new year|community|family and local life/.test(txt))
   return {text:`${profile.name} is a locally relevant occasion, but traditions and participation vary between families. The household's resources affect what they can afford.`,source:'Cultural background (UNESCO index)',url:'https://ich.unesco.org/en/lists'};
 if((/new sibling|family welcomes|birth in the family/.test(txt))&&Number.isFinite(profile?.fertility2024))
   return {text:`The approximate 2024-era fertility figure for ${s.country.name} was approximately ${profile.fertility2024.toFixed(1)} births per woman. This describes a population, not this household.`,source:'World Bank SP.DYN.TFRT.IN (2024)',url:`https://data.worldbank.org/indicator/SP.DYN.TFRT.IN?locations=${encodeURIComponent(s.country.code)}`};
 const data=O.countryEvidence?.(s);
 if(entry.age<=5&&/vaccin|immuni[sz]|infant|childhood (illness|health)/.test(txt)&&Number.isFinite(data?.under5))
   return {text:`Population context: ${Number(data.under5).toFixed(1)} deaths before age five per 1,000 live births in ${s.country.name}; this is not the chance of the fictional event just described.`,source:'UNICEF/UN IGME',url:data.under5Source||'https://data.worldbank.org/indicator/SH.DYN.MORT'};
 return null;
};

// One optional country-specific decision per life; opportunity and cost are not asserted population rates.
for(const [code,profile] of Object.entries(PROFILE)){
 O.EVENTS.push({
  id:'culture-choice-'+code, min:12,max:42,category:profile.name+' · Community',scene:'city',weight:5,
  when:s=>s.country.code===code&&s.age>=12&&!s.flags.localCelebrationChoice,
  title:s=>s.flags.observesTradition?'An invitation around '+profile.name:'A neighbour invites you to '+profile.name,
  description:s=>`${profile.detail}. In ${s.country.name}, people in the community observe this occasion in different ways. ${s.flags.observesTradition?'Your household has joined in before.':'Your household does not normally observe it.'} You have to balance your own interest, family preferences, available time and your money.`,
  options:s=>[
   {label:s.flags.observesTradition?'Join a family gathering':'Visit a public celebration',detail:'Spend time with others. You can join respectfully without assuming everyone takes part.',apply:st=>{st.flags.localCelebrationChoice='join';O.adjust(st,{happiness:3,relationships:4});return `You take part in a ${profile.name} gathering in a way that fits your circumstances. You remember the conversations more than the spectacle.`}},
   {label:s.age<18?'Help prepare something with your family':'Contribute to food, transport or a small gift',detail:s.age<18?'Help with a small task; the adults decide whether to spend money.':'Only affordable when your personal cash covers the expense.',apply:st=>{st.flags.localCelebrationChoice='contribute';if(st.age<18){O.adjust(st,{relationships:3,happiness:2});return `You help prepare for ${profile.name} in an age-appropriate way. Your caregivers handle any money involved.`;}const cost=Math.max(4,Math.round(st.country.ppp*.006));const avail=st.age<18?st.familyCash:st.cash;if(avail<cost){O.adjust(st,{stress:1});return `You wanted to contribute to ${profile.name}, but the extra cost would put pressure on essential spending. You decide not to borrow.`}if(st.age<18){const guardian=(st.people||[]).find(p=>p.alive&&['Mother','Father'].includes(p.role));st.familyCash-=cost;return `${guardian?O.logLabel?.(guardian)||'A caregiver':'A caregiver'} arranges the contribution from household funds. You helped by preparing or carrying something; no money was under your control.`;}else st.cash-=cost;O.adjust(st,{relationships:4,happiness:2,stress:-1});return `You contribute ${O.money(cost)} in illustrative purchasing-power units to the gathering. You still need to manage the remaining budget.`}},
   {label:'Keep your time and money for other priorities',detail:'A reasonable choice; it may mean missing this particular social occasion.',apply:st=>{st.flags.localCelebrationChoice='decline';O.adjust(st,{stress:-1,confidence:1});return `You choose not to attend ${profile.name} this time. Others around you continue their celebrations, and your own priorities remain valid.`}},
  ]
 });
}

O.VERSION='5.3.0';

/* v5.3: household culture is experienced through ordinary life, not only festivals. */
const FOOD_TEXTURES={"GH": ["waakye", "banku", "rice and stew"], "NG": ["jollof rice", "egusi soup", "yam and stew"], "ET": ["injera", "shiro", "bread and tea"], "KE": ["ugali", "sukuma wiki", "chapati"], "UG": ["matoke", "posho", "groundnut stew"], "TZ": ["ugali", "pilau", "beans and rice"], "RW": ["ibihaza", "beans and plantain", "isombe"], "ZA": ["pap", "chakalaka", "samp and beans"], "ZW": ["sadza", "vegetable relish", "peanut stew"], "SN": ["ceebu jën", "yassa", "thiakry"], "CI": ["attiéké", "alloco", "rice and sauce"], "MA": ["tagine", "couscous", "harira"], "TN": ["brik", "couscous", "ojja"], "EG": ["koshari", "ful medames", "baladi bread"], "DZ": ["couscous", "chorba", "flatbread"], "BD": ["dal and rice", "bhorta", "pitha"], "IN": ["dal and rice", "roti and sabzi", "idli"], "PK": ["roti and dal", "biryani", "chana"], "LK": ["rice and curry", "hoppers", "kiribath"], "NP": ["dal bhat", "momo", "sel roti"], "AF": ["bolani", "rice and stew", "mantoo"], "BT": ["ema datshi", "red rice", "momo"], "IR": ["tahdig", "ghormeh sabzi", "ash reshteh"], "TR": ["mercimek çorbası", "simit", "menemen"], "LB": ["manakish", "tabbouleh", "lentil soup"], "JO": ["mansaf", "maqluba", "falafel"], "SA": ["kabsa", "dates and coffee", "jareesh"], "AE": ["machboos", "luqaimat", "harees"], "HK": ["congee", "wonton noodles", "pineapple bun"], "CN": ["noodle soup", "congee", "dumplings"], "TW": ["beef noodle soup", "lu rou fan", "scallion pancake"], "JP": ["onigiri", "miso soup", "rice and grilled fish"], "KR": ["kimchi jjigae", "bibimbap", "gimbap"], "TH": ["khao pad", "som tam", "noodle soup"], "VN": ["phở", "cơm tấm", "bánh mì"], "MY": ["nasi lemak", "roti canai", "laksa"], "SG": ["chicken rice", "kaya toast", "laksa"], "ID": ["nasi goreng", "gado-gado", "soto ayam"], "PH": ["adobo", "sinigang", "pandesal"], "KH": ["fish amok", "rice porridge", "nom banh chok"], "LA": ["sticky rice", "larb", "noodle soup"], "MM": ["mohinga", "shan noodles", "tea-leaf salad"], "GB": ["beans on toast", "a roast dinner", "fish and chips"], "IE": ["soda bread", "stew", "porridge"], "FR": ["baguette and cheese", "pot-au-feu", "crêpes"], "DE": ["bread rolls", "potato soup", "pretzels"], "IT": ["pasta al pomodoro", "risotto", "minestrone"], "ES": ["tortilla española", "lentil stew", "pan con tomate"], "PT": ["caldo verde", "bacalhau", "soup and bread"], "PL": ["pierogi", "żurek", "kasza"], "UA": ["borshch", "varenyky", "buckwheat"], "GR": ["spanakopita", "fasolada", "souvlaki"], "NL": ["stamppot", "erwtensoep", "bread with cheese"], "BE": ["stoemp", "waffles", "soup and bread"], "SE": ["meatballs and potatoes", "knäckebröd", "pea soup"], "NO": ["fish soup", "open sandwiches", "lapskaus"], "FI": ["salmon soup", "rye bread", "porridge"], "DK": ["smørrebrød", "frikadeller", "rye bread"], "US": ["sandwiches", "macaroni and cheese", "chili"], "CA": ["poutine", "soup and bread", "butter tarts"], "MX": ["tacos", "tamales", "pozole"], "GT": ["pepian", "tamales", "black beans and tortillas"], "CR": ["gallo pinto", "casado", "olla de carne"], "BR": ["rice and beans", "feijoada", "pão de queijo"], "AR": ["empanadas", "milanesa", "locro"], "CL": ["pastel de choclo", "empanadas", "porotos granados"], "CO": ["arepas", "ajiaco", "sancocho"], "PE": ["lomo saltado", "ají de gallina", "ceviche"], "BO": ["salteñas", "sopa de maní", "pique macho"], "EC": ["encebollado", "llapingachos", "locro de papa"], "VE": ["arepas", "pabellón criollo", "cachapas"], "CU": ["rice and black beans", "ropa vieja", "yuca con mojo"], "JM": ["ackee and saltfish", "rice and peas", "patty"], "DO": ["mangú", "la bandera", "sancocho"], "AU": ["meat pie", "barbecued food", "savoury toast"], "NZ": ["hangi", "meat pie", "fish and chips"], "FJ": ["kokoda", "rourou", "rice and curry"], "WS": ["oka", "taro", "palusami"], "TO": ["lu sipi", "taro", "ota ika"]};
const prevEverydayStories=O.pickStories;
O.pickStories=function(s,n){
 let out=prevEverydayStories(s,n);
 if(!n||s.age<4||s.status!=='alive')return out;
 if(!s.flags.dailyLifeMemory)s.flags.dailyLifeMemory={};
 if(!O.chance(s,s.age<18?.67:.48))return out;
 const foods=FOOD_TEXTURES[s.country.code];
 const who=(s.people||[]).find(p=>p.alive&&['Mother','Father'].includes(p.role));
 const parent=who?(O.logLabel?.(who)||who.role):'someone at home';
 const means=s.flags.foodInsecure||s.strata<=1?'Some ingredients are hard to afford, so the family makes substitutions.':s.strata>=6?'Nobody has to worry much about the price, and that freedom is easy to take for granted.':'The family keeps an eye on prices, travel and everyone’s preferences.';
 const nearby=s.urban?'a neighbourhood shop':'a local market or neighbour';
 let candidate;
 const mode=O.int(s,0,4);
 if(mode===0&&foods){
  const dish=O.pick(s,foods);
  s.flags.dailyLifeMemory.food=dish;
  candidate={title:'The food around you',description:`Around your community, ${dish} is one of many familiar meals or snacks. A meal with ${parent} turns into a conversation about preferences, work and the day ahead. ${means} It is one possibility among the many ways people eat in ${s.country.name}.`,scene:'home',effect:'daily-food'};
 }else if(mode===1&&s.flags.dailyLifeMemory.food&&s.age>12){
  candidate={title:'A familiar taste',description:`A taste or smell reminds you of ${s.flags.dailyLifeMemory.food} and an ordinary meal from childhood. You remember who was at the table, what people talked about and how the household has changed.`,scene:'home',effect:'daily-memory'};
 }else if(mode===2){
  candidate={title:'Small errands, real constraints',description:`An ordinary errand takes you to ${nearby}. What you can buy and how far you travel depend on the household’s money, work commitments and location. ${s.age<16?`${parent} decides what the family can spend.`:'You notice which everyday conveniences are available to you.'}`,scene:'shop',effect:'daily-errand'};
 }else if(mode===3){
  const siblings=(s.people||[]).filter(p=>p.role==='Sibling'&&p.alive).length;
  candidate={title:'A day inside the household',description:`${parent} has responsibilities beyond looking after you. ${siblings?`With ${siblings} sibling${siblings===1?'':'s'}, the adults share time and attention between children.`:'Even a small household has work, meals and errands to organise.'} ${s.strata<=2?'The household has little financial room for surprises.':s.strata>=6?'Paid help or extra resources make some daily tasks easier.':'People negotiate chores, time and work around each other.'}`,scene:'home',effect:'daily-family'};
 }else{
  const loc=O.LOCAL_STORIES?.[s.country.code];const setting=loc?.transport||((s.urban)?'local transport':'paths and roads');
  candidate={title:'Getting around',description:`You see how people nearby travel using ${setting}. ${s.age<13?'An adult generally chooses where and when you can go.':'Time, safety and the cost of a journey influence your plans.'} The exact journey varies by neighbourhood and household.`,scene:'city',effect:'daily-transport'};
 }
 if(!candidate)return out;
 const replacement=O.int(s,0,out.length-1);out[replacement]=candidate;
 return out;
};

})(window.OL);
