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
    let lastId = 0;
    if (lastTicket) {
      lastId = parseInt(lastTicket.ticket_id.split('-')[1]);
      lastId = lastId + 1;
    } else {
      lastId = 1;
    }
    const ticket_id = `HELP-${lastId}`;
    return ticket_id;
  };


module.exports=nextTicket;