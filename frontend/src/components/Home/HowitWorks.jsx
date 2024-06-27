import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import './Home.css';
import { Link, useNavigate } from "react-router-dom";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How FoundIt Works</h3>
          <div className="banner">
          <div className="card">
              <Link to={"/login"} onClick={() => setShow(false)}>
              <FaUserPlus />
              <p>Create Account</p>
              </Link>
           </div>
          <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
          </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
               
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;