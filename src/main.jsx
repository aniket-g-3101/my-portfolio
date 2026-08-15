import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ─── PRIORITY 1: FIX SCROLL RESTORATION ───────────────────────
// Disable browser's native scroll restoration so every page load
// always starts at the very top — regardless of previous position.
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  // Force scroll to top immediately — before React renders anything
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
