const express = require("express");
const router = express.Router();

const {
    addRoutine,
    getRoutine,
    updateRoutine,
    deleteRoutine,
    completeRoutine,
    getStats
} = require("../controllers/routineController.js");

const authMiddleware = require("../middleware/authMiddleware.js");

 
router.use(authMiddleware);

router.post("/add", addRoutine);
router.get("/get", getRoutine);
router.put("/:id", updateRoutine);
router.delete("/:id", deleteRoutine);
router.post("/:id/complete", completeRoutine);
router.get("/stats", getStats);

module.exports = router;