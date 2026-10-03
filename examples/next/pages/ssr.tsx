export async function getServerSideProps(){return {props:{time:new Date().toISOString()}};}
export default function SSR({time}:{time:string}){return <main><h1>SSR</h1><p>Generated for this request: {time}</p><a href="/">Home</a></main>;}
