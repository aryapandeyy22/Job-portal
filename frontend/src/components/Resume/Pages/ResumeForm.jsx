import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Resources/Stylesheets/ResumeForm.css";
import { Context } from "../../../main";
import { Navigate } from "react-router-dom";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    education: [{ qualification: "", institution: "", yearRange: "", percentage: "" }],
    skills: [""],
    experience: [{ position: "", company: "", yearRange: "", description: "" }],
    projects: [{ title: "", yearRange: "", link: "", description: "" }],
    achievements: [{ title: "", yearRange: "", description: "" }]
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(Context);

  const handleChange = (e, index, field, nestedField) => {
    if (nestedField) {
      const newValues = [...formData[field]];
      newValues[index] = { ...newValues[index], [nestedField]: e.target.value };
      setFormData((prevData) => ({
        ...prevData,
        [field]: newValues
      }));
    } else if (field === "skills") {
      const newSkills = [...formData.skills];
      newSkills[index] = e.target.value;
      setFormData((prevData) => ({
        ...prevData,
        skills: newSkills
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddField = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], field === "skills" ? "" : {}]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:4000/api/resume/post",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Resume submitted successfully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        address: "",
        linkedIn: "",
        github: "",
        portfolio: "",
        education: [{ qualification: "", institution: "", yearRange: "", percentage: "" }],
        skills: [""],
        experience: [{ position: "", company: "", yearRange: "", description: "" }],
        projects: [{ title: "", yearRange: "", link: "", description: "" }],
        achievements: [{ title: "", yearRange: "", description: "" }]
      });
      // Redirect to resume home page after successful submission
      // Example using React-Router Navigate component (adjust as per your router setup)
      <Navigate to="/resume/home" />;
    } catch (error) {
      toast.error("Error submitting resume: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Resume Builder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="linkedIn"
          value={formData.linkedIn}
          onChange={handleChange}
          placeholder="LinkedIn Profile"
        />
        <input
          type="text"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="Github Profile"
        />
        <input
          type="text"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          placeholder="Portfolio"
        />

        <h2>Education</h2>
        {formData.education.map((education, index) => (
          <div key={index}>
            <input
              type="text"
              value={education.qualification}
              onChange={(e) => handleChange(e, index, 'education', 'qualification')}
              placeholder="Qualification"
            />
            <input
              type="text"
              value={education.institution}
              onChange={(e) => handleChange(e, index, 'education', 'institution')}
              placeholder="Institution"
            />
            <input
              type="text"
              value={education.yearRange}
              onChange={(e) => handleChange(e, index, 'education', 'yearRange')}
              placeholder="Year Range"
            />
            <input
              type="text"
              value={education.percentage}
              onChange={(e) => handleChange(e, index, 'education', 'percentage')}
              placeholder="Percentage"
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('education')}>
          Add Education
        </button>

        <h2>Skills</h2>
        {formData.skills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              value={skill}
              onChange={(e) => handleChange(e, index, 'skills')}
              placeholder="Skill"
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('skills')}>
          Add Skill
        </button>

        <h2>Experience</h2>
        {formData.experience.map((experience, index) => (
          <div key={index}>
            <input
              type="text"
              value={experience.position}
              onChange={(e) => handleChange(e, index, 'experience', 'position')}
              placeholder="Position"
            />
            <input
              type="text"
              value={experience.company}
              onChange={(e) => handleChange(e, index, 'experience', 'company')}
              placeholder="Company"
            />
            <input
              type="text"
              value={experience.yearRange}
              onChange={(e) => handleChange(e, index, 'experience', 'yearRange')}
              placeholder="Year Range"
            />
            <input
              type="text"
              value={experience.description}
              onChange={(e) => handleChange(e, index, 'experience', 'description')}
              placeholder="Description"
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('experience')}>
          Add Experience
        </button>

        <h2>Projects</h2>
        {formData.projects.map((project, index) => (
          <div key={index}>
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleChange(e, index, 'projects', 'title')}
              placeholder="Project Title"
            />
            <input
              type="text"
              value={project.yearRange}
              onChange={(e) => handleChange(e, index, 'projects', 'yearRange')}
              placeholder="Year Range"
            />
            <input
              type="text"
              value={project.link}
              onChange={(e) => handleChange(e, index, 'projects', 'link')}
              placeholder="Link"
            />
            <input
              type="text"
              value={project.description}
              onChange={(e) => handleChange(e, index, 'projects', 'description')}
              placeholder="Description"
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('projects')}>
          Add Project
        </button>

        <h2>Achievements</h2>
        {formData.achievements.map((achievement, index) => (
          <div key={index}>
            <input
              type="text"
              value={achievement.title}
              onChange={(e) => handleChange(e, index, 'achievements', 'title')}
              placeholder="Achievement Title"
            />
            <input
              type="text"
              value={achievement.yearRange}
              onChange={(e) => handleChange(e, index, 'achievements', 'yearRange')}
              placeholder="Year"
            />
            <input
              type="text"
              value={achievement.description}
              onChange={(e) => handleChange(e, index, 'achievements', 'description')}
              placeholder="Description"
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('achievements')}>
          Add Achievement
        </button>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
