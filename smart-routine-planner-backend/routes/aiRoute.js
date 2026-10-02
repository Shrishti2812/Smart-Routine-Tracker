const express=require("express");
const router=express.Router();
const {optimizeRoutine,applyChanges}=require("../controllers/aiController.js");

router.post("/optimize", optimizeRoutine);
router.post("/apply",applyChanges);
module.exports=router;