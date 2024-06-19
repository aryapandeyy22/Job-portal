import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import { Button } from "antd";
import "../../Resources/Stylesheets/template.css";
import axios from "axios";

function Templates() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get("/api/resume"); // Adjust URL based on your backend setup
        setUser(response.data); // Assuming response.data contains user/resume data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resume data:", error);
        setLoading(false); // Ensure loading state is set to false
      }
    };

    fetchResumeData();
  }, []);

  const getTemplate = () => {
    switch (params.id) {
      case "1": {
        return <Template1 user={user} />;
      }
      case "2": {
        return <Template2 user={user} />;
      }
      case "3": {
        return <Template3 user={user} />;
      }
      case "4": {
        return <Template4 user={user} />;
      }
      default: {
        return <Template1 user={user} />;
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Placeholder while data is being fetched
  }

  return (
    <div>
      <div className="d-flex justify-content-end my-5 mx-5">
        <Button className="backButton" onClick={() => navigate("/resume/home")}>
          Back
        </Button>
        <Button className="mx-5 printButton" onClick={handlePrint}>
          Print
        </Button>
      </div>
      <div ref={componentRef}>{getTemplate()}</div>
    </div>
  );
}

export default Templates;
