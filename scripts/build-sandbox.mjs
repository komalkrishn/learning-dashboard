import {build} from 'esbuild';
await build({entryPoints:['sandbox/runtime.ts'],outfile:'public/sandbox-runtime.js',bundle:true,minify:true,format:'iife',platform:'browser',define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof'});
