import React ,{useState} from 'react';
import {Container} from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';
import BottomNavbar from './components/Navbar/BottomNavbar';
import Profile from './components/profile/Profile';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
  

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    
    return (
        <Container >     
            <BrowserRouter>
            <Navbar/>
                <Routes>
                  <Route exact path='/' element={<Navigate to='/posts'/>} />
                  <Route exact path='/posts' element={<Home setCurrentId={setCurrentId}/>} />
                  <Route exact path='/addpost' element={<Form currentId={currentId} setCurrentId={setCurrentId}/>} />
                  <Route exact path='/posts/search' element={<Home/>} />
                  <Route exact path='/auth' element={ <Auth/> }  />
                  <Route exact path='/profile/:id' element={ <Profile/> }  />
                </Routes>
            <BottomNavbar/>
            </BrowserRouter>
        </Container>
    );
}


export default App;
