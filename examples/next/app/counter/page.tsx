'use client';
import {useState} from 'react';
export default function Counter(){const [n,setN]=useState(0);return <main><h1>Client component</h1><button onClick={()=>setN(n+1)}>Count {n}</button></main>;}
