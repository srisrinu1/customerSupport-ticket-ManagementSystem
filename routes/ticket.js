const express=require('express');
const app=express();
const router=express.Router();
const {getTickets,createTicket,getTicketById,UpdateTicketById,deleteTicket}=require('../controllers/ticketController');
const idMiddleware = require('../middleware/idMiddleware');

router.get("/",getTickets);
// router.use(idMiddleware);
router.post("/",createTicket);
router.get("/:id",getTicketById);

router.put("/:id",UpdateTicketById);

router.delete("/:id",deleteTicket)

module.exports=router;