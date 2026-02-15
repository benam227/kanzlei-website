import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  console.error('React render error:', error)
  document.body.innerHTML = `<pre style="padding:20px;background:#fee;color:#c00;">Error: ${error instanceof Error ? error.message : String(error)}</pre>`
}
