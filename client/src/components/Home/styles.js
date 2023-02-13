export const customStyles={
    grid_contain:{
        // flexDirection:{xs:'column-reverse', sm:'column-reverse', lg:'row' }
    },
    appBarSearch:{
        display:{xs:'none',md:'none',lg:'block'},
        borderRadius:4,
        marginBottom:'1rem',
        display:'flex',
        padding:'10px'
    },
    pagination:{
        borderRadius:4,
        marginTop:'1rem',
        padding:'16px'
    },
    profilePic:{
        margin:'  auto',
        '@media(max-width:910px)':{
            height:'80px',
             width:'80px', 
          },
        height:'100px',
        width:'100px',
    },
    paper:{
       '@media(max-width:899px)':{
         display:'none',
       },
       
        // display:{xs:'none',md:'none',lg:'block'},
        width:{sm:'98%'},
        padding:"9px 15px 0 15px",
        borderTopLeftRadius: '80px',
        borderTopRightRadius: '80px',
        marginTop:'30px'
    },
    profileInfo:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    followers:{
        paddingTop:' 12px',
        textAlign:'center',
        paddingRight: '43px',
        '@media(max-width:1000px)':{
            paddingRight: '23px',           
          },
    },
    following:{
        paddingTop:'12px',
        textAlign:'center'
    },
    viewButton:{
        marginBottom:'22px',
        marginTop:'22px',
        '@media(max-width:930px) and (min-width:900px)':{
            height: '37px',
            fontSize: '13px',
        },
    },
    profileName:{
        textAlign:'center',
        marginBottom:'10px',
        '@media(max-width:1055px)':{
          marginBottom:'20px'
        },
    },
    addButton:{
        marginBottom:'20px',
    }
}