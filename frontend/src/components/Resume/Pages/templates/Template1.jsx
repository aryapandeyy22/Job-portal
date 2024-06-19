import React, { useState, useEffect } from "react";
import axios from "axios";
import './template1.css';
import { GiSkills } from "react-icons/gi";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";

function Template1() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    education: [],
    experiences: [],
    projects: [],
    skills: [],
    achievements: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/resume/getmyresume", {
          withCredentials: true
        });
        const data = response.data;

        // Log the response data for debugging
        console.log("API Response:", data);

        // Ensure all fields from the backend match the state structure
        setUser({
          firstName: data.firstName.toUpperCase(),
          lastName: data.lastName.toUpperCase(),
          email: data.email,
          mobileNumber: data.mobileNumber,
          address: data.address,
          linkedIn: data.linkedIn,
          github: data.github,
          portfolio: data.portfolio,
          education: data.education || [],
          experiences: data.experiences || [],
          projects: data.projects || [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          achievements: data.achievements || []
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching resume data:", error);
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const element = document.getElementById("resume-content");
    const opt = {
      margin: 0.5,
      filename: `${user.firstName}_${user.lastName}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };
    html2pdf().from(element).set(opt).save();
  };
  const handleDownloadPng = () => {
    const element = document.getElementById("resume-content");
    html2canvas(element).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = `${user.firstName}_${user.lastName}_Resume.png`;
      link.click();
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Placeholder while data is being fetched
  }

  return (
    <div className="templateParent">
      <div className="button-container">
        <button onClick={handlePrint} className="action-button">Print</button>
        <button onClick={handleDownloadPdf} className="action-button">Download PDF</button>
        <button onClick={handleDownloadPng} className="action-button">Download PNG</button>
      </div>

      <div id="resume-content">
        <div className="top d-flex flex-column">
          <div className="top d-flex flex-row justify-content-around">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
          </div>
          <div className="top d-flex flex-row justify-content-around">
            <p>{user.email}</p>
            <p>{user.mobileNumber}</p>
            <p>{user.address}</p>
          </div>
          <div className="top d-flex flex-row justify-content-around">
            {user.linkedIn && (
              <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">
                <b>LinkedIn</b>
              </a>
            )}
            {user.github && (
              <a href={user.github} target="_blank" rel="noopener noreferrer">
                <b>Github</b>
              </a>
            )}
            {user.portfolio && (
              <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
                <b>Portfolio</b>
              </a>
            )}
          </div>
        </div>

        <div className="education mt-3">
          <h3>Education</h3>
          {user.education.length > 0 ? (
            user.education.map((education, index) => (
              <div className="d-flex align-items-center" id="hehe" key={index}>
                <p>
                  <b>{education.qualification}</b> with{" "}
                  <b>{education.percentage}%</b> in {education.institution}
                </p>
                <h6>
                  <b id="yoi">{education.yearRange} </b>
                </h6>
              </div>
            ))
          ) : (
            <p>No education data available</p>
          )}
        </div>

        <div className="experience mt-3">
          <h3>Experience</h3>
          {user.experiences.length > 0 ? (
            user.experiences.map((experiences, index) => (
              <div className="d-flex flex-column mt-2" id="hehe" key={index}>
                <p>
                  <b>{experiences.position}</b> at <b>{experiences.company},{experiences.place}</b>
                </p>
                <h6>
                  <b id="bleh">{experiences.yearRange} </b>
                </h6>
                <div>{experiences.description}</div>
              </div>
            ))
          ) : (
            <p>No experience data available</p>
          )}
        </div>

        <div className="projects mt-3">
          <h3>Projects</h3>
          {user.projects.length > 0 ? (
            user.projects.map((project, index) => (
              <div className="d-flex flex-column mt-1" id="hehe" key={index}>
                <h6>
                  <b>{project.title}</b>
                </h6>
                <h6>
                  <b id="bleh">{project.yearRange}</b>
                </h6>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.link}
                  </a>
                )}
                <div>{project.description}</div>
              </div>
            ))
          ) : (
            <p>No project data available</p>
          )}
        </div>

        <div className="achievements mt-3">
          <h3>Achievements</h3>
          {user.achievements.length > 0 ? (
            user.achievements.map((achievement, index) => (
              <div className="d-flex flex-column mt-1" id="hehe" key={index}>
                <p>
                  <b>{achievement.title}</b>
                </p>
                <h6>
                  <b id="bleh">{achievement.yearRange}</b>
                </h6>
                <div>{achievement.description}</div>
              </div>
            ))
          ) : (
            <p>No achievements data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Template1;
