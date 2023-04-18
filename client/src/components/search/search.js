import React, { useState } from 'react';
import { Box, Typography, Tooltip, Button, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import {searchUsers} from '../../actions/users';
import styles from './styles';
import UsersList from './UsersList';
import ChatLoading from '../miscellaneous/Loading';

const SideDrawer = () => {
    const searchRes = useSelector((state) =>state.users.searchResults );
    
    const loading = useSelector((state) =>state.users.loading );

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const searchHandler = () => {
        if (search) {
            dispatch(searchUsers(search));
        }
    }

    return (
        <>
            <Box sx={styles.box}>
                <Tooltip title='search' arrow>
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <SearchIcon color='primary'/>
                        <Typography color= 'primary'sx={styles.search} >search</Typography>
                    </IconButton>
                </Tooltip>                
            </Box>
            <Drawer anchor='left' open={drawerOpen} onClose={() => {setDrawerOpen(false);dispatch({type:'CLEAR_SEARCH'})}}>
                <Box sx={{ margin: '15px' }}>
                    <Typography align='center' variant='h6' color='primary'>Search users</Typography>
                    <Box sx={{ display: "flex", marginTop: '8px' }}>
                        <TextField size='small' variant='outlined' label='search' onChange={(e) =>{ setSearch(e.target.value) ; dispatch(searchUsers(search))}} />
                        <Button size='small' onClick={searchHandler}>go</Button>
                    </Box>
                    {
                        loading==='true' ? <ChatLoading/> :
                        searchRes.map(user=>{
                            return <UsersList
                            user={user}
                            key={user._id}
                            setDrawerOpen={setDrawerOpen}
                            />
                        })
                    }
                </Box>
            </Drawer>
        </>
    )
}

export default SideDrawer
