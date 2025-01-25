
import {Routes, Route,Link} from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import './App.css'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<Signup/>} />
    </Routes>
    {/* <Link to='/login'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button></Link>
    <Link to='/sign-up'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign up</button></Link> */}
     

    </>
  )
}

export default App
