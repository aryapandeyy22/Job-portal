'use strict';
const puppeteer = require('puppeteer');
const Resume = require('../models/resume');
const User = require('../models/user');
const Education = require('../models/education');
const Experience = require('../models/experience');
const Project = require('../models/project');
const Achievement = require('../models/achievement');
const ErrorHandler = require('../middleware/error');
const catchAsyncErrors = require('../middleware/catchAsyncError');

const getResume = catchAsyncErrors(async (req, res, next) => {
  const { id: userId } = req.user;

  try {
    const resume = await Resume.findOne({
      where: { userId },
      include: [
        {
          model: Education,
          attributes: ['id', 'institution', 'qualification', 'yearRange', 'percentage'],
        },
        {
          model: Experience,
          attributes: ['id', 'company','place','position', 'yearRange', 'description'],
        },
        {
          model: Project,
          attributes: ['id', 'title', 'yearRange', 'link', 'description'],
        },
        {
          model: Achievement,
          attributes: ['id', 'title', 'yearRange', 'description'],
        },
      ],
    });

    if (!resume) {
      return next(new ErrorHandler('Resume not found', 404));
    }

    res.json(resume);
  } catch (error) {
    return next(new ErrorHandler('Failed to fetch resume', 500));
  }
});

const createResume = catchAsyncErrors(async (req, res, next) => {
  const { id: userId } = req.user;
  const {
    firstName, lastName, email, mobileNumber, portfolio,
    linkedIn, github, address, skills, education, experience,
    projects, achievements
  } = req.body;

  if (!firstName || !lastName || !email) {
    return next(new ErrorHandler('First name, last name, and email are required.', 400));
  }

  try {
    const newResume = await Resume.create({
      firstName, lastName, email, mobileNumber, portfolio,
      linkedIn, github, address, userId, skills,
    });

    const resumeId = newResume.id;

    if (education && education.length) {
      await Education.bulkCreate(education.map(item => ({ ...item, resumeId })));
    }

    if (experience && experience.length) {
      await Experience.bulkCreate(experience.map(item => ({ ...item, resumeId })));
    }

    if (projects && projects.length) {
      await Project.bulkCreate(projects.map(item => ({ ...item, resumeId })));
    }

    if (achievements && achievements.length) {
      await Achievement.bulkCreate(achievements.map(item => ({ ...item, resumeId })));
    }

    res.status(201).json({ message: 'Resume created successfully', resume: newResume });
  } catch (error) {
    return next(new ErrorHandler('Failed to create resume', 500));
  }
});

const updateResume = catchAsyncErrors(async (req, res, next) => {
  const { id: userId } = req.user;
  const {
    firstName, lastName, email, mobileNumber, portfolio,
    linkedIn, github, address, skills, education, experience,
    projects, achievements
  } = req.body;

  try {
    const resume = await Resume.findOne({ where: { userId } });

    if (!resume) {
      return next(new ErrorHandler('Resume not found. Create one first.', 404));
    }

    await resume.update({
      firstName, lastName, email, mobileNumber, portfolio,
      linkedIn, github, address, skills,
    });

    await Education.destroy({ where: { resumeId: resume.id } });
    await Experience.destroy({ where: { resumeId: resume.id } });
    await Project.destroy({ where: { resumeId: resume.id } });
    await Achievement.destroy({ where: { resumeId: resume.id } });

    if (education && education.length) {
      await Education.bulkCreate(education.map(item => ({ ...item, resumeId: resume.id })));
    }

    if (experience && experience.length) {
      await Experience.bulkCreate(experience.map(item => ({ ...item, resumeId: resume.id })));
    }

    if (projects && projects.length) {
      await Project.bulkCreate(projects.map(item => ({ ...item, resumeId: resume.id })));
    }

    if (achievements && achievements.length) {
      await Achievement.bulkCreate(achievements.map(item => ({ ...item, resumeId: resume.id })));
    }

    res.json({ message: 'Resume updated successfully', resume });
  } catch (error) {
    return next(new ErrorHandler('Failed to update resume', 500));
  }
});

const deleteResume = catchAsyncErrors(async (req, res, next) => {
  const { id: userId } = req.user;

  try {
    const resume = await Resume.findOne({ where: { userId } });

    if (!resume) {
      return next(new ErrorHandler('Resume not found', 404));
    }

    await Education.destroy({ where: { resumeId: resume.id } });
    await Experience.destroy({ where: { resumeId: resume.id } });
    await Project.destroy({ where: { resumeId: resume.id } });
    await Achievement.destroy({ where: { resumeId: resume.id } });

    await resume.destroy();

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    return next(new ErrorHandler('Failed to delete resume', 500));
  }
});

const screenshot = async (req, res, next) => {
  const { name } = req.query;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${process.env.LINKEDIN_URL}/${name}`);
    const screenshotBuffer = await page.screenshot();
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(screenshotBuffer);
  } catch (error) {
    return next(new ErrorHandler('Failed to take screenshot', 500));
  }
};

module.exports = {
  getResume,
  createResume,
  updateResume,
  deleteResume,
  screenshot,
};
