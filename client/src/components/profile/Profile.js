import React, { useEffect } from 'react';
import { Paper, Avatar, Typography, Button, Box, Grid } from '@mui/material';
import styles from './styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, followUser, unfollowUser } from '../../actions/userProfile';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import EditProfile from '../editProfile/EditProfile';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
   const user = JSON.parse(localStorage.getItem('profile'));
   const navigate=useNavigate();
   useEffect(() => {
      if (!user?.result) {
          navigate('/auth');
      }
  });
   // const ref=useRef();
   
   
   const { id } = useParams();
   const localUser = JSON.parse(localStorage.getItem('profile'));
   const dispatch = useDispatch();
   const userInfo = useSelector((state) => state.userProfile);


   useEffect(() => {
      dispatch(fetchUser(id));
   });
   return (
      userInfo.length === 0 ? <CircularProgress  sx={{height: '50px',width:'50%',position: 'absolute' ,left:' 50%', top: '50%', transform: 'translate(50%, 50%)'}}/> 
      :
      <>
            <Paper sx={styles.paper} elevation={5}>
               <Avatar sx={styles.profilePic} src={userInfo.user.profilePic.url} />
               {/* {
                  localUser?.result?._id === userInfo.user._id &&
                  (
                     <Box sx={styles.editProfile} onClick={()=>{ref.current.click()}}>
                     <ModeEditOutlineIcon fontSize="small" color="primary" sx={{ paddingRight: '7px' }} />
                     <Typography color="primary" sx={{ fontSize: '12px' }}>change pic</Typography>
                     <input style={{display:'none'}} type='file' ref={ref} onChange={handleChange}></input>
                     </Box>
                     )
                     
                  } */}
               <Box sx={styles.profileHead}>
                  <Box sx={styles.profileName}>
                     <Typography align='center' variant='h4' sx={styles.text}>{userInfo.user.name}</Typography>
                     <LocationOnOutlinedIcon sx={styles.location} fontSize='small' />
                     <Typography variant='body-2'>{userInfo.user.location}</Typography>
                  </Box>
                  <Typography align='center' variant='body-2'>{userInfo.user.email}</Typography>
               </Box>
               <div style={styles.buttons}>
                  {
                     localUser?.result?._id === userInfo.user._id ?
                        (
                           <>

                              <EditProfile />
                              <Button sx={styles.shareButton} variant='contained' color='success'>Share </Button>
                           </>
                        )
                        :
                        userInfo.user.followers.find((id) => id === localUser?.result?._id) ?
                           (
                              <>
                                 <Button sx={styles.followButton} variant='outlined' onClick={() => dispatch(unfollowUser(id))}>unfollow</Button>
                                 <Button sx={styles.messageButton} variant='contained' color='success'>Message</Button>
                              </>
                           )
                           :
                           (
                              <>
                                 <Button sx={styles.followButton} variant='contained' onClick={() => dispatch(followUser(id))}>Follow</Button>
                                 <Button sx={styles.messageButton} variant='contained' color='success'>Message</Button>

                              </>
                           )

                  }
               </div>
               <Box sx={styles.profileInfo}>
                  <div>
                     <Typography variant='h6'>{userInfo.posts.length}</Typography>
                     <Typography sx={styles.text} align='center' variant='h5'>Posts</Typography>
                  </div>
                  <div>
                     <Typography variant='h6'>{userInfo.user.followers.length}</Typography>
                     <Typography sx={styles.text} align='center' variant='h5'>Followers</Typography>
                  </div>
                  <div>
                     <Typography variant='h6'>{userInfo.user.following.length}</Typography>
                     <Typography sx={styles.text} align='center' variant='h5'>Following</Typography>
                  </div>
               </Box>
               <hr style={{ width: '70%' }} />
               <Box sx={styles.posts}>
                  <Grid container spacing={2}>

                     {
                        userInfo.posts.length === 0 ?
                           'No posts yet'
                           :
                           userInfo.posts.map((post) => {

                              return <Grid key={post._id} item md={3} xs={4}>
                                 <img style={styles.post} src={post.image.url} alt="" />
                              </Grid>

                           })
                     }

                  </Grid>
               </Box>
            </Paper>
         </>
   )
}

export default Profile
