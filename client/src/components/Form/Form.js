import React, { useEffect, useState } from 'react'
import { Paper, Typography, FormControl, TextField, Button } from '@mui/material';
import { customStyles } from './style';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/Posts'

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  console.log(useSelector((state) => state.posts))
  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(post);
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    }
    else {
      dispatch(createPost(postData));
    }
    clear();
  }

  useEffect(() => {
    if (post)
      setPostData(post);
  }, [post])

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });
  return (
    <>
      <Paper sx={customStyles.paper} elevation={3}  >
        <FormControl sx={customStyles.form} autoComplete='off' onSubmit={submitHandler}>
          <Typography sx={{ 'textAlign': 'center' }} variant='h5'>{currentId ? 'Edit your post' : 'Create your post'}</Typography>
          <TextField sx={customStyles.root} variant='outlined' name='creator' label='Creator' value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
          <TextField sx={customStyles.root} variant='outlined' name='title' label='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField sx={customStyles.root} variant='outlined' name='message' label='Message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField sx={customStyles.root} variant='outlined' name='tags' label='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

          <div style={customStyles.fileInput} >
            <FileBase type='file' multiple={false} name="selectedFile" onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}></FileBase>
          </div>
          <Button sx={customStyles.buttonSubmit} type='submit' variant='contained' color='primary' size='large' fullWidth onClick={submitHandler}>Submit</Button>
          <Button variant='contained' onClick={clear} color='secondary' size='small' fullWidth>Clear</Button>

        </FormControl>
      </Paper>
    </>
  )
}

export default Form
