import React,{useEffect,useState} from 'react';
import {Container,AppBar,Typography,Grow,Grid} from '@mui/material';
import {getPosts} from './actions/Posts'
import weconnect from './image/weconnect.jpg';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import {customStyles} from './styles';
import {useDispatch} from 'react-redux';

const App = () => {
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(getPosts());   
    });

    const [currentId,setCurrentId]=useState(null);

    return (
        <Container>
            <AppBar sx={customStyles.appBar} position='static' color="inherit">
                   <Typography sx={customStyles.heading} variant="h3"  align="center">WeConnect</Typography>
                   <img  src={weconnect} alt="weConnect" height="30" width='30' style={customStyles.image} />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid >
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid >
                    </Grid>
                </Container>
            </Grow>
            
        </Container>
    );
}


export default App;
