const express = require('express')
const isAuthorized = require('../middleware/auth')
const applicationController = require('../controllers/applicationController')

const router = express.Router();



router.post("/post", isAuthorized, applicationController.postApplication);
router.get("/employer/getall", isAuthorized, applicationController.employerGetAllApplications);
router.get("/jobseeker/getall", isAuthorized, applicationController.jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthorized, applicationController.jobseekerDeleteApplication);

module.exports = router;



