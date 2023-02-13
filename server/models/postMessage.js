import mongoose from 'mongoose';
const {ObjectId}=mongoose.Schema.Types

const postSchema=mongoose.Schema({
    title:String,
    name:String,
    creator:{
        type:ObjectId,  
        ref:'User'     
    },
    tags:{
        type:[String],
        default:[]
    },
    image:{
        url:{type:String},
        imageId:{type:String}
    },
    likes:{
        type:[String],
        default:[]
    },
    comments:[{
        text:String,
        postedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }],
    createdAt:{
        type:Date,
        default:new Date(),
    }, 
})

const postMessage=mongoose.model('postMessage',postSchema);

export default postMessage;