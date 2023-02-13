import User from '../models/users.js';
import postMessage from '../models/postMessage.js';

export const fetchUser=(req,res)=>{
    const {id}=req.params;
    try{
        
        User.findOne({_id:id})
        .then(user=>{
            postMessage.find({creator:id})
            .select('-password')
            .populate('creator' ,'_id name profilePic')
            .populate('comments.postedBy','_id name profilePic')
            .exec((err,posts)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.status(200).send({user,posts});
                }
            })
        })
    }catch(err){
        console.log(err);
    }
}

export const followUser=(req,res)=>{
    const {followId} = req.body;
       try{

        User.findByIdAndUpdate(followId,{
            $push:{followers:req.userId}},{new:true},(err,result)=>{
              if(err){
                console.log(err);
              }
              else{
                  User.findByIdAndUpdate(req.userId,{$push:{following:followId}},{new:true})
                  .select('-password')                  
                  .then((result)=>{
                    res.status(200).send({result})
                  }).catch(err=>{
                    console.log(err)
                  })
              }
            }
        )

       }catch(err){
            console.log(err);
       }
}

export const unfollowUser=(req,res)=>{

    const {unfollowId} = req.body;
       try{

        User.findByIdAndUpdate(unfollowId,{
            $pull:{followers:req.userId}},{new:true},(err,result)=>{
              if(err){
                console.log(err);
              }
              else{
                  User.findByIdAndUpdate(req.userId,{$pull:{following:unfollowId}},{new:true})
                  .select('-password')
                  .then((result)=>{
                    res.status(200).send({result})
                  }).catch(err=>{
                    console.log(err)
                  })
              }
            }
        )

       }catch(err){
            console.log(err);
       }
}

