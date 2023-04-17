const styles={
    container:{
        '@media(max-width:965px)':{
            display:'none',
          },
        borderRadius:'15px',
        padding:'12px',
        height:'298px',
        overflow:'auto'
    },
    suggested:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:'13px',
    },
   
    username:{
        marginLeft:'6px',
        textDecoration:'none',
        color:'black'
    },

    user:{
        display:'flex',
        alignItems:'center'
    },

    btn:{
        height:'25px',
        width:'25px',
    }
}

export default styles;