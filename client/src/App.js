import React ,{useState} from 'react';
import {Container} from '@mui/material';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';
import BottomNavbar from './components/Navbar/BottomNavbar';
import Profile from './components/profile/Profile';
import VisibleNav from './components/Navbar/VisibleNav';

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
  

const App = () => {
    const localUser=localStorage.getItem('token');
    const [currentId, setCurrentId] = useState(null);
    return (
        <Container maxWidth='xl' sx={{overflowX:'hidden'}}>     
            <BrowserRouter>
                <Routes>
                    <Route element={<VisibleNav/>}>
                        <Route exact path='/' element={<Navigate to='/posts'/>} />
                        <Route exact path='/posts' element={<Home setCurrentId={setCurrentId}/>} />
                        <Route exact path='/addpost' element={<Form currentId={currentId} setCurrentId={setCurrentId}/>} />
                        <Route exact path='/posts/search' element={<Home/>} />
                        <Route exact path='/profile/:id' element={ <Profile/> }  />
                    </Route>
                    

                  <Route exact path='/auth' element={ <Auth/> }  />

                </Routes>
                {
                    localUser ?
                    (
                        <>
                        <BottomNavbar setCurrentId={setCurrentId}/>
                        </>
                    )
                        :
                        <>
                        </>
                }

                
            </BrowserRouter>
        </Container>
    );
}


export default App;
