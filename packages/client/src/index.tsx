import * as PIXI from 'pixi.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { MoralisProvider } from "react-moralis";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.ROUND_PIXELS = true;


ReactDOM.render(

 
<MoralisProvider serverUrl="https://rwgwx9hiqxrk.usemoralis.com:2053/server" appId="WFSObvNMPDdDtV2YYNJYGomLt9blGauXjoCw8eZp">
    <App />
  </MoralisProvider>

,
document.getElementById('root')


);
