export async function getStaticProps(){return {props:{time:new Date().toISOString()},revalidate:15};}
export default function ISR({time}:{time:string}){return <main><h1>ISR</h1><p>Cached generation time: {time}</p><p>After 15 seconds, a request can trigger regeneration. Refresh again to see the new output.</p><a href="/">Home</a></main>;}
