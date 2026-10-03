import {createReadStream,createWriteStream} from 'node:fs';import {pipeline} from 'node:stream/promises';
await pipeline(createReadStream(new URL('./sample.txt',import.meta.url)),createWriteStream(new URL('./sample-copy.txt',import.meta.url)));console.log('Copied sample.txt with backpressure-aware pipeline.');
