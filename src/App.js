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
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Profile/Profile';
import Board from './Pages/Board/Board';
import Helper from './HelperFuncs/HelperFuncs';


function App() {

  const [user, setUser] = useState('');

  //Used to change the color of nav bar link based in the page the user is accessing
  const [page, setPage] = useState("home");

  useEffect(()=>{
    //If there is a token available get the user.
    setUser(userService.getUser())
  },[])

  return (
    <div className="App">
      <Navbar page={page} setPage={setPage} user={user} setUser={setUser} logout={userService.logout}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp setPage={setPage} setUser={setUser}/>} />
        <Route path='/login' element={<LogIn setPage={setPage} setUser={setUser}/>} />
        <Route path='/pricing' element={<Pricing setPage={setPage} />} />
        <Route path='/dashboard' element={(user && <Dashboard setUser={setUser} user={user} setPage={setPage} />) || <Home />} />
        <Route path='/profile' element={(user && <Profile setPage={setPage} user={user} />) || <Home />} />
        <Route path='/board' element={(user && <Board setPage={setPage} user={user} />) || <Home />} />
        {/* any other route that does not match, route to home */}
        <Route path='/*' element={<Home />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
