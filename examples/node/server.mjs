import {createServer} from 'node:http';
import {pathToFileURL} from 'node:url';
export const users=[{id:1,name:'Aarav',role:'Frontend'},{id:2,name:'Diya',role:'Backend'},{id:3,name:'Kri',role:'Frontend'},{id:4,name:'Maya',role:'Designer'},{id:5,name:'Rishi',role:'Backend'},{id:6,name:'Noor',role:'Frontend'}];
export function createApp(){return createServer((request,response)=>{
 const url=new URL(request.url,'http://localhost');
 const send=(status,body)=>{response.writeHead(status,{'Content-Type':'application/json'});response.end(JSON.stringify(body));};
 if(request.method!=='GET')return send(405,{error:'Method not allowed'});
 if(url.pathname==='/api/health')return send(200,{ok:true});
 if(url.pathname!=='/api/users')return send(404,{error:'Not found'});
 const page=Number(url.searchParams.get('page')||1),size=Number(url.searchParams.get('size')||3);
 if(!Number.isInteger(page)||page<1||!Number.isInteger(size)||size<1||size>100)return send(400,{error:'page must be positive; size must be 1–100'});
 const query=(url.searchParams.get('q')||'').toLowerCase();
 const filtered=users.filter(u=>(u.name+' '+u.role).toLowerCase().includes(query));
 send(200,{items:filtered.slice((page-1)*size,page*size),total:filtered.length,page,size});
});}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const port=Number(process.env.PORT||3001);const server=createApp();server.listen(port,'127.0.0.1',()=>console.log(`Node practice API: http://localhost:${port}/api/users?q=frontend&page=1&size=2`));
 const shutdown=()=>server.close(()=>process.exit(0));process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
}
