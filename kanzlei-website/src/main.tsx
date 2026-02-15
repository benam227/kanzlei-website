import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'

console.log('main.tsx: Starting render')

const rootElement = document.getElementById('root')
if (!rootElement) {
  document.body.innerHTML = '<div style="padding:20px;color:red;">Root element #root not found!</div>'
  throw new Error('Root element not found')
}

console.log('main.tsx: Creating React root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

console.log('main.tsx: Render called')
