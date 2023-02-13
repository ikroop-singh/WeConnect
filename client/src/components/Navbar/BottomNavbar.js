import React,{useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import {BottomNavigationAction}from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HomeIcon from '@mui/icons-material/Home';
import {Avatar} from '@mui/material';
import { Paper } from '@mui/material';
import {customStyles} from './styles';
import { useNavigate,Link } from 'react-router-dom';

const BottomNavbar = () => {
    const navigate = useNavigate();
    const [value,setValue]=useState('posts');
    const user=JSON.parse(localStorage.getItem('profile'));
    return (
        <>
        <Paper elevation={3}>

            <BottomNavigation sx={customStyles.bottomNav}  value={value} onChange={(e,newValue)=>{setValue(newValue)}}>
                <BottomNavigationAction
                 onClick={()=>navigate('/')}
                 value="posts"
                 label='Posts'
                 icon={<HomeIcon/>}
                />
                <BottomNavigationAction
                    onClick={()=>navigate('/addPost')}
                    label='add'
                    value='add'
                    icon={<AddBoxIcon/>}
                />
                <BottomNavigationAction
                   label='profile'
                   value='profile'
                   icon={<Avatar src={user?.result?.profilePic.url}/>}
                   component={Link} to={'/profile/'+user?.result?._id}
                />
                

            </BottomNavigation>
        </Paper>
        </>
    )
}

export default BottomNavbar;
