import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {MetaMaskProvider} from "./hooks/useMetaMask";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MetaMaskProvider>
            <App/>
        </MetaMaskProvider>
    </React.StrictMode>
);
