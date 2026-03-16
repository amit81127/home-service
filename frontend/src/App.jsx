import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Services from './pages/Services/Services'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ProviderSignup from './pages/Signup/ProviderSignup/ProviderSignup'
import CustomerSignup from './pages/Signup/CustomerSignup/CustomerSignup'
import SearchResult from './pages/SearchResult/SearchResult'

function App() {

  return (
    <>  
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Services/:category" element={ <Services/>}/>
      <Route path="/SerchResult/:category" element={ <SearchResult/>}/>
      <Route path="/About" element={ <About/>}/>
      <Route path="/Login" element={ <Login/>}/>
      <Route path="/Signup" element={ <Signup/>}/>
      <Route path="/ProviderSignup" element={ <ProviderSignup/>}/>
      <Route path="/CustomerSignup" element={ <CustomerSignup/>}/>
    </Routes>
    </>
  )
}

export default App
