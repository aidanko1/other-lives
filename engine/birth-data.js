/* Frozen birthplace weights; counts are facts, not predictions for an individual life. */
(function(O){'use strict';
 const version='birth-counts-2024-v1';
 const records={
  HK:{year:2024,count:36723,unit:'live births',basis:'Known live births in Hong Kong; male 19231 plus female 17492.',source:'Hong Kong Department of Health, Birth Statistics, 1981–2024; updated 2026-02-10',url:'https://www.dh.gov.hk/datagovhk/ncdd/Number%20of%20Known%20Births%20for%20Different%20Sexes%20and%20Crude%20Birth%20Rate%201981-2024(en).csv'},
  US:{year:2024,count:3628934,unit:'live births',basis:'Final US resident live-birth total; excludes territories and foreign residents.',source:'CDC/NCHS, Data Brief 535, July 2025, Table 1',url:'https://www.cdc.gov/nchs/products/databriefs/db535.htm'}
 };
 for(const r of Object.values(records))Object.freeze(r);
 O.BIRTH_DATA=Object.freeze({version,referenceYear:2024,retrieved:'2026-10-21',records:Object.freeze(records),fallback:'Existing illustrative country weights, unchanged outside HK/US.'});
 // Existing sampler uses millions of annual births. Apply only at catalogue setup;
 // saved countries and existing comparison histories never pass through this boundary.
 for(const c of O.COUNTRIES){const r=records[c.code];if(!r)continue;c.births=r.count/1000000;c.birthsEvidence=Object.freeze({version,year:r.year,source:r.source,url:r.url,basis:r.basis});}
})(window.OL);
