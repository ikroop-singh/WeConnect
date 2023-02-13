import React, { useEffect } from 'react';
import { Paper, Avatar, Typography, Button, Box, Grid } from '@mui/material';
import styles from './styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, followUser, unfollowUser } from '../../actions/users';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
   const localUser = JSON.parse(localStorage.getItem('profile'));
   const dispatch = useDispatch();
   const userInfo = useSelector((state) => state.users);

   const { id } = useParams();

   useEffect(() => {
      dispatch(fetchUser(id));
   });

   return (
      userInfo.length === 0 ? <CircularProgress /> :
         <>
            <Paper sx={styles.paper} elevation={5}>
               <Avatar sx={styles.profilePic} src={userInfo.user.profilePic.url} />
               <Typography align='center' sx={styles.profileName} variant='h4'>{userInfo.user.name}</Typography>
               <div style={styles.buttons}>
                  {
                     localUser?.result?._id === userInfo.user._id ?
                        (
                           <>
                              <Button sx={styles.editButton} variant='outlined' color='secondary'>Edit </Button>
                              <Button sx={styles.shareButton} variant='outlined' color='success'>Share </Button>
                           </>
                        )
                        :
                        userInfo.user.followers.find((id)=>id === localUser?.result?._id) ?                           
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
               <Box sx={styles.posts}>
                  <Grid container spacing={2}>
                     {
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
