import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { api } from "../Api/Api";


const SignUp = ({setMsg , error}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    inviteCode: "",
  });
  const [confirmPassword , setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewPass, setViewPass] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViewPass = (text) => {
    setViewPass((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  if (error.length > 0) {
    setTimeout(() => {
      setMsg("");
    }, 4000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setMsg("Please write a valid email");
      return;
    }
    if (formData.password !== confirmPassword) {
      setMsg("Passwords not matched");
      return;
    }

    if(formData.password.length < 8 ){
      setMsg("Password must be at least 8 characters long.");
      return
    }

    setLoading(true);
    setMsg("");
  
    
    console.log(formData)
      try {
        const response = await axios.post(
          `${api}/auth/signup`,
          formData
        );
        if(response.status === 200) {
          setMsg(response.data.description || "Signup successful!");
          setTimeout(() => navigate("/login"), 1000);
        }
      }catch (err) {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 400) {
        
            switch (data.errorCode) {
              case "USERNAME_EXISTS":
                setMsg("The username is already taken. Please choose another.");
                break;
              case "EMAIL_EXISTS":
                setMsg("The email is already registered. Try logging in.");
                break;
              case "INVALID_INVITE":
                setMsg("The invite code is invalid. Please check and try again.");
                break;
              case "INVALID_REFERRER_UUID":
                setMsg("The referrer UUID is invalid.");
                break;
              default:
                setMsg("Invalid request. Please check your inputs.");
            }
          } else if (status === 500) {
            setMsg(data.error || "Internal Server Error. Please try again later.");
          }
        } else if (err.request) {
          setMsg("No response from server. Please try again later.");
        } else {
          setMsg(err.message || "An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
  
        setTimeout(() => {
          setFormData({
            username: "",
            email: "",
            password: "",
            inviteCode: "",
          });
          setConfirmPassword('');
          setMsg("");
          setMsg("");
        }, 4000);
      }
  
  };

  return (
    <>
     {loading && <Loading/>}
      <div className="min-h-screen flex py-10 md:py-2 md:justify-center items-center flex-col p-4">
        <h1 className="md:text-2xl text-xl font-semibold mb-2">
          Register here
        </h1>
        <div className="flex mt-10 justify-center items-center flex-col w-full max-w-md shadow-2xl py-4 px-4 rounded-md">
          <div className="relative mb-2">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
              alt=""
              className="h-[60px] shadow-lg w-[60px] rounded-full mt-[-40px]"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:gap-4 gap-6 md:p-3 px-4 w-full max-w-xl "
          >
            <TextField
              label="Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="w-full relative">
              <TextField
                label="Password"
                name="password"
                type={`${viewPass.password ? "text" : "password"}`}
                value={formData.password}
                onChange={handleChange}
                className="w-full"
                required
              />
              <p
                onClick={() => handleViewPass("password")}
                className="absolute top-4 right-4 h-7  cursor-pointer "
              >
                {viewPass.password ? (
                  <FaRegEyeSlash size={24} />
                ) : (
                  <IoEyeOutline size={24} />
                )}
              </p>
            </div>
            <div className="w-full relative">
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={`${viewPass.confirmPassword ? "text" : "password"}`}
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
                className="w-full"
              />
              <p
                onClick={() => handleViewPass("confirmPassword")}
                className="absolute top-4 right-4 h-7  cursor-pointer "
              >
                {viewPass.confirmPassword ? (
                  <FaRegEyeSlash size={24} />
                ) : (
                  <IoEyeOutline size={24} />
                )}
              </p>
            </div>

            <TextField
              label="Invite Code"
              name="inviteCode"
              value={formData.inviteCode}
              onChange={handleChange}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </form>
          <p className="text-center mt-5">
            Already have an account? please{" "}
            <NavLink to={"/login"} className="text-blue-500 underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
