export const customStyles = {
    appBar: {

        borderRadius: '15px',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingY: '10px',
        paddingX: { lg: '50px', md: '30px', sm: '13px', xs: '10px' },
        width: '96.2%',
    },
    container: {
        position: 'fixed',
        zIndex: '122',
        paddingLeft: '0',
    },

    heading: {
        color: '#1976d2',
        textDecoration: 'none',
        fontFamily: "'Aclonica', sans-serif",
        fontSize: { lg: '3rem', md: '2.7rem', sm: '1.8rem', xs: '1.4rem' }
    },
    image: {
        marginRight: '10px',
        height:{lg: '60px',md: '60px', sm: '30px', xs: '28px'},
        width:{ lg: '60px', md: '60px', sm: '30px', xs: '28px'},
      
    },
    appbarInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    toolbar: {
        width: '400px',
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingLeft:{ lg: '10px', md: '10px', sm: '10px', xs: '0'}
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
    },
    avatar: {
        color: '#3c41e5',
        backgroundColor: "#bee5e0",
    },
    bottomNav: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        justifyContent: 'space-around',
        '@media(min-width:899px)': {
            display: 'none'
        },
        zIndex: '2',
    },
    button: {
        '@media(max-width:800px)': {

            padding: '0',
            fontSize: '10px'
        },
    }

}


