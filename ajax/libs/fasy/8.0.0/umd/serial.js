/*! fasy.js
	v8.0.0 (c) 2020 Kyle Simpson
	MIT License: http://getify.mit-license.org
*/

!function UMD(e,t,n,i){"function"==typeof define&&define.amd?(n=Object.keys(n).map((e=>e.replace(/^\.\//,""))),define(e,n,i)):"undefined"!=typeof module&&module.exports?(n=Object.keys(n).map((e=>require(e))),module.exports=i(...n)):(n=Object.values(n).map((e=>t[e])),t[e]=i(...n))}("FA_Serial","undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:new Function("return this")(),{"./concurrent.js":"FA_Concurrent"},(function DEF(e){"use strict";var t=e(1);let n={};return n=t,n.reduce=t.reduce,n.reduceRight=t.reduceRight,n.pipe=t.pipe,n.compose=t.compose,n.filter=t.filter,n.filterIn=t.filterIn,n.filterOut=t.filterOut,n.forEach=t.forEach,n.map=t.map,n.flatMap=t.flatMap,n}));