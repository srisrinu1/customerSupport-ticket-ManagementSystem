const express=require('express');
const app=express();
require('dotenv').config();
const ticket=require("./routes/ticket");
const errorHandler = require("./middleware/errorHandler");
const connectDb=require('./config/dbConnection');
const idMiddleware = require('./middleware/idMiddleware');

connectDb();
const PORT=process.env.PORT || 5001;

app.use(express.json());
app.use("/api/tickets",ticket);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Listening on: ${PORT}`)
})