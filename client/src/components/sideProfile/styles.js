export const customStyles={
   
    profilePic:{
        marginRight:'15px',
        '@media(max-width:1100px)':{
            height:'65px',
             width:'65px', 
          },
        height:'75px',
        width:'75px',
    },
    paper:{
       '@media(max-width:965px)':{
         display:'none',
       },
       
        // display:{xs:'none',md:'none',lg:'block'},
        width:{sm:'98%' , md:'90%'},
        padding:"9px 15px 0 15px",
        borderRadius: '15px',
    },
    profileInfo:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    profileHead:{
        display:'flex',
        alignItems:'center'
    },
    userName:{
        textAlign:'center',
        '@media(max-width:1164px)':{
          fontSize:'20px'
        },
    },
    location:{
        position:'relative',
        top:'4px'
    },

    followers:{
        paddingTop:' 12px',
        textAlign:'center',
        paddingRight: '43px',
        '@media(max-width:1012px)':{
            paddingRight: '20px',           
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
    addButton:{
        marginBottom:'20px',
    }
}