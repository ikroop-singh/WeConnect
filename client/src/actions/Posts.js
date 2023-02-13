import * as api from '../api';

export const getPosts = () => async (dispatch) => {

   try {
      const { data } = await api.fetchPosts();
      dispatch({ type: "FETCH_ALL", payload: data });
   }
   catch (error) {
      console.log(error);
   }
}

export const getPostsBySearch=(searchQuery)=>async(dispatch)=>{
   try{
      const {data}=await api.fetchPostsBySearch(searchQuery);
      dispatch({type:'FETCH_ALL_SEARCH' ,payload:data});
   }catch(error){
   console.log(error);
   }
}

export const createPost = (post) => async (dispatch) => {
   try {
      const { data } = await api.createPosts(post);
            dispatch({ type: 'CREATE', payload: data });
   } catch (error) {
      console.log(error);
   }
}

export const updatePost = (id, post) => async (dispatch) => {
   try {
      const { data } = await api.updatePost(id, post);
      dispatch({ type: 'UPDATE', payload: data });
   } catch (error) {
      console.log(error);
   }
}

export const deletePost = (id) => async (dispatch) => {
   try {
      await api.deletePost(id);
      dispatch({ type: 'DELETE', payload: id });
   } catch (err) {
      console.log(err);
   }
}

export const likePost = (id) => async (dispatch) => {
   try {
   
      const { data } = await api.likePost(id);
      dispatch({ type: 'LIKEPOST', payload: data });
   } catch (error) {
      console.log(error);
   }
}

export const commentPost=(id,comment)=>async(dispatch)=>{
   try {
      const {data}=await api.commentPost(id,{comment});
      dispatch({type:'COMMENTPOST' , payload:data});
   } catch (error) {
      
   }

}

export const deleteComment=(postId,commentId)=>async(dispatch)=>{
   try{
      const {data}=await api.deleteComment(postId,{commentId});
      dispatch({type:'DELETECOMMENT',payload:data});

   }catch(err){
        console.log(err);
   }
}
