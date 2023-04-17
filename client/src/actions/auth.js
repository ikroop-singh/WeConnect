import * as api from '../api';


export const signin = (formData, navigate,setLoading) => async (dispatch) => {
  //code for user login
  try {

    const { data } =await  api.signin(formData);
    setLoading(false);
    dispatch({ type: 'AUTH', payload: data });
    navigate('/');
  } catch (error) {
    setLoading(false);
    dispatch({type:'SET_ALERT',payload:{msg:error.response.data.message,severity:'error',open:true}})

  }
}

export const signup = (formData,navigate,setLoading) => async (dispatch) => {
  //code for signup
  try {
    const { data } =await api.signup(formData);
    setLoading(false);
    dispatch({ type: 'AUTH', payload: data });
    navigate('/');
  } catch (error) {
    setLoading(false);
    dispatch({type:'SET_ALERT',payload:{msg:error.response.data.message,severity:'error',open:true}})
  }
}
