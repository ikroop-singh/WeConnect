import React, { useEffect, useState } from 'react';
import { Button, Paper, Avatar, Typography, Box } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { customStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SideProfile = ({setCurrentId}) => {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[user?.result]);

    return (
        <>
            <Paper sx={customStyles.paper} elevation={5}>
                <Box sx={customStyles.profileHead}>
                    <Avatar sx={customStyles.profilePic} src={user?.result?.profilePic?.url} />
                    <Box>
                        <Typography sx={customStyles.userName} variant='h5'>{user?.result?.name}</Typography>
                        <LocationOnOutlinedIcon sx={customStyles.location} fontSize='small' />
                        <Typography variant='body-2'>{user?.result?.location}</Typography>
                    </Box>
                </Box>
                <Box sx={customStyles.profileInfo}>
                    <Box sx={customStyles.followers}>
                        <Typography variant='h6'>{user?.result?.followers.length}</Typography>
                        <Typography variant='h7'>Followers</Typography>

                    </Box>
                    <Box sx={customStyles.following}>
                        <Typography variant='h6'>{user?.result?.following.length}</Typography>
                        <Typography variant='h7'>Following</Typography>
                    </Box>
                </Box>
                <Button sx={customStyles.viewButton} component={Link} to={'/profile/' + user?.result?._id} fullWidth variant='outlined'>View Your Profile</Button>
                <Button onClick={() => { setCurrentId(null);navigate('/addPost') }} sx={customStyles.addButton} fullWidth variant='contained'>
                    <AddBoxIcon />
                    Create Post
                </Button>
            </Paper>
        </>
    )
}

export default SideProfile
