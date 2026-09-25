const express=require("express");
const router=express.Router();
const {optimizeRoutine}=require("../controllers/aiController.js");

router.post("/optimize", optimizeRoutine);

module.exports=router;