import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { worker } from './mocks/browser.ts'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router } from 'react-router-dom';

worker.start()

const root = ReactDOM.createRoot(document.getElementById('root')!)

worker
  .start({
    quiet: true,
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
  .then(() => {
    return root.render(
      <React.StrictMode>
        <RecoilRoot>
            <Router>
                <App />
            </Router>
        </RecoilRoot>
      </React.StrictMode>
    )
  })
