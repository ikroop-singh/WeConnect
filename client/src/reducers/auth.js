const authReducer = (state ={ authData:null }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile',JSON.stringify({...action.payload}));
            localStorage.setItem('token',action.payload.token);
            return {...state,authData:action.payload};
        case 'LOGOUT':
             localStorage.clear();
             return {...state,authData:null};
        case 'UPDATE':
            localStorage.setItem('profile',JSON.stringify({...action.payload}));


        default:
            return state;
    }
}
export default authReducer;