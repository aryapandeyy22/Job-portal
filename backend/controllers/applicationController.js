'use strict';
const catchAsyncErrors = require('../middleware/catchAsyncError');
const ErrorHandler = require('../middleware/error');
const Job = require('../models/job');
const Application = require('../models/application');
const cloudinary = require('cloudinary').v2;

const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Employer not allowed to access this resource.", 400));
  }
  
  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please upload a PNG file.", 400));
  }
  
  const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  
  if (!name || !email || !coverLetter || !phone || !address || !jobId) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  
  const jobDetails = await Job.findByPk(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    resume,
    resume_public_id: cloudinaryResponse.public_id,
    resume_url: cloudinaryResponse.secure_url,
    applicantID: req.user.id, // Assuming req.user contains user details
    employerID: jobDetails.postedBy, // Assuming jobDetails contains the postedBy user ID
    role: "Job Seeker",
  });

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});


const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role, id: userId } = req.user;
  if (role === 'Job Seeker') {
    return next(new ErrorHandler('Job Seeker not allowed to access this resource.', 400));
  }

  const applications = await Application.findAll({ where: { employerID: userId } });
  res.status(200).json({
    success: true,
    applications,
  });
});

const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role, id: userId } = req.user;
  if (role === 'Employer') {
    return next(new ErrorHandler('Employer not allowed to access this resource.', 400));
  }

  const applications = await Application.findAll({ where: { applicantID: userId } });
  res.status(200).json({
    success: true,
    applications,
  });
});

const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { role, id: userId } = req.user;
  if (role !== 'Job Seeker') { // Check if the role is not 'Job Seeker'
    return next(new ErrorHandler('Only job seekers are allowed to delete applications.', 403));
  }

  const { id } = req.params;
  const application = await Application.findByPk(id);
  if (!application) {
    return next(new ErrorHandler('Application not found!', 404));
  }

  if (application.applicantID !== userId) { // Check if the application's applicantID matches the current user's ID
    return next(new ErrorHandler('You are not authorized to delete this application!', 403));
  }

  await application.destroy();
  res.status(200).json({
    success: true,
    message: 'Application Deleted!',
  });
});



module.exports = {
  postApplication,
  employerGetAllApplications,
  jobseekerGetAllApplications,
  jobseekerDeleteApplication
};
