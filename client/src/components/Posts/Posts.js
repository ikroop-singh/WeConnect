import React from 'react'
import Post  from './post/Post'
import {useSelector} from 'react-redux';
import { CircularProgress ,Container} from '@mui/material';
import styles from './styles'

const Posts = ({setCurrentId}) => {
  
  const posts=useSelector((state)=>state.posts);
  console.log(posts);

  return (
    
        posts.length===0?<CircularProgress sx={styles.loading}/>
        :
        <Container sx={styles.mainContainer}>

         {
           posts.map((post)=>{
             return <div key={post._id} >
              <Post post={post} setCurrentId={setCurrentId}/>
            </div>
          })
        }

        </Container>
  )
}

export default Posts
