const joi=require('joi');

const validateUser=async(req,res,next)=>{

const userSchema=joi.object().strict().keys({
   user:joi.string().min(8).max(30).required(),
   email:joi.string().email().required(),
   password:joi.string().min(8).max(30).
   regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,30}$/).
   required()

});

try{
  await userSchema.validateAsync(req.body);
  next();
}
catch(error){
//   console.log(error.details[0].message);
  res.status(422).json({message:error.details[0].message});
}


};

module.exports=validateUser;