export const customStyles={
    grid_contain:{
        // flexDirection:{xs:'column-reverse', sm:'column-reverse', lg:'row' }
    },
    container:{
        marginTop:{
            lg:'10.3%',
            md:'11%',
            sm:'15%',
            xs:'27%'
        },
        padding:0
       
    },
   
    profilePic:{
        marginRight:'15px',
        '@media(max-width:1100px)':{
            height:'65px',
             width:'65px', 
          },
        height:'75px',
        width:'75px',
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