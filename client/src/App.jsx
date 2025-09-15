import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routers/AppRouter"
import { AuthProvider } from "./contextApi/AuthContext"

function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
    <AppRouter/>
    </AuthProvider>
    </BrowserRouter>  
    </>
  )
}

export default App
