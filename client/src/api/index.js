import axios from 'axios';
const API= axios.create({ baseURL:'http://localhost:5000' });

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`bearer ${localStorage.getItem('token')}`;
    }
    return req;
})

export const fetchPosts=()=>{
    return API.get('/posts');
}

export const fetchPostsBySearch=(searchQuery)=>{
     return API.get(`posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`)
}
export const createPosts=(newPost)=>{
    return API.post('/posts',newPost);
}

export const updatePost=(id,updatedPost)=>{
    return API.patch(`/posts/${id}`,updatedPost);
}

export const deletePost=(id)=>{
    return API.delete(`/posts/${id}`);
}

export const likePost=(id)=>{
    return API.patch(`/posts/${id}/likePost`);
}

export const commentPost=(id,comment)=>{
    return API.patch(`/posts/${id}/comments`,comment);
}

export const deleteComment=(postId,commentId)=>{
    return API.patch(`/posts/${postId}/deletecomment`,commentId);

}

//for authentication

export const signin=(formData)=>{
    return API.post('/auth/signin',formData)
}

export const signup=(formData)=>{
    return API.post('/auth/signup',formData)
}

//for fetching user

export const fetchUser=(id)=>{
 return  API.get(`/user/${id}`);
}

//for follow and unfollow

export const followUser=(followId)=>{
   return API.patch('/user/follow',{followId});
}

export const unfollowUser=(unfollowId)=>{
   return API.patch('/user/unfollow',{unfollowId})
}