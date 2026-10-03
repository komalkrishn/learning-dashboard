import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {transform} from '@babel/standalone';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {renderToString} from 'react-dom/server';
const lessons=JSON.parse(fs.readFileSync('data/lessons.json','utf8'));
assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length);
let js=0,react=0;
for(const l of lessons){
 for(const field of ['title','theory','answer','code','pitfall'])assert.ok(l[field],`${l.id} missing ${field}`);
 if(!['javascript','react'].includes(l.runtime))continue;
 const code=transform(l.code,{filename:'practice.tsx',presets:[['typescript',{allExtensions:true,isTSX:true}],['react',{runtime:'classic'}]],plugins:['transform-modules-commonjs']}).code;
 const pending=new Set();const errors=[];const context={exports:{},console:{log(){},info(){},warn(){},error(e){errors.push(e)}},require:n=>n==='react'?React:ReactDOM,React,structuredClone,EventTarget,Event,URL,AbortController,performance,TextEncoder,setTimeout:(fn,ms)=>{const id=setTimeout(()=>{pending.delete(id);fn();},ms);pending.add(id);return id;},clearTimeout:id=>{clearTimeout(id);pending.delete(id);}};
 vm.createContext(context);
 try{await new vm.Script(`(async()=>{${code}\n})()`).runInContext(context,{timeout:1500});if(l.runtime==='react'){renderToString(React.createElement(context.exports.default));react++;}else{await new Promise(r=>setTimeout(r,300));js++;}assert.equal(errors.length,0,`${l.title}: ${errors}`);}catch(e){console.error('FAIL',l.title,e);process.exitCode=1;}
 for(const id of pending)clearTimeout(id);
}
console.log(`Validated ${lessons.length} records; executed ${js} JavaScript solutions; compiled/rendered ${react} React solutions.`);
