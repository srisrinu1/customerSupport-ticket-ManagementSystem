const express=require('express');
const router=express.Router();
const {registerUser,loginUser,currentUser}=require('../controllers/userController');
const validateUser=require('../middleware/validators/user');
const validateToken=require('../middleware/validateToken')

router.post("/register",validateUser,registerUser);

router.post("/login",loginUser);

router.get("/current",validateToken,currentUser);

module.exports=router;