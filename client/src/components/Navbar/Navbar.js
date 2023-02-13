import React,{useState,useEffect} from 'react'
import { Typography, AppBar, Toolbar, Button, Container } from '@mui/material';
import weconnect from '../../image/weconnect.jpg';
import { customStyles } from './styles';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation ,useNavigate} from 'react-router-dom';

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
        // const token = user?.token;
        // if(token){
        //     const decodedData= decode(token);
        //     if(decodedData.exp*10000 < new Date().getTime)
        //         logout();
        // }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
        <Container>

        <AppBar sx={customStyles.appBar} position='static' color="inherit">
            <div style={customStyles.container}>
                <Typography component={Link} to='/' sx={customStyles.heading} variant="h3" align="center">WeConnect</Typography>
                <img src={weconnect} alt="weConnect" height="30" width='30' style={customStyles.image} />
            </div>
            <Toolbar sx={customStyles.toolbar}>
                {
                user ?  <Button variant='contained'onClick={logout} color='warning'>Logout</Button>
                    :
                  (
                    <Button component={Link} to='/auth' variant='contained' color='secondary'>Sign in</Button>
                   )
                }
                
            </Toolbar>
        </AppBar>
        </Container>
    )
}

export default Navbar