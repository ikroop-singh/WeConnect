import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);
    }
    catch (err) {
        res.status(404).json(err.message);
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postMessage(post);
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err.message);
    }

}

export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id exists');
    }
    try {
        const updatedPost = await postMessage.findByIdAndUpdate(_id,post, { new: true });

        res.status(200).send(updatedPost);
    }
    catch (err) {
        res.send('internal server error');
        console.log(err);
    }
}

export const deletePost=async(req,res)=>{
    //   console.log(req.params.id);
      const {id}=req.params;
    //   console.log(req.params.id)
      if(!mongoose.Types.ObjectId.isValid(id))
         return res.status(404).send('Post with this id not found ');
         
      try{
          await postMessage.findByIdAndRemove(id);
          res.json('Post deleted successfully');
          
      }catch(err){
            console.log(err);
      }
}

export const likePost=async(req,res)=>{
   const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id))
       return res.status(404).send('Note with this id not found');

    try{
        const post=await postMessage.findById(id);
        const updatedPost=await postMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
        res.json(updatedPost);
    }catch(err){
        res.json(err)
    }
}
