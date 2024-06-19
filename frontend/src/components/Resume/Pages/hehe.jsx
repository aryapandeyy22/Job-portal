// ResumeHome.js
import React from "react";
import { useNavigate } from "react-router-dom";
import template1Img from "../Resources/templates/template1.png";
import template2Img from "../Resources/templates/template2.png";
import template3Img from "../Resources/templates/template3.png";
import template4Img from "../Resources/templates/template4.png";
import "../Resources/Stylesheets/template.css";

function ResumeHome() {
  const navigate = useNavigate();
  const templates = [
    {
      title: "Simple Resume",
      image: template1Img,
    },
    
  ];

  const handleTryClick = (index) => {
    navigate(`/templates/${index + 1}`);
  };

  return (
    <div className="row home">
      {templates.map((template, index) => (
        <div className="col-md-4" key={`template-${index}`}>
          <div className="template">
            <img
              src={template.image}
              height="400"
              alt="resumeTemplate"
              style={{ width: "50%" , height: "50%"}}
            />
            <div className="text">
              <p>{template.title}</p>
              <button onClick={() => handleTryClick(index)}>TRY</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResumeHome;
