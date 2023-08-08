const mongoose=require('mongoose');

const projectSchema=mongoose.Schema({
    name:{
        type:String,
        requied:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("Project",projectSchema);