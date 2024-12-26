import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals'
import { store } from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/flashcard-gen">
        {/* This tells React Router that the app is being served from a subdirectory. */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
