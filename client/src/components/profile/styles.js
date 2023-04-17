const styles={ 

    paper:{
      margin:'210px auto',
       width:{md:'85%',sm:'92%',xs:'95%'},
       borderRadius:'30px',

    },
    profilePic:{
        margin: 'auto',
        position: 'relative',
        bottom: '85px',
        height:{md:'190px' ,sm:'180px', xs:'130px'},
        width:{md:'190px',sm:'180px',xs:'130px'},
    },
    text:{
        fontSize:{
            xs:'19px',
            md:'22px',
            sm:'21px'
        }
    },
    profileName:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    profileHead:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        position:'relative',
        bottom:'70px',

    },
    
    location:{
        marginLeft:'5px'
    },
    editProfile:{

        position: 'relative',
        bottom: '124px', 
        left: {lg:'58%',md:'65%',sm:'65%',xs:'68%'}, 
        display: 'flex', 
        alignItems: 'center', 
        cursor: 'pointer' ,
    },
    
    buttons:{
        textAlign:'center',
        bottom: '45px',
        position:'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    followButton:{
        width:{
            md:'14%',
            sm:'25%',
            xs:'37%'
        },
        marginRight:'95px',
        '@media(max-width:445px)':{
            marginRight:'32px'
        }
    },
   
    profileInfo:{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
        bottom: '20px',
        width: {md:'40%' ,sm:'70%' ,xs:'100%'},
        margin:'auto',
        textAlign:'center',
        
        

    },
    posts:{
        padding:'20px',
        marginTop:'15px'
    },
    post:{
       maxWidth:'100%',
       height:'100%',
       borderRadius:'15px'
    }
}

export default styles;