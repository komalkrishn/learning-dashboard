import {EventEmitter} from 'node:events';const bus=new EventEmitter();bus.on('error',console.error);bus.once('order',order=>console.log('Order received:',order));bus.emit('order',{id:42,total:99});
