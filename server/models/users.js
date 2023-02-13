import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profilePic:{
        url:{
            type:String,
            default:''
        },
        imageId:{type:String},
       
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
});
export default mongoose.model('User',userSchema);