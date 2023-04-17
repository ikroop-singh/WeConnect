const alert=(data={msg:'',severity:'error',open:false},action)=>{
switch (action.type) {
    case 'SET_ALERT':
        return {...data,severity:action.payload.severity,msg:action.payload.msg,open:action.payload.open}

    case 'CLOSE_ALERT':
        return {...data,severity:'',msg:'',open:false}

    
    default:
        return data;
}
}

export default alert