const express = require('express')
const jobController = require('../controllers/jobcontroller');
const isAuthorized= require('../middleware/auth')


const router = express.Router();
router.get("/getall", jobController.getAllJobs);
router.post("/post", isAuthorized, jobController.postJob);
router.get("/getmyjobs", isAuthorized, jobController.getMyJobs);
router.put("/update/:id", isAuthorized, jobController.updateJob);
router.delete("/delete/:id", isAuthorized, jobController.deleteJob);
router.get("/:id", isAuthorized, jobController.getSingleJob);

module.exports = router;