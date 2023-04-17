import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Input from './Input';
import { customStyles } from './styles';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import Alert from '../miscellaneous/Alert'
import axios from 'axios';

const Auth = () => {
  const ref = useRef();
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [image, setImage] = useState({
    url: '',
    imageId: ''
  })
  useEffect(() => {
    if (image.url) {
      if (isSignup)
        dispatch(signup({ ...formData, profilePic: image }, navigate, setLoading));
    }
    //  eslint-disable-next-line
  }, [image.url])

  const initial_state = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
    location: ''
  }

  const [formData, setformData] = useState(initial_state);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (isSignup) {
      if (selectedImage) {
        if (selectedImage.type === 'image/jpeg' || selectedImage.type === 'image/png') {

          const formData = new FormData();
          formData.append("file", selectedImage);
          formData.append("upload_preset", "v-connect");
          formData.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);
          axios.post("https://api.cloudinary.com/v1_1/dvzjddjbu/image/upload", formData)
            .then((res) => setImage({ ...image, url: res.data.url, imageId: res.data.public_id }))
        }
        else {
          setLoading(false);
          dispatch({ type:'SET_ALERT',payload:{msg:'Choose appropriate file',severity: 'error', open: true } });
        }
      }
      else {
        dispatch(signup({ ...formData, profilePic: image }, navigate, setLoading));
      }

    }
    else {
      dispatch(signin(formData, navigate, setLoading));
    }
  }

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
  }



  if (user?.result?.name) {
    return (
      <Paper sx={customStyles.paper}>
        <Typography variant='h5'>
          You are already logged in</Typography>
        <Typography component={Link} to='/'>
          goto home page
        </Typography>
      </Paper>
    );
  }


  return (
    <Container sx={{ height: '100vh', overflow: 'hidden' }}>
      <Alert/>
      <Box>
        <Paper sx={customStyles.head}>
          <Typography variant='h3' sx={customStyles.logo}>WeConnect</Typography>
        </Paper>
        <Paper sx={customStyles.paper}>
          <Avatar sx={customStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'> {isSignup ? 'Signup' : 'Signin'} </Typography>
          <form style={customStyles.form} onSubmit={handleSubmit}>
            <Grid justify='flex-end' container spacing={2}>
              {
                isSignup && (
                  <>
                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                  </>
                )
              }

              <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
              <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              {
                isSignup && (
                  <>
                    <Input name='confirmPassword' label='Confirm Password' type="password" handleChange={handleChange} />
                    <Grid container sx={{ alignItems: "flex-end", marginTop: '0px' }} spacing={2}>
                      <Grid item xs={6} >
                        <input ref={ref} style={{ display: 'none' }} type='file' onChange={(e) => { setSelectedImage(e.target.files[0]) }} />
                        <Button sx={customStyles.addPic} variant='contained' size='small' color='secondary' onClick={() => ref.current.click()}>Add photo</Button>

                      </Grid>
                      <Grid item xs={6}>
                        <TextField required size="small" variant="outlined" label="Location" name='location' onChange={handleChange} />
                      </Grid>
                    </Grid>
                  </>
                )

              }
            </Grid>
            <LoadingButton loading={loading} loadingIndicator={isSignup ? 'Hold On...' : 'Signin in...'} sx={customStyles.submit} type='submit' fullWidth variant='contained' color='primary'>
              {isSignup ? 'Sign up' : 'Sign In'}
            </LoadingButton>

            <Grid container sx={{ justifyContent: 'center' }}>
              <Grid item>
                <Button size='small' onClick={switchMode}> {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

    </Container>
  )
}

export default Auth;
