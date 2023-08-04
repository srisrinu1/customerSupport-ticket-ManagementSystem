const mongoose = require('mongoose');
const Ticket=require('../models/ticketModel');
// const nextId = 0;


const idMiddleware = async(req, res, next) => {
//   const data=Ticket.find();
//   console.log(data)
//   if(data.length===0){
//     const nextId=1;
//   }
//   else{
//     const length=data.length;
//     const lastItem=data[length-1];
//     const lastItemId = lastItem.ticket_id
//     const nextId = lastItemId + 1
//   }
  // const nextId=0;
  // const data=Ticket.find();
  // console.log(data);
  const lastTicket=await Ticket.findOne({},{},{sort:{ticket_id:-1}});
  const lastId=lastTicket?parseInt(lastTicket.ticket_id.split('-')[1]):0;
  console.log(lastTicket)
  req.body.ticket_id = `HELP-${lastId+1}`;
  next();
};

module.exports=idMiddleware;