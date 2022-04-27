import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'virtual:windi.css'
import 'semantic-ui-css/semantic.min.css'
import { Router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router />
)
