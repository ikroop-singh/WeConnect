import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Typography} from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal'
import styles from './styles';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { updateProfile } from '../../actions/userProfile';
import { useDispatch } from 'react-redux';

const EditProfile = () => {
    const dispatch=useDispatch();
    const userInfo=JSON.parse(localStorage.getItem('profile'));
    const [profileInfo,setProfileInfo]=useState({
        fname:'',
        sname:'',
        email:'',
        location:'',

    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setProfileInfo({
            fname:userInfo?.result?.name.split(' ')[0],
            sname:userInfo?.result?.name.split(' ')[1],
            email:userInfo?.result?.email,
            location:userInfo?.result?.location

        })
        
        setOpen(true);
    }
    const handleUpdate=()=>{
        dispatch(updateProfile(profileInfo))
        setOpen(false);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Box>
            
            <Box  onClick={handleOpen}>                
                <Button sx={styles.editButton} variant='contained' color='primary'>Edit </Button>

            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modalBody}>
                    <Typography variant="h4" textAlign="center" color="primary" sx={{marginBottom:'15px'}}>Edit Profile</Typography>
                    <Grid  container spacing={2} sx={{justifyContent:"center"}}>
                        <Grid item  sm={6}>
                            <TextField value={profileInfo.fname} label="first Name" variant='outlined' size='small' onChange={(e)=>{setProfileInfo({...profileInfo,fname:e.target.value})}}/>
                        </Grid>
                        <Grid item  sm={6}>

                            <TextField value={profileInfo.sname} label="Second Name" variant='outlined' size='small' onChange={(e)=>{setProfileInfo({...profileInfo,sname:e.target.value})}}/>
                        </Grid>
                        <Grid item  sm={6}>

                        <TextField value={profileInfo.email} label="Email" variant='outlined' size='small' onChange={(e)=>{setProfileInfo({...profileInfo,email:e.target.value})}}/>
                        </Grid>
                        <Grid item  sm={6}>

                        <TextField value={profileInfo.location} label="Location" variant='outlined' size='small' onChange={(e)=>{setProfileInfo({...profileInfo,location:e.target.value})}}/>
                        </Grid>
                    </Grid>
                        <Button sx={{marginTop:'10px'}}variant="contained" fullWidth onClick={handleUpdate}>Update</Button>
              </Box>
            </Modal>
        </Box>
    )
}

export default EditProfile
