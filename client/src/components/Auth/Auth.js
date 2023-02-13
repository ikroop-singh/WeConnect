import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, OutlinedInput } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Input from './Input';
import jwt_decode from "jwt-decode";
import { customStyles } from './styles';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import axios from 'axios';

const Auth = () => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[loading,setLoading] =useState(false);
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

        dispatch(signup({ ...formData, profilePic: image}, navigate,setLoading ));
    }
    //  eslint-disable-next-line
  }, [image.url])

  const initial_state = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    profilePic: ''
  }

  const [formData, setformData] = useState(initial_state);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    if (isSignup) {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", "v-connect");
        formData.append("cloud_name", "dvzjddjbu");
        axios.post("https://api.cloudinary.com/v1_1/dvzjddjbu/image/upload", formData)
          .then((res) => setImage({ ...image, url: res.data.url, imageId: res.data.public_id }))
      }
      else {
        dispatch(signup({ ...formData, profilePic: image }, navigate,setLoading));
      }

    }
    else {
      dispatch(signin(formData, navigate,setLoading));
    }
  }

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
  }

  const googleSuccess = (res) => {
    const token = res.credential;
    const result = jwt_decode(token);
    dispatch({ type: 'AUTH', payload: { result, token } });
    console.log(result);
    navigate('/');
  }

  const googleFailure = (error) => {
    console.log('login faied');
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
    <Container>
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
                  <OutlinedInput sx={{ margin: '15px 0 0 15px' }} type='file' size='small' onChange={(e) => setSelectedImage(e.target.files[0])} />
                </>
              )

            }
          </Grid>
          <LoadingButton   loading={loading} loadingIndicator={isSignup ? 'Hold On...':'Signin in...'} sx={customStyles.submit} type='submit' fullWidth variant='contained' color='primary'>
            {isSignup ? 'Sign up' : 'Sign In'}
          </LoadingButton>
          <div style={customStyles.googleButton}>

            <GoogleLogin
              onSuccess={googleSuccess}
              onError={googleFailure}
            />

          </div>
          <Grid container sx={{ justifyContent: 'center' }}>
            <Grid item>
              <Button size='small' onClick={switchMode}> {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

    </Container>
  )
}

export default Auth;
