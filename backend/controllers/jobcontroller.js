'use strict';
const catchAsyncErrors = require('../middleware/catchAsyncError');
const ErrorHandler = require('../middleware/error');
const Job = require('../models/job');
const User = require('../models/user');

// Get all jobs
const getAllJobs = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Job.findAll({
        where: { expired: false },
        attributes: ['id', 'title', 'description', 'category', 'country', 'city', 'location', 'fixedSalary', 'salaryFrom', 'salaryTo', 'expired', 'jobPostedOn']
    });
    res.status(200).json({
        success: true,
        jobs,
    });
});

const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role, id: userId } = req.user; // Assuming req.user contains user details
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 400));
  }

  const {
    title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(new ErrorHandler("Please either provide fixed salary or ranged salary.", 400));
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400));
  }

  const jobData = {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary: fixedSalary || null,
    salaryFrom: salaryFrom || null,
    salaryTo: salaryTo || null,
    postedBy: userId,
  };

  console.log('Creating job with data:', jobData); // Add this line for debugging

  const job = await Job.create(jobData);

  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

// Get jobs posted by the logged-in user
const getMyJobs = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
    }
    const myJobs = await Job.findAll({ where: { postedBy: req.user.id } });
    res.status(200).json({
        success: true,
        myJobs,
    });
});

// Update a job
const updateJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
    }
    const { id } = req.params;
    let job = await Job.findByPk(id);
    if (!job) {
        return next(new ErrorHandler("OOPS! Job not found.", 404));
    }
    job = await Job.update(req.body, {
        where: { id: id },
        returning: true,
        plain: true,
    });
    res.status(200).json({
        success: true,
        message: "Job Updated!",
        job: job[1] // Updated job instance
    });
});

// Delete a job
const deleteJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
    }
    const { id } = req.params;
    const job = await Job.findByPk(id);
    if (!job) {
        return next(new ErrorHandler("OOPS! Job not found.", 404));
    }
    await job.destroy();
    res.status(200).json({
        success: true,
        message: "Job Deleted!",
    });
});

// Get a single job by ID
const getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findByPk(id);
        if (!job) {
            return next(new ErrorHandler("Job not found.", 404));
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
});

module.exports = {
    getAllJobs,
    getMyJobs,
    getSingleJob,
    deleteJob,
    updateJob,
    postJob
};
