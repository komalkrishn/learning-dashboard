'use client';
import {Moon,Sun} from 'lucide-react';
export default function ThemeToggle({theme,onChange}:{theme:'light'|'dark';onChange:()=>void}){return <button className="theme-toggle" type="button" onClick={onChange} aria-label={theme==='dark'?'Switch to light mode':'Switch to dark mode'} aria-pressed={theme==='dark'}>{theme==='dark'?<Sun size={17}/>:<Moon size={17}/>}<span>{theme==='dark'?'Light mode':'Dark mode'}</span></button>}
