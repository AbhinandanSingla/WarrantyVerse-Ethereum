import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {MetaMaskProvider} from "./hooks/useMetaMask";


ReactDOM.render(
    <React.StrictMode>
        <MetaMaskProvider>
            <App/>
        </MetaMaskProvider>
    </React.StrictMode>,
    document.getElementById('root')
);