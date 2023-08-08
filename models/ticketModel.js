const mongoose=require('mongoose');

const ticketSchema=mongoose.Schema({
    ticket_id:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required: [true,"Please add the description of the ticket"]

    },
    body:{
        type:String,
        required:[true,"Please elaborate the issue"]
    },
    type:{
        type:String,
        required:[true,"Please set the priority of ticket"],
        enum:['HELPDESK','MAINTAINANCE']
    },
    status:{
        type:String,
        required:[true,"Maintain the status of the ticket"],
        enum:['DONE','IN PROGRESS','NEW'],
    },
    reporter:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:"User"

    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    }

},
    { timestamps: true }
);

module.exports=mongoose.model('Ticket',ticketSchema)

// const Ticket = mongoose.model("Ticket", ticketSchema);

// module.exports = Ticket;