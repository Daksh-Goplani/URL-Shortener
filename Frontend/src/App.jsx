import { Outlet } from "@tanstack/react-router"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
