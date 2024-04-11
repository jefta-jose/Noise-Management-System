import React from "react";
import "./Login.scss";
import googleIcon from "../../assets/Rectangle 114.png";
import loginarrow from "../../assets/Rectangle 121.png";
import { Link } from "react-router-dom";
import logintxtimg from "../../assets/Rectangle 112.png";
import { useLoginMutation } from "../../Features/userfeatures/User";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAdminLoginMutation } from "../../Features/userfeatures/Admin";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [adminLogin] = useAdminLoginMutation();

  const schema = yup.object().shape({
    Email: yup.string().required("Email is required"),
    Password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (loginData) => {
    try {
      const result = await login(loginData).unwrap();
      console.log("user login result", result);
  
      const feedback = await adminLogin(loginData).unwrap();
      console.log("admin login result", feedback);
  
      if (feedback.result && feedback.result.length > 0) {
        const role = feedback.result[0].Role;
        console.log("This user's role is", role);
        if (role === "Admin") {
          navigate("/admindashboard");
        } else {
          console.log("This user is not authorized to access the admin dashboard.");
        }
      } else {
        console.log("No data found in the result array.");
      }
  
      localStorage.clear();
      const { result: userResult } = result;
      if (userResult && userResult.length > 0) {
        const { Role, ...userData } = userResult[0];
        localStorage.setItem("FirstName", userData.FirstName);
        localStorage.setItem("LastName", userData.LastName);
        localStorage.setItem("UserID", userData.UserID);
        localStorage.setItem("County", userData.County);
        localStorage.setItem("Residence", userData.Residence);
        localStorage.setItem("PhoneNumber", userData.PhoneNumber);
        localStorage.setItem("Email", userData.Email);
        localStorage.setItem("NationalID", userData.NationalID);
        localStorage.setItem("Occupation", userData.Occupation);
        localStorage.setItem("Gender", userData.Gender);
        localStorage.setItem("PhotoURL", userData.PhotoURL);
  
        console.log("This user's role is", Role);
  
        if (Role === "User") {
          navigate("/userdashboard/userlayout/notifications");
        }
      } else {
        console.log("No data found in the user result array.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-form-content">
          <div className="login-header">
            <h1>N/G</h1>
            <h2>Welcome Back</h2>
          </div>
          <div className="login-with-google">
            <img src={googleIcon} alt="" />
            <p>Login With Google</p>
          </div>
          <div className="or">
            <p>------------OR LOGIN WITH EMAIL------------</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="email">
              <input
                type="email"
                id="email"
                {...register("Email")}
                placeholder="Your Email"
              />
            </label>
            {errors.Email?.message && (
              <p className="error">{errors.Email?.message}</p>
            )}
            <label htmlFor="password" className="password">
              <input
                type="password"
                id="password"
                {...register("Password")}
                placeholder="Password"
              />
            </label>
            {errors.Password?.message && (
              <p className="error">{errors.Password?.message}</p>
            )}

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Keep me logged in</label>
              </div>
              <a href="/">Forgot password?</a>
            </div>
            <div className="login-btn">
              <button type="submit">Login</button>
              <img src={loginarrow} alt="" />
            </div>
          </form>

          <p className="sign-up">
            Don't have an account? <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </div>
      <div className="login-text">
        <div className="login-text-header">
          <h1>New Updates Available</h1>
          <p>We have added some awesome new features</p>
          <button>Learn More</button>
        </div>
        <div className="login-text-image">
          <img src={logintxtimg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
