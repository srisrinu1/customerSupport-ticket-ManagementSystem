const asyncHandler=require('express-async-handler');
const Project=require("../models/projectModel");

//@desc get All the tickets of a project
//@route GET /api/projects
//@access private
const getAlltheProjects=asyncHandler(async(req,res)=>{
   const projects=await Project.find({},{_id:0,__v:0});
   res.status(200).json(projects)
});

//@desc create a project
//@route POST /api/projects/
//@access private
const createProject=asyncHandler(async(req,res)=>{
    const {name,description}=req.body;

    if(!name || !description){
      res.status(400);
      throw new Error('All fields are mandatory!');
    }
    const projectAvailable=await Project.findOne({name});
    console.log("Line 24 from project controller:",projectAvailable);
    if(projectAvailable){
        res.status(400);
        throw new Error('Project exists already')
    }
    const owner=req.user.id;
    const project=await Project.create({
     name,
     description,
     owner:req.user.id
    });
    res.status(201).json(project);
});

//@desc get project by id
//@route GET /api/projects/:projectId
//acess private
const getProjectById=asyncHandler(async(req,res)=>{
    const {projectId}=req.params;
    const project=await Project.findOne(
      {_id:projectId},
      {
        _id:0,
        __v:0
      }
      );
      res.status(200).json(project)

});

//@desc update the project details
//@route PUT /api/projects/:projectId
//access private
const updateTheProject=asyncHandler(async(req,res)=>{
   const {projectId}=req.params;
   const projectAvailable=await Project.findOne({_id:projectId})
   if(!projectAvailable){
    res.status(404).json({message:"Project not found!"})
   }
   const updatedProject=await Project.findOneAndUpdate(
    {_id:projectId},
    {
     ...project.toObject(),
     ...req.body
    },
    {
    new:true
    }
    );
    res.status(200).json({message:`Updated project with id ${projectId}`})
});

//@desc delete the project
//@route GET /api/projects/:projectId
//@access private
const deleteTheProject=asyncHandler(async(req,res)=>{
   const {projectId}=req.params;
   const projectAvailable=await Project.findOne({_id:projectId});
   if(!projectAvailable){
    res.status(400).json({message:"Project not found"});
   };
   const deletedProject=await Project.deleteOne({_id:projectId});
   res.status(200).json(deletedProject);



})



module.exports={getAlltheProjects,createProject,getProjectById,updateTheProject,deleteTheProject};
