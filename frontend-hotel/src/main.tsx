import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { HotelProvider } from './contexts/HotelContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <HotelProvider>
        <App />
      </HotelProvider>
    </AuthProvider>
  </StrictMode>,
)
