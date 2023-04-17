const styles={
    search:{
       display:{
        xs:'none',
        sm:'flex',
        md:'flex',
       }
    },
    box:{
        display:'flex',
        justifyContent:'space-between',
        background:'white',
        color:'black',
        padding:'5px 10px 5px 10px',
        alignItems:'center',
        marginRight:'33px',
        '@media(max-width:480px)':{
            marginRight:'5px',

        }
    },
   
}

export default styles;