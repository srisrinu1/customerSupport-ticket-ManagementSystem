const mongoose = require('mongoose');
const Ticket=require('../models/ticketModel');

const nextTicket = async () => {
    // const lastTicket = await Ticket.findOne({}, {}, { sort: { ticket_id: -1 } });
    const tickets = await Ticket.find();
    tickets.sort((a, b) => {
        const aId = a.ticket_id.split('-')[1];
        const bId = b.ticket_id.split('-')[1];
        return bId - aId;
      });
      const lastTicket=tickets[0];
      console.log("12:",lastTicket);
    console.log("6:",lastTicket)
    let lastId = 0;
    if (lastTicket) {
      lastId = parseInt(lastTicket.ticket_id.split('-')[1]);
      console.log("18:", lastId);
      lastId = lastId + 1;
      console.log("19:", lastId);
    } else {
      lastId = 1;
    }
    const ticket_id = `HELP-${lastId}`;
    console.log("25:", lastId);
    return ticket_id;
  };


module.exports=nextTicket;