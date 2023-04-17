export const customStyles={
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px',
      width:{lg:'33%',md:'33%',sm:'53%',xs:'69%'},
      margin:'20px  auto 0',
    },
    head:{
      color:'#1976d2',
      textAlign:'center',
      width:{lg:'33%',md:'33%',sm:'53%',xs:'70%'},
      margin:'11px auto 0 ',
      padding:'12px',
    },
    logo:{
       fontFamily:"'Aclonica', sans-serif",
       fontSize:{lg:'3rem',md:'2.6rem',sm:'1.9rem',xs:'1.7rem'},
       '@media(max-width:280px)':{
        fontSize:'1.5rem'
      },    
    },

    avatar: {
      margin: '8px',
      backgroundColor: '#eb4a4a',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: '10px',
    },
    submit: {
      margin: '15px 0',
    },
   addPic:{
    marginLeft:'26px',
    height: {lg:'39px',md:'50px',sm:'36px',xs:'34px'},
    width: {lg:'94px',md:'90px',sm:'76px',xs:'76px'},
    fontSize: {lg:'11px',md:'20px',sm:'9px',xs:'8px'}
   }
};
