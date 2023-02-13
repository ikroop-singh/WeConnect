const styles={ 

    paper:{
      margin:'110px auto',
       width:'85%',
       borderRadius:'30px'
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
    position: 'relative',
    bottom: '70px',
    },
    buttons:{
        textAlign:'center',
        bottom: '45px',
        position:'relative',
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
    editButton:{
        marginRight:'95px',
       
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
        marginTop:'10px'
    },
    post:{
       maxWidth:'100%',
       height:'100%',
       borderRadius:'15px'
    }
}

export default styles;