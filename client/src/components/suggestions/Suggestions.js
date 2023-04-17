import React, { useEffect } from 'react';
import { Button, Paper, Avatar, Typography, Box } from '@mui/material';
import { fetchUsers } from '../../actions/users';
import { followUser,unfollowUser } from '../../actions/userProfile';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import styles from './styles';

const Suggestions = () => {
  const localUser=JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  let users = useSelector((state) => state.users.users);  
  users=users.filter((user)=>user._id !== localUser?.result?._id);
  useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line
  },);


  return (
    <>
      <Paper elevation={5} sx={styles.container}>
        <Typography sx={styles.text} variant='h6' color='red'>Suggestions for you</Typography>
        {
          users.map((user) => {           
            return <Box sx={styles.suggested} key={user._id}>
              <Box sx={styles.user}>
                <Avatar src={user.profilePic.url} component={Link} to={`/profile/${user._id}`}/>
                <Typography variant='h7' sx={styles.username} component={Link} to={`/profile/${user._id}`}>{user.name}</Typography>
              </Box>
              {
                user.followers.find((id)=>id===localUser?.result?._id)?
                (
                  <>
                  <Button sx={styles.btn} size='small' onClick={()=>dispatch(unfollowUser(user._id))} >Unfollow</Button>
                  
                  </>
                )
                :(
                  <Button sx={styles.btn} size='small' onClick={()=>dispatch(followUser(user._id))}>Follow</Button>                
                )
              }
            </Box>
          })
        }

      </Paper>
    </>
  )
}

export default Suggestions;
