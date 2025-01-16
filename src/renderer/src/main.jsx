import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NavElements from './Components/Navbar/Navbar.jsx'
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import MainContent from './Components/MainContent.jsx'
import FooterContent from './Components/Footer/FooterContent.jsx'

console.log('Page loading started')




createRoot(document.getElementById("root")).render(
  <>
    <Sidebar />
    <MainContent />
  </>
)

//console.log('almost')
//window.elec.sayHello("Hello")

console.log('Page loading finished')
