import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { api } from "../Api/Api";

const Login = ({ setMsg , error}) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [viewPass, setViewPass] = useState(false);
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
   
  if (error && error.length > 0) {
    setTimeout(() => {
      setMsg("");
    }, 4000);
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
     

    if(formData.password.length < 8){
        setMsg("Password must be at least 8 characters long.");
        return
      }
  
    try {
      const response = await axios.post(
        `${api}/auth/login`,
        formData,
        {headers: {
          "Content-Type": "application/json",
        },
           
      }
    );

      if (response.data.user) {
        setMsg(response?.data?.description || "Login Success");
        localStorage.setItem("token", JSON.stringify(response.data?.content?.schema?.properties.token || "8dus_kri$#_sld_d8383"));
        navigate("/");
        return;  
      }
     } catch (err) {
      if (err.response) {
      const { status, data } = err.response;
        if (status === 400) {
          setMsg(data.error  || "Unauthorized Invalid username or Password.");
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
          password: "",
        });
        setMsg("");
        setMsg("");
      }, 4000);
    }
  };


  return (<>
    {loading && <Loading/>}
    <div className="min-h-screen flex items-center justify-center flex-col p-3">
      <h1 className="md:text-4xl text-2xl font-semibold mb-10">Login</h1>
      <div className="flex justify-center items-center flex-col w-full max-w-md shadow-2xl ">
        <div className="relative">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
            alt=""
            className="h-[90px] shadow-lg w-[90px] rounded-full mt-[-30px]"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full min-h-[50vh] py-10 px-4 gap-6"
        >
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            className="border p-2 rounded"
            required
          />
          <div className="w-full relative">
            <input
              type={`${viewPass ? "text" : "password"}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border p-2 rounded w-full"
              required
            />
            <p
              onClick={() => setViewPass(!viewPass)}
              className="absolute top-3 right-4 h-7  cursor-pointer "
            >
              {viewPass ? (
                <FaRegEyeSlash size={24} />
              ) : (
                <IoEyeOutline size={24} />
              )}
            </p>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            
            type="submit"
            className={`mt-6 p-2 ${formData.password.length <= 8 ? 'bg-gray-300 cursor-not-allowed opacity-60' : 'bg-blue-500 text-white'} rounded  ${
              loading && "opacity-50"
            }`}
            disabled={loading || formData.password.length < 8}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center mt-14">
            Don't have account yet? please{" "}
            <NavLink to={"/signup"} className="text-blue-500 underline">
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
    </>);
};

export default Login;
