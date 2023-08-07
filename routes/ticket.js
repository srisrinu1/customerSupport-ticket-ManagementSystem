const express=require('express');
const app=express();
const router=express.Router();
const {getTickets,getTicketsbyUser,createTicket,getTicketById,UpdateTicketById,deleteTicket}=require('../controllers/ticketController');
const idMiddleware = require('../middleware/idMiddleware');
const validateToken=require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get("/",getTickets);

router.post("/",createTicket);
router.get("/:id",getTicketById);
router.get("/user/:reporter",getTicketsbyUser)

router.put("/:id",UpdateTicketById);

router.delete("/:id",deleteTicket)

module.exports=router;