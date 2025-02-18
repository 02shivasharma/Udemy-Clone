import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/auth-context'
import InstructorProvider from './context/instructor-context'
import { StudenetProvider } from './context/student-context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <InstructorProvider>
      <StudenetProvider>
       <App />
      </StudenetProvider>
      </InstructorProvider>
    </AuthProvider>
  </StrictMode>,
)
