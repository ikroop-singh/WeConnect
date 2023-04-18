import React, { useEffect } from 'react';
import { Container, Grow, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../../actions/Posts'
import { customStyles } from './styles';
import { useDispatch } from 'react-redux';
import Posts from '../Posts/Posts';
import SideProfile from '../sideProfile/SideProfile';
import Suggestions from '../suggestions/Suggestions';

const Home = ({ setCurrentId }) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        dispatch(getPosts());
        if (!user?.result) {
            navigate('/auth');
        }
    });

    return (
        <Grow in>
            <Container maxWidth='xl' sx={customStyles.container}>
                <Grid container justifyContent='space-between' alignItems='stretch' sx={customStyles.grid_contain} spacing={3}>
                    <Grid item xs={9} md={3} >
                        <SideProfile setCurrentId={setCurrentId}/>
                    </Grid >

                    <Grid sx={{paddingLeft:"0px"}}item xs={12} md={6}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid >

                    <Grid item xs={12} md={3}>
                        <Suggestions />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
