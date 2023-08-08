const express=require('express');
const router=express.Router();
const {getAlltheProjects,createProject, getProjectById, updateTheProject,deleteTheProject}=require('../controllers/projectController');
const validateToken=require('../middleware/validateTokenHandler');

router.use(validateToken);
router.get("/",getAlltheProjects);
router.post("/",createProject);
router.get("/:projectId",getProjectById);
router.put("/:projectId",updateTheProject);
router.delete("/:projectId",deleteTheProject)

module.exports=router;