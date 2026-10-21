
/* OTHER LIVES — illustrative demographic configuration.
   Birth weights, opportunity settings, and economic figures are rounded scenario
   parameters, not a complete UN extract. Replace with vetted country/year tables
   before claiming representative worldwide or historical probabilities. */
window.OL = window.OL || {};
OL.VERSION = '2.3.0';
OL.COUNTRIES = [
// code, country, region, annual births proxy (millions), income PPP/person proxy, life expectancy proxy, infrastructure score, schooling access, urbanisation %
['IN','India','South Asia',23.0,11000,72,64,75,37],
['CN','China','East Asia',8.8,26000,79,84,91,66],
['NG','Nigeria','West Africa',7.5,6500,55,42,52,54],
['PK','Pakistan','South Asia',6.8,7000,67,43,57,40],
['ID','Indonesia','Southeast Asia',4.5,16000,72,69,84,58],
['CD','DR Congo','Central Africa',4.3,1800,61,25,44,46],
['ET','Ethiopia','East Africa',4.0,3500,67,32,52,23],
['US','United States','North America',3.6,80000,79,91,96,83],
['BD','Bangladesh','South Asia',3.0,10000,74,54,78,41],
['BR','Brazil','South America',2.6,21000,76,76,89,87],
['EG','Egypt','North Africa',2.4,19000,72,62,73,43],
['PH','Philippines','Southeast Asia',2.2,11500,70,62,85,48],
['MX','Mexico','North America',2.0,24000,75,75,89,82],
['TZ','Tanzania','East Africa',2.1,4000,67,40,54,38],
['UG','Uganda','East Africa',1.7,3300,68,33,50,27],
['KE','Kenya','East Africa',1.5,6200,67,52,67,30],
['AF','Afghanistan','Central Asia',1.5,2200,64,19,34,26],
['IR','Iran','Middle East',1.2,20000,77,72,87,77],
['TR','Türkiye','Middle East',1.0,43000,77,80,88,77],
['VN','Vietnam','Southeast Asia',1.4,16500,75,73,89,40],
['JP','Japan','East Asia',0.7,51000,84,95,99,92],
['GB','United Kingdom','Western Europe',0.65,58000,81,94,98,84],
['DE','Germany','Western Europe',0.7,69000,81,95,99,78],
['FR','France','Western Europe',0.68,62000,83,94,98,82],
['CA','Canada','North America',0.36,62000,82,95,98,82],
['AU','Australia','Oceania',0.3,66000,83,95,98,86],
['KR','South Korea','East Asia',0.25,59000,84,97,99,82],
['HK','Hong Kong','East Asia',0.04,73000,85,96,99,100],
['TW','Taiwan','East Asia',0.13,70000,81,95,98,79],
['TH','Thailand','Southeast Asia',0.48,25000,78,76,90,53],
['MY','Malaysia','Southeast Asia',0.4,39000,76,83,92,78],
['SG','Singapore','Southeast Asia',0.03,135000,84,99,99,100],
['SA','Saudi Arabia','Middle East',0.6,70000,79,86,93,85],
['AE','United Arab Emirates','Middle East',0.1,80000,82,94,97,88],
['ZA','South Africa','Southern Africa',1.0,16000,66,66,78,68],
['RU','Russia','Eastern Europe',1.2,43000,73,82,95,75],
['UA','Ukraine','Eastern Europe',0.25,17000,72,57,94,70],
['PL','Poland','Eastern Europe',0.25,48000,79,90,98,60],
['ES','Spain','Western Europe',0.32,55000,83,93,98,81],
['IT','Italy','Western Europe',0.38,56000,83,93,98,72],
['AR','Argentina','South America',0.47,30000,77,80,94,92],
['CO','Colombia','South America',0.5,23000,77,73,88,82],
['PE','Peru','South America',0.57,17000,77,66,84,79],
['CL','Chile','South America',0.17,31000,81,87,96,88],
['MA','Morocco','North Africa',0.62,10500,75,60,71,64],
['DZ','Algeria','North Africa',0.86,15000,77,62,77,75],
['SD','Sudan','North Africa',1.35,3300,66,24,42,35],
['GH','Ghana','West Africa',0.87,7300,65,51,64,58],
['SN','Senegal','West Africa',0.55,5300,68,47,57,49],
['NE','Niger','West Africa',1.1,1600,62,20,28,17],
['CM','Cameroon','Central Africa',0.9,4500,62,40,56,58],
['RW','Rwanda','East Africa',0.34,3400,69,48,56,18],
['NP','Nepal','South Asia',0.57,5400,71,43,68,22],
['LK','Sri Lanka','South Asia',0.3,15500,77,72,90,19],
['KH','Cambodia','Southeast Asia',0.38,6600,70,53,66,25],
['MM','Myanmar','Southeast Asia',0.85,5000,67,38,63,32],
['NZ','New Zealand','Oceania',0.06,51000,83,94,98,87]
].map(r=>({code:r[0],name:r[1],region:r[2],births:r[3],ppp:r[4],life:r[5],infra:r[6],school:r[7],urban:r[8]}));
OL.POOLS = {
'South Asia':{firstM:['Arjun','Rohan','Rahim','Kabir','Imran','Ayaan','Vikram','Sanjay','Farhan'],firstF:['Asha','Sana','Priya','Amina','Anika','Nusrat','Fatima','Meera'],last:['Khan','Rahman','Sharma','Ahmed','Patel','Hossain','Singh','Das']},
'East Asia':{firstM:['Wei','Jun','Hao','Ming','Jae','Minho','Kenji','Haruto','Takeshi'],firstF:['Mei','Yuna','Hana','Sakura','Yuki','Lin','Jisoo','Ying'],last:['Chen','Li','Wong','Kim','Zhang','Tanaka','Sato','Park','Chan']},
'Southeast Asia':{firstM:['Minh','Arif','Dimas','Somchai','Rizal','Liam','Anh','Somnang'],firstF:['Linh','Siti','Mai','Putri','An','Nisa','Mali','Sophea'],last:['Nguyen','Santoso','Lim','Tran','Wijaya','Santos','Rahman','Lee']},
'West Africa':{firstM:['Tunde','Moussa','Kwame','Ibrahim','Chinedu','Boubacar','Kofi'],firstF:['Amina','Ada','Fanta','Efua','Zainab','Fatou','Ngozi'],last:['Okeke','Diallo','Mensah','Traoré','Bello','Diop','Adeyemi']},
'Central Africa':{firstM:['Serge','Joseph','Jean','Samuel','Patrick','Emmanuel'],firstF:['Marie','Chantal','Grace','Esther','Clarisse','Aline'],last:['Mbuyi','Kabila','Ngoma','Nkomo','Mbala','Kouamé']},
'East Africa':{firstM:['Daniel','Abebe','Samuel','Joseph','Amani','Peter'],firstF:['Hana','Neema','Mariam','Aisha','Zawadi','Grace'],last:['Tesfaye','Mwangi','Okello','Bekele','Kimani','Otieno']},
'North Africa':{firstM:['Omar','Youssef','Ahmed','Hassan','Karim','Sami'],firstF:['Mariam','Leila','Nour','Salma','Fatima','Yasmin'],last:['Hassan','Benali','Mahmoud','El Amrani','Saleh','Farouk']},
'Middle East':{firstM:['Ali','Omar','Emir','Hassan','Yusuf','Amir'],firstF:['Layla','Sara','Noor','Aylin','Maya','Fatima'],last:['Haddad','Demir','Kaya','Al Farsi','Yilmaz','Hussein']},
'Central Asia':{firstM:['Ahmad','Hamid','Omar','Bilal'],firstF:['Amina','Zahra','Laila','Maryam'],last:['Rahimi','Ahmadi','Karimi','Safi']},
'Western Europe':{firstM:['Oliver','James','Luca','Noah','Theo','Alexander','Louis'],firstF:['Amelia','Sophie','Emma','Chloe','Isla','Mia','Charlotte'],last:['Martin','Smith','Wilson','Müller','Dubois','Rossi','Taylor','Brown']},
'Eastern Europe':{firstM:['Ivan','Maksim','Adam','Jakub','Alexei','Andriy'],firstF:['Anna','Katarina','Olena','Maria','Zofia','Nadia'],last:['Kowalski','Ivanov','Petrov','Shevchenko','Novak','Nowak']},
'North America':{firstM:['Ethan','Noah','Liam','Mateo','James','Daniel','Alex'],firstF:['Ava','Olivia','Sophia','Emma','Mia','Isabella'],last:['Johnson','Garcia','Williams','Smith','Martinez','Brown','Lee']},
'South America':{firstM:['Diego','Gabriel','Lucas','Mateo','Thiago','Andrés'],firstF:['Sofia','Isabela','Camila','Lucía','Valentina','Ana'],last:['Silva','González','Pereira','Rodríguez','Rojas','Fernández']},
'Southern Africa':{firstM:['Thabo','Sipho','Daniel','Liam','Sibusiso'],firstF:['Naledi','Zanele','Lerato','Emma','Amahle'],last:['Dlamini','Nkosi','Mokoena','Naidoo','van der Merwe']},
'Oceania':{firstM:['Jack','Oliver','Noah','Liam','Charlie'],firstF:['Mia','Ruby','Charlotte','Isla','Ella'],last:['Smith','Wilson','Taylor','Brown','Walker']}
};
OL.JOBS = [
{title:'Farm worker',tier:0,mult:.43,edu:0}, {title:'Domestic worker',tier:0,mult:.48,edu:0},
{title:'Warehouse assistant',tier:1,mult:.72,edu:0},{title:'Retail worker',tier:1,mult:.75,edu:0},
{title:'Hospitality worker',tier:1,mult:.78,edu:0},{title:'Care worker',tier:1,mult:.84,edu:1},
{title:'Skilled tradesperson',tier:2,mult:1.25,edu:1},{title:'Office administrator',tier:2,mult:1.05,edu:1},
{title:'Technician',tier:2,mult:1.35,edu:2},{title:'Teacher',tier:2,mult:1.42,edu:2},
{title:'Nurse',tier:3,mult:1.48,edu:2},{title:'Engineer',tier:3,mult:2.1,edu:3},
{title:'Software developer',tier:3,mult:2.5,edu:3},{title:'Accountant',tier:3,mult:1.85,edu:3},
{title:'Doctor',tier:4,mult:3.5,edu:3},{title:'Corporate manager',tier:4,mult:3.1,edu:3},
{title:'Business owner',tier:4,mult:3.2,edu:0}, {title:'Senior executive',tier:5,mult:6.2,edu:3}
];
OL.EDU=['No formal qualification','Primary education','Secondary education','Vocational qualification','University degree','Postgraduate qualification'];
OL.CLASS=[{max:8,label:'Severe hardship',desc:'Household resources are extremely limited, with a high risk of income shocks.'},{max:30,label:'Low income',desc:'Meeting essentials requires careful trade-offs and sometimes outside support.'},{max:65,label:'Working / middle income',desc:'Basic needs are usually met, but significant shocks can disrupt financial stability.'},{max:85,label:'Financially comfortable',desc:'A measure of savings and choice protects the household from many everyday risks.'},{max:95,label:'Affluent',desc:'Stable assets and connections open additional educational and career options.'},{max:99,label:'Very wealthy',desc:'Considerable assets and resources provide a strong financial safety net.'},{max:99.9,label:'Top 1% household',desc:'Substantial wealth and influential networks reshape the choices available.'},{max:101,label:'Exceptional wealth',desc:'An unusually wealthy family with access to major capital and extensive networks.'}];
OL.TRAITS=['patient','ambitious','reserved','outspoken','cautious','generous','practical','curious','traditional','adventurous','warm','independent','demanding','resourceful','thoughtful','protective'];
OL.MOODS=['A small ordinary day','A new season','The days between','Something changes','Life moves on'];
OL.educationNumber = (e)=>Math.max(0,OL.EDU.indexOf(e));

