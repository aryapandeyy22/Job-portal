import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Resources/Stylesheets/template.css";

function Template2() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get("/api/getmyresume"); // Adjust URL based on your backend setup
        setUser(response.data); // Assuming response.data contains user/resume data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resume data:", error);
        // Handle error as needed (e.g., show error message)
      }
    };

    fetchResumeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Placeholder while data is being fetched
  }

  if (!user) {
    return <div>Error: Unable to fetch resume data</div>; // Handle fetch error
  }

  return (
    <div className="templateParent">
      <div className="top d-flex flex-column">
        <div className="top d-flex flex-row justify-content-around">
          <h1>
            {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
          </h1>
        </div>
        <div className="top d-flex flex-row justify-content-around">
          <p>{user.email}</p>
          <p>{user.mobileNumber}</p>
          <p>{user.address}</p>
          <a href={user.linkedIn}>
            <p>LinkedIn</p>
          </a>
          <a href={user.github}>
            <p>Github</p>
          </a>
          <a href={user.portfolio}>
            <p>Portfolio</p>
          </a>
        </div>
      </div>

      <div className="divider mt-3"></div>

      <div className="education mt-3">
        <h3 className="highlightedHeading">Education</h3>

        {user.education.map((education, index) => (
          <div className="d-flex align-items-center" key={index}>
            <h6 style={{ width: 120 }}>
              <b>{education.yearRange} : </b>
            </h6>
            <p>
              <b>{education.qualification}</b> with{" "}
              <b>{education.percentage}%</b> in {education.institution}
            </p>
          </div>
        ))}
      </div>

      <div className="divider mt-3"></div>

      <div className="experience mt-3">
        <h3 className="highlightedHeading">Experience</h3>

        {user.experience.map((experience, index) => (
          <div className="d-flex flex-column mt-3" key={index}>
            <h6>
              <b className="top d-flex flex-row justify-content-between">
                <p>
                  {experience.company} ({experience.place})
                </p>
                <p>{experience.yearRange}</p>
              </b>
            </h6>
            <h6>{experience.position}</h6>
            <div>{experience.description}</div>
          </div>
        ))}
      </div>

      <div className="divider mt-3"></div>

      <div className="projects mt-3">
        <h3 className="highlightedHeading">Projects</h3>

        {user.projects.map((project, index) => (
          <div className="d-flex flex-column mt-3" key={index}>
            <h6>
              <b className="top d-flex flex-row justify-content-between">
                <a href={project.link}>
                  <p>{project.title}</p>
                </a>
                <p>{project.yearRange}</p>
              </b>
            </h6>
            <div>{project.description}</div>
          </div>
        ))}
      </div>

      <div className="divider mt-3"></div>

      <div className="skills mt-3">
        <h3 className="highlightedHeading">Skills</h3>

        <div className="top d-flex flex-row justify-content-between">
          {user.skills.map((skill, index) => (
            <p key={index}>{skill.technology}</p>
          ))}
        </div>
      </div>

      <div className="divider mt-3"></div>

      <div className="achievements mt-3">
        <h3 className="highlightedHeading">Achievements</h3>

        {user.achievements.map((achievement, index) => (
          <div className="d-flex flex-column mt-3" key={index}>
            <h6>
              <b className="top d-flex flex-row justify-content-between">
                <p>{achievement.title}</p>
                <p>{achievement.yearRange}</p>
              </b>
            </h6>
            <div>{achievement.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Template2;
