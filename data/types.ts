export type Track = 'JavaScript'|'React'|'Next.js'|'Node.js'|'Tools'|'Coding Lab';
export interface Lesson {id:string;track:Track;title:string;theory:string;analogy:string;answer:string;code:string;starter:string;pitfall:string;visual:string;runtime:'javascript'|'react'|'node'|'reference';level:string;group:string}
