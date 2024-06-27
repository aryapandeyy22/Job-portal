import React, { useContext, useEffect } from 'react';
import './App.css';
import axios from "axios";
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import { Context } from './main';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplication";
import PostJob from "./components/Job/PostingJobs";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/Employerjobs";
import { Toaster } from 'react-hot-toast';
import ResumeHome from './components/Resume/Pages/hehe';
import Template1 from './components/Resume/Pages/templates/Template1';
import Template2 from './components/Resume/Pages/templates/Template2';
import Template3 from './components/Resume/Pages/templates/Template3';
import ResumeForm from './components/Resume/Pages/ResumeForm';


const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://job-portal-backend-nu-seven.vercel.app/api/user/alluser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/resume/home" element={<ResumeHome/>} />
          <Route path="/templates/1" element={<Template1/>} />
          <Route path="/templates/2" element={<Template2/>} />
          <Route path="/templates/3" element={<Template3/>} />
          <Route path="/resume/form" element={<ResumeForm/>} />
         
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;