export async function getStaticProps(){return {props:{time:new Date().toISOString()}};}
export default function SSG({time}:{time:string}){return <main><h1>SSG</h1><p>Generated during build: {time}</p><a href="/">Home</a></main>;}
