import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, TextField, InputAdornment, IconButton, Box } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import deleteIcon from '@mui/icons-material/DeleteIcon';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment'
import styles from './styles'
import { useDispatch } from 'react-redux';
import { deletePost, likePost, commentPost, deleteComment } from '../../../actions/Posts';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, MenuItem, Avatar } from '@mui/material';


const Post = ({ post, setCurrentId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [comment, setComment] = useState('');
  const [openComment, setOpenComment] = useState(false);
  const [commentAnchor, setCommentAnchor] = useState(null);

  const handleEdit = () => {
    setCurrentId(post._id);
    navigate('/addPost');
    setOpen(false);
  }

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    console.log();
    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const clickHandler = (e) => {

    setAnchorEl(e.currentTarget)
    setOpen(true);
  }

  const handleCommentAction = (e) => {
    setCommentAnchor(e.currentTarget);
    setOpenComment(true);
  }

  const submitHandler = () => {
    dispatch(commentPost(post._id, comment));
    setComment('');
  }

  const handleKeyPress = (e) => {
    if (e.charCode === 13)
      submitHandler();
  }

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
        ? (
          <><ThumbUpAltIcon sx={{ display: 'block' }} /> &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        )
        : (
          <><ThumbUpAltOutlinedIcon /> &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        )
    }
    return <><ThumbUpAltOutlinedIcon />&nbsp;Like</>
  }


  return (
    <Card sx={styles.card} elevation={5}>
      <div style={styles.head}>
        <Avatar sx={styles.userProfile} src={post.creator.profilePic.url} />
        <Typography sx={styles.userName} variant='h6' component={Link} to={'/profile/' + post.creator._id}>{post.name}</Typography>
        <Typography sx={styles.timeStamp} variant='caption'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <CardMedia sx={styles.media} image={post.image.url} component='div' />
      <div style={styles.overlay2}>
        {
          (user?.result?._id === post.creator._id || user?.result?.sub === post.creator) &&
          (
            <>
              <Button onClick={clickHandler} >
                <MoreVertIcon />
              </Button>
              <Menu open={open} anchorEl={anchorEl} onClose={handleClose} >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </>
          )
        }
      </div>

      <CardActions sx={styles.cardActions}>
        <Button size='small' disabled={!user?.result} color='primary' onClick={() => { dispatch(likePost(post._id)) }}>
          <Likes />
        </Button>
        <div>
          <Button>
            <ShareIcon color='primary' />
          </Button>
        </div>
      </CardActions>

      <CardContent sx={styles.cardContent}>
        <Typography variant='h6' color='textSecondary'>{
          post.tags.length === 0 ? '' : (post.tags.map((tags) => `#${tags} `))
        }

        </Typography>
        <Typography variant='h6' gutterBottom>{post.title}</Typography>



        {
          post.comments.map((result) => {

            return <div style={{ display: 'flex', marginBottom: '8px' }} key={result._id}>
              <div style={styles.commentProfile}>
                <Avatar src={result.postedBy.profilePic.url} component={Link} to={'/profile/' + result.postedBy._id} sx={{ height: '30px', width: '30px' }} />
              </div>
              <div style={styles.commentsContent}>
                <div style={{ display: 'flex' }}>

                  <Typography component={Link} to={'/profile/' + result.postedBy._id} sx={styles.postedBy}  > {result.postedBy.name}</Typography>
                  {
                    (user?.result?._id === result.postedBy._id) &&
                    (
                      <>
                        <MoreVertIcon onClick={handleCommentAction} color='primary' sx={styles.commentsAction} />
                        <Menu open={openComment} onClose={() => { setOpenComment(false) }} anchorEl={commentAnchor}>
                          <MenuItem onClick={() => { dispatch(deleteComment(post._id, result._id)); setCommentAnchor(false) }}>
                            Delete
                          </MenuItem>
                        </Menu>
                      </>
                    )
                  }
                </div>
                <Typography>{result.text}</Typography>
              </div>
            </div>

          })
        }
      </CardContent>
      <div>
        <TextField fullWidth onChange={(e) => { setComment(e.target.value) }} value={comment} onKeyPress={handleKeyPress} size='small' variant="filled" label='Comment'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disabled={!comment.length > 0} onClick={submitHandler}>
                  <SendIcon fontSize='small' color='primary' />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

      </div>
    </Card>
  )
}

export default Post
