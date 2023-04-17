import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {useSelector,useDispatch} from 'react-redux';

const ShowAlert = () => {
    const dispatch=useDispatch();
    const data=useSelector((state)=>state.alert);
    console.log(data);
    const handleClose=()=>{
        dispatch({type:'CLOSE_ALERT'})
    }
    console.log(data.open)
    return (
        <Snackbar open={data.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={data.severity} sx={{ width: '100%' }}>
            {data.msg}
        </Alert>
      </Snackbar>
    )
}

export default ShowAlert;
