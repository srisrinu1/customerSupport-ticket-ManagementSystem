const asyncHandler=require('express-async-handler');
const Ticket=require('../models/ticketModel');
const nextTicket=require('../utils/nextTicket');
// Get all the tickets
//@access public

const getTickets=asyncHandler(async(req,res)=>{
    const Tickets=await Ticket.find();
    res.status(200).json(Tickets)
});

// Create  the ticket
//@access public
const createTicket = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { title, body, type, status } = req.body;
    if (!title || !body || !type || !status) {
      res.status(400);
      throw new Error('All fields are mandatory!');
    }

    // Get the next ticket_id using the nextTicket function
    const ticket_id = await nextTicket();
    const ticket = await Ticket.create({
      ticket_id,
      title,
      body,
      type,
      status,
    });

    res.status(201).json(ticket);
  });



// Get  the ticket by id
//@access public
const getTicketById=asyncHandler(async(req,res)=>{
    const ticket=await Ticket.findOne(
        {
            ticket_id:req.params.id
        },
        {
            _id:0,
            __v:0
        }
        );
    res.status(200).json(ticket);
    console.log(req.params.id)
    // res.status(200).json({"message":`Get ticket by id ${req.params.id}`});
});


// Update the ticket by id
//@access public
const UpdateTicketById = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findOne({ ticket_id: req.params.id });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    const ticket_id=ticket.ticket_id;

    // Update only the required fields from req.body using the spread operator
    const updatedTicket = await Ticket.findOneAndUpdate(
       {ticket_id:req.params.id},
      {...ticket.toObject(), ...req.body },
      { new: true }
    );
    res.status(200).json({ message: `Update ticket with id ${ticket_id}` });
  });


// Delete specific ticket
//@access public
const deleteTicket=asyncHandler(async(req,res)=>{
    const ticket = await Ticket.findOne({ ticket_id: req.params.id });
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  await Ticket.deleteOne({ ticket_id: req.params.id });
  res.status(200).json(ticket);
});



module.exports={
    getTickets,
    createTicket,
    getTicketById,
    UpdateTicketById,
    deleteTicket

};