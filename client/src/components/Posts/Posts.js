import React from 'react'
import Post  from './post/Post'
import {useSelector} from 'react-redux';
import { CircularProgress ,Grid} from '@mui/material';
import styles from './styles'

const Posts = ({setCurrentId}) => {
  const posts=useSelector((state)=>state.posts);
  console.log(posts);
  return (
    
        !posts.length?<CircularProgress/>:
        <Grid sx={styles.mainContainer} container  alignItems='stretch' spacing={2}>
         {
          posts.map((post)=>{
             return <Grid item key={post._id} xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          })
         }

        </Grid>        
  )
}

export default Posts
