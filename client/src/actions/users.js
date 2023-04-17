import * as api from '../api';

export const fetchUsers=()=>async(dispatch)=>{
    try {
        const {data} = await api.fetchUsers();
        dispatch({type:'FETCH_USERS',payload:data})
        
    } catch (error) {
        console.log(error);
    }
}

export const searchUsers=(search)=>async(dispatch)=>{
    try {
        dispatch({type:'START_LOADING'});
        const {data}=await api.searchUsers(search);
        dispatch({type:'END_LOADING'});
        dispatch({type:'SEARCH_USERS',payload:data});
    } catch (error) {
        console.log(error);
    }
}