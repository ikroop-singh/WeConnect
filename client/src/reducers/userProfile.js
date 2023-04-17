 const  users=(user=[],action)=>{
      switch(action.type){
          case 'FETCH_USER':
                  return action.payload;  
           case 'UPDATE':
              localStorage.setItem('profile',JSON.stringify({...action.payload}));
              break;
        default:
            return user;
      }
 }

export default users;