export const customStyles = {
    appBar: {

        borderRadius: 4,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        padding:'10px 50px'
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration:'none'
    },
    image: {
        marginLeft: '15px',
    },
    container:{
        display:'flex',
        alignItems:'center',
    },
    toolbar:{
        width:'400px',
        display:'flex',
        flexDirection:'row-reverse'
    },
    profile:{
        display:'flex',
        justifyContent:'space-between',
        width:'400px',
    },
    avatar:{
        color:'#3c41e5',
        backgroundColor:"#bee5e0",
    },
    bottomNav:{
        width:'100%',
        position:'fixed',
        bottom:0,
        justifyContent: 'space-around',
        '@media(min-width:899px)':{
            display:'none'
        }
    }
    
}


