const users=(users={loading:'false',users:[],searchResults:[]},action)=>{
   switch (action.type) {
    case  'FETCH_USERS':
            return {...users,users:action.payload};  

    case 'START_LOADING': return {...users,loading:'true'}
    case 'END_LOADING': return {...users,loading:'false'} 
    
    case 'SEARCH_USERS':
                        return{...users,searchResults:action.payload}
    case 'CLEAR_SEARCH':
        return{...users,searchResults:[]}
   
    default:
        return users;
   }
}
export default users;