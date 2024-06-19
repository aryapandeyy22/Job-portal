const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const isAuthorized= require('../middleware/auth')

// Route to get resume data
router.get("/getmyresume",isAuthorized, resumeController.getResume);

// Route to add 
router.post("/post", isAuthorized, resumeController.createResume)
// update resume data
router.put("/update",isAuthorized, resumeController.updateResume);

// Route to delete resume data
router.delete("/delete/:id", isAuthorized, resumeController.deleteResume);

module.exports = router;
