import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  

export const getPosts = async (req, res) => {
    try {
        postMessage.find()
        .populate('comments.postedBy','_id name profilePic')
        .populate('creator','_id name profilePic')
        .sort({createdAt:-1})
        .exec((err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                res.status(200).json(result);
            }
        })
    }
    catch (err) {
        res.status(404).json(err.message); 
    }
}

export const getPostsBySearch=async(req,res)=>{
    const {searchQuery,tags} =req.query;
    try {
        const title=new RegExp(searchQuery,'i');
        const posts=await postMessage.find({$or:[{title},{tags:{$in:tags.split(',')}}]});        

            res.json(posts);
        
    } catch (error) {
          res.status(404).json({message:error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    try {
        const newPost =  new postMessage({...post,creator:req.userId,createdAt:new Date().toUTCString()})
        newPost.save()
        .populate('comments.postedBy','_id name profilePic')
        .populate('profilePic','_id name profilePic')
        .exec((res,err)=>{
            if(err){
                console.log(err);
            }
            else{

                res.status(200).json(newPost);
            }
            
        })
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
       postMessage.findByIdAndUpdate(_id,post, { new: true })
       .populate('comments.postedBy','_id name profilePic')
       .populate('creator','_id name profilePic')
       .exec((res,err)=>{
          if(err){
            console.log(err);
          }
          else{

              res.status(200).send(updatedPost);
          }
       })

    }
    catch (err) {
        res.send('internal server error');
        console.log(err);
    }
}

export const deletePost=async(req,res)=>{
      const {id}=req.params;
   
    
    try{ 
          const post=await postMessage.findById(id);

          if(post){
              //delete image from cloud
              await cloudinary.uploader.destroy(post.image.imageId);
              await postMessage.findByIdAndRemove(id);
                res.json('Post deleted successfully');
              
          }
          else{
            return res.status(404).send('Post with this id not found ');
        }
        
    }catch(err){
        console.log(err);
    }
}

export const likePost=async(req,res)=>{
   const {id}=req.params;
   if(!req.userId) return res.json({message:'unauthorized'});
   
   if(!mongoose.Types.ObjectId.isValid(id))
       return res.status(404).send('Post with this id not found');

    try{
        const post=await postMessage.findById(id);
        const index=post.likes.findIndex((id)=>id === String(req.userId));
        if(index === -1){
           post.likes.push(req.userId);
        }
        else{
            post.likes=post.likes.filter((id)=>id !== String(req.userId));
        }
         postMessage.findByIdAndUpdate(id,post,{new:true})
         .populate("comments.postedBy","_id name profilePic")
         .populate('creator','_id profilePic name')
         .exec((err,result)=>{
            if(err)console.log(err);
            else 
            res.json(result);           
         });
    }catch(err){
        res.json(err)
    }
}

export const commentPost=async(req,res)=>{
    const {id}=req.params;
    if(!req.userId) return res.json({message:'unauthorized'});
    
    const comment={
        text:req.body.comment,
        postedBy:req.userId
    }
    
         postMessage.findByIdAndUpdate(id,{
            $push:{comments:comment}
        },{new:true}).populate('comments.postedBy', '_id name profilePic')
        .populate('creator',' _id name profilePic')
        .exec((err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(result)
            }
        })          
}

export const deleteComment=async(req,res)=>{
    if(!req.userId) return res.json({message:'unauthorized'});

    const {id}=req.params;
    const {commentId}=req.body;
    try{
        const post=await postMessage.findById(id);
          post.comments=post.comments.filter((comment)=>commentId !== String(comment._id));


        postMessage.findByIdAndUpdate(id,post,{new:true})
        .populate("comments.postedBy","_id name profilePic")
         .populate('creator','_id profilePic name')
         .exec((err,result)=>{
            if(err)console.log(err);
            else 
            res.json(result);           
         });
    }
    catch(err){
         console.log(err);
    }

}
