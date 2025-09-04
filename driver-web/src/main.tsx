import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { DriverTypeProvider } from './context/DriverTypeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DriverTypeProvider>
        <App />
      </DriverTypeProvider>
    </BrowserRouter>
  </StrictMode>,
)
