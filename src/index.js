import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './custom.scss';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Header } from './components/Header'
import { Farms } from './pages/Farms'
import { Exchange } from './pages/Exchange'
import { Info } from './pages/Info'
import { Liquidity } from './pages/Liquidity'
import { Nft } from './pages/Nft'
import { Tokens } from './pages/Tokens'
import { Mainnet, DAppProvider } from '@usedapp/core'

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/9758d58be56f435e8e8bd6372deb1d32',
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="liquidity" element={<Liquidity />} />
          <Route path="farms" element={<Farms />} />
          <Route path="tokens" element={<Tokens />} />
          <Route path="nft" element={<Nft />} />
          <Route path="info" element={<Info />} />
        </Routes>
      </Router>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
