import React,{useState,useEffect} from 'react'
import { Typography, AppBar, Toolbar, Button, Container } from '@mui/material';
import weconnect from '../../image/weconnect.png';
import { customStyles } from './styles';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation ,useNavigate} from 'react-router-dom';
import Search from '../search/search'

const Navbar = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));

    const logout=()=>{
        dispatch({type:'LOGOUT'});
        navigate('/auth');
        setUser(null);
    }

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
        <Container maxWidth='xl' sx={customStyles.container} >

        <AppBar sx={customStyles.appBar} component='nav' position='static' color="inherit">
            <div style={customStyles.appbarInfo}>
                <img src={weconnect} alt="weConnect" height="30" width='30' style={customStyles.image} />
                <Typography component={Link} to='/' sx={customStyles.heading} variant="h3" align="center">WeConnect</Typography>
            </div>
            <Toolbar sx={customStyles.toolbar}>
                {
                user ?  <Button variant='contained' sx={customStyles.button} size='small' onClick={logout} color='warning'>Logout</Button>
                    :
                  (
                    <Button component={Link} to='/auth' size='small' variant='contained' color='secondary'>Sign in</Button>
                   )
                }
           <Search/>

                
            </Toolbar>
        </AppBar>
        </Container>
    )
}

export default Navbar