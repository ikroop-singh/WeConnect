import React, { useEffect, useState, useRef ,useLocation} from 'react'
import { Paper, Typography, TextField, Button, Container } from '@mui/material';
import { customStyles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/Posts'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '../miscellaneous/Alert'


const Form = ({ currentId, setCurrentId }) => {
  console.log(process.env.REACT_APP_CLOUD_URL);
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

  const user = JSON.parse(localStorage.getItem('profile'));
  const [image, setImage] = useState({
    url: '',
    imageId: '',
  });
  const [selectedImage, setSelectedImage] = useState('');

  const [postData, setPostData] = useState({
    title: '',
    tags: [],

  });

  useEffect(() => {
    if (post)
      setPostData(post);

    if (image.url) {
      if (!currentId) {

        dispatch(createPost({ ...postData, name: user.result.name, image }, setLoading));

        navigate('/');
      }

    }
    // eslint-disable-next-line
  }, [post, image.url])


  const addPost = async (e) => {
    if (selectedImage) {

      if (selectedImage.type === 'image/jpeg' || selectedImage.type === 'image/png') {

        e.preventDefault();
        setLoading(true);
        //for uploading image in cloudinary
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", "v-connect");
        formData.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);
        axios.post(`${process.env.REACT_APP_CLOUD_URL}`, formData)
          .then((res) => setImage({ ...image, url: res.data.url, imageId: res.data.public_id })).catch((err) => console.log(err))
      }

      else {
        setLoading(false);
        dispatch({ type: 'SET_ALERT', payload: { msg: 'Choose appropriate file', severity: 'error', open: true } });
      }


    }
    else {
      dispatch({ type: 'SET_ALERT', payload: { msg: 'Choose photo to post', severity: 'error', open: true } });

    }

  };
  const editPost = () => {
    dispatch(updatePost(currentId, { ...postData, name: user.result.name }, setLoading));
    navigate('/');
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      tags: '',
      imageUrl: ''
    })
  }


  if (!user?.result?.name) {
    return (
      <Paper sx={customStyles.paper}>
        <Typography variant='h6'>
          please signin to create your post and like others post
        </Typography>
      </Paper>
    );
  }

  return (
    <Container sx={customStyles.container}>
      <Alert />
      <Paper sx={customStyles.paper} elevation={5}  >
        <form style={customStyles.form} autoComplete='off' >
          <Typography required color='primary'sx={{ 'textAlign': 'center' }} variant='h5'>{currentId ? 'Edit your post' : 'Create your post'}</Typography>
          <TextField sx={customStyles.root} variant='outlined' name='title' label='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField sx={customStyles.root} variant='outlined' name='tags' label='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />


          <div style={customStyles.fileInput} >
            <input ref={ref} required style={{ display: 'none' }} type="file" id="imgFile" name='imageUrl' onChange={(e) => setSelectedImage(e.target.files[0])} />
            {
              !currentId ? 
                <>
              <Button sx={customStyles.addPhoto}  variant='contained' color='secondary' onClick={() => ref.current.click()}>choose photo</Button>
                </>            
                :
                <>
                </>
            }
          </div>
          <LoadingButton loading={loading} loadingIndicator={currentId ? 'Updating...' : 'Posting...'} sx={customStyles.buttonSubmit} variant='contained' color='primary' size='large' fullWidth onClick={currentId ? editPost : addPost}>{currentId ? 'Update post' : 'Post'}</LoadingButton>
          <Button variant='outlined' onClick={clear} color='primary' size='small' fullWidth>Clear</Button>
    
        </form>
      </Paper>
    </Container>
  )
}

export default Form
