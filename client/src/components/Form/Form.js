import React, { useEffect, useState } from 'react'
import { Paper, Typography, TextField, Button, Container } from '@mui/material';
import { customStyles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/Posts'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = ({ currentId, setCurrentId }) => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  
  const user = JSON.parse(localStorage.getItem('profile'));
  const [image,setImage]=useState({
    url:'',
    imageId:'',
  });
  const [selectedImage,setSelectedImage]= useState('');

  const [postData, setPostData] = useState({
    title: '',
    tags:[] ,
    
  });
  
  useEffect(() => {
    if (post)
    setPostData(post);

    if(image.url)
    {
      if(!currentId){

        dispatch(createPost({ ...postData, name: user.result.name ,image}));
        
        navigate('/');
      }

        }
        // eslint-disable-next-line
  }, [post,image.url])
  
  
  const addPost = async(e) => {
    e.preventDefault();
    //for uploading image in cloudinary
    const formData=new FormData();
    formData.append("file",selectedImage);
    formData.append("upload_preset","v-connect");
    formData.append("cloud_name","dvzjddjbu");
     axios.post("https://api.cloudinary.com/v1_1/dvzjddjbu/image/upload",formData)
     .then((res)=>setImage({...image,url:res.data.url,imageId:res.data.public_id})).catch((err)=>console.log(err))    
    
  };
  const editPost=()=>{ 
      dispatch(updatePost(currentId, { ...postData, name: user.result.name }));
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

      <Paper sx={customStyles.paper} elevation={6}  >
        <form style={customStyles.form} autoComplete='off' >
          <Typography required sx={{ 'textAlign': 'center' }} variant='h5'>{currentId ? 'Edit your post' : 'Create your post'}</Typography>
          <TextField  sx={customStyles.root} variant='outlined' name='title' label='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField sx={customStyles.root} variant='outlined' name='tags' label='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

           
          <div style={customStyles.fileInput} >
               <label htmlFor="imgFile">Select image :</label>
               <input required type="file" id="imgFile" name='imageUrl' onChange={(e)=>setSelectedImage(e.target.files[0])}/>
          </div>
          <Button sx={customStyles.buttonSubmit}  variant='contained' color='primary' size='large' fullWidth onClick={currentId?editPost:addPost}>Submit</Button>
          <Button variant='contained' onClick={clear} color='secondary' size='small' fullWidth>Clear</Button>

        </form>
      </Paper>
    </Container>
  )
}

export default Form
