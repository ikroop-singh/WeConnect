import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, AppBar, Button, TextField, Paper, Avatar, Typography,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../actions/Posts'
import { customStyles } from './styles';
import { useDispatch } from 'react-redux';
import Posts from '../Posts/Posts';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Link} from 'react-router-dom'


const Home = ({ setCurrentId }) => {
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        dispatch(getPosts());
        if (!user?.result) {
            navigate('/auth');
        }
    });

    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            searchPost();
        }
    }


    const searchPost = () => {
        if (search.trim()) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }



    return (
        <Grow in>
            <Container >
                <Grid container justifyContent='space-between' alignItems='stretch' sx={customStyles.grid_contain} spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Posts setCurrentId={setCurrentId} />

                    </Grid >
                    <Grid item xs={9} md={3}>
                        <AppBar sx={customStyles.appBarSearch} position='static' color='inherit'>
                            <TextField size='small' name='search' variant='outlined' label='search posts' fullWidth
                                value={search} onKeyPress={handleKeyPress} onChange={(e) => { setSearch(e.target.value) }} />

                            <TextField sx={{ marginTop: '10px' }} size='small' variant='outlined' onKeyPress={handleKeyPress} label='Search Tags' fullWidth value={tags} onChange={(e) => { setTags(e.target.value.split(' ')) }} />

                            <Button sx={{ marginTop: '12px' }} onClick={searchPost} color='primary' variant='contained'>Search</Button>
                        </AppBar>

                        <Paper sx={customStyles.paper} elevation={6}>
                            <Avatar sx={customStyles.profilePic} src={user?.result?.profilePic?.url} />

                            <Typography sx={customStyles.profileName} variant='h4'>{user?.result?.name}</Typography>
                            <Box sx={customStyles.profileInfo}>
                                <Box sx={customStyles.followers}>
                                    <Typography  variant='h6'>Followers</Typography>
                                    <Typography variant='h7'>{user?.result?.followers.length}</Typography>

                                </Box>
                                <Box sx={customStyles.following}>
                                    <Typography variant='h6'>Following</Typography>
                                    <Typography variant='h7'>{user?.result?.following.length}</Typography>
                                </Box>
                            </Box>                   
                            <Button sx= {customStyles.viewButton} component={Link} to={'/profile/'+user?.result?._id} fullWidth variant='outlined'>View Your Profile</Button>
                            <Button onClick={()=>{navigate('/addPost')}} sx={customStyles.addButton} fullWidth  variant='contained'>
                                <AddBoxIcon/>
                                Create Post
                            </Button>
                        </Paper>


                    </Grid >
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
