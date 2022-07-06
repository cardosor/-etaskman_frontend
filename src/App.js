import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';

//Services
import * as userService from './Utilities/users-service';

//PAGES
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import SignUp from './Pages/SignUp/SignUp';
import LogIn from './Pages/LogIn/LogIn';
import Pricing from './Pages/Pricing/Pricing';


function App() {

  const [user, setUser] = useState('');

  useEffect(()=>{
    console.log(user)
    setUser(userService.getUser())
    console.log("useEffect")
  },[])

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} logout={userService.logout}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp setUser={setUser}/>} />
        <Route path='/login' element={<LogIn setUser={setUser}/>} />
        <Route path='/pricing' element={<Pricing />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
