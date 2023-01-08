import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import styles from './styles'
import { useDispatch } from 'react-redux';
import { deletePost ,likePost} from '../../../actions/Posts'

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  return (
    <Card sx={styles.card}>
      <CardMedia sx={styles.media} image={post.selectedFile} component='div' />
      <div style={styles.overlay}>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body-2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div style={styles.overlay2}>
        <Button size='small'
          onClick={() => { setCurrentId(post._id) }}>

          <MoreHorizon />
        </Button>
      </div>
      <div style={styles.details}>
        <Typography variant='body-2' color='textSecondary'>{post.tags.map((tags) => `#${tags} `)}</Typography>
      </div>
      <Typography sx={styles.title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant='body-2'color='textSecondary' gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions sx={styles.cardActions}>
        <Button size='small' color='primary' onClick={() => { dispatch(likePost(post._id))}}>
          <ThumbUpIcon fontSize='small' />
          &nbsp; Likes &nbsp;{post.likeCount}
        </Button>
        <Button size='small' color='primary' onClick={() => { dispatch(deletePost(post._id)) }}>
          <DeleteIcon>Delete</DeleteIcon>
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post
