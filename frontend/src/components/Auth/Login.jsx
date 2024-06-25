import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { data } = response;
      console.log(data.userId); // Ensure 'userId' exists in the response data
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/home'} />;
  }

  return (
    <>
      <section className="authPage">
       <div className="loginheader">
            <h3>Login</h3>
          </div>
          <div className="logincontainer">
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="hehe">
                  <option value="">Select Role*</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address*</label>
              <div>
                <input className="hehe"
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                 <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password*</label>
              <div>
                <input className="hehe"
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <RiLock2Fill />
              </div>
            </div>
            <div className="btn">
              <button type="submit" onClick={handleLogin} className="loginbtn">
              Login
            </button>
            <Link to={"/register"}>Register Now</Link></div>
           
          </form>
        </div>
       {/*<div className="banner">
          <img src="/login.png" alt="login" />
  </div>*/}
      </section>
    </>
  );
};

export default Login;