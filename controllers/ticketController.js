const asyncHandler=require('express-async-handler');
const Ticket=require('../models/ticketModel');
const nextTicket=require('../utils/nextTicket');


//@desc Get all the tickets
//@route GET /api/tickets/
//@access private
const getTickets=asyncHandler(async(req,res)=>{

    console.log("Line 10:",req.user);


    const Tickets=await Ticket.find({},
      {
        _id:0,
        __v:0
      });
    res.status(200).json(Tickets)
});

//@desc Get all the tickets
//@route GET /api/tickets/:reporter
//@access private
const getTicketsbyUser=asyncHandler(async(req,res)=>{
  // console.log("Line 22:",req.user.id);

  const tickets=await Ticket.find({
    reporter:req.params.reporter
  },
  {
    _id:0,
    __v:0
  });
  console.log("Line 23:",tickets)
  res.status(200).json(tickets)
})


//@desc Create  the ticket
//@route POST /api/tickets/
//@access private
const createTicket = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { title, body, type, status } = req.body;
    if (!title || !body || !type || !status) {
      res.status(400);
      throw new Error('All fields are mandatory!');
    }

    // Get the next ticket_id using the nextTicket function
    const ticket_id = await nextTicket();
    console.log("Line 35:",req.body);
    console.log("Line 36:",req.user);
    const reporter=req.user.id;
    const ticket = await Ticket.create({
      ticket_id,
      title,
      body,
      type,
      status,
      reporter

    });

    res.status(201).json(ticket);
  });



//@desc Get  the ticket by id
//@route GET /api/tickets/:id
//@access private
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


//@desc Update the ticket by id
//@route PUT /api/tickets/:id
//@access private
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


//@desc Delete specific ticket
//@route DEL /api/tickets/:id
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
    getTicketsbyUser,
    createTicket,
    getTicketById,
    UpdateTicketById,
    deleteTicket

};