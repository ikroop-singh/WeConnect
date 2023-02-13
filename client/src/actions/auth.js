import * as api from '../api';


export const signin = (formData, navigate,setLoading) => async (dispatch) => {
  //code for user login
  try {

    const { data } =await  api.signin(formData);
    setLoading(false);
    dispatch({ type: 'AUTH', payload: data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData,navigate,setLoading) => async (dispatch) => {
  //code for signup
  try {
    console.log(formData)
    const { data } =await  api.signup(formData);
    setLoading(false);
    dispatch({ type: 'AUTH', payload: data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
}
