import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
const scope=globalThis as any;
scope.practiceModules={'react':React,'react-dom':ReactDOM,'react-dom/client':{createRoot}};
scope.practiceRender=(Component:any)=>createRoot(document.getElementById('root')!).render(React.createElement(Component));
