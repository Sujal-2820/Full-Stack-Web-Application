"use client";

// src/app/signin/page.jsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./signin.css";
import axios from "axios";
import "./signin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "../components/Navbar/navbar";
import Cookies from 'js-cookie';


const Signin = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const directToSignup = () => {
    router.push("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/api/users/signin", {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { token } = response.data;
        // Store the token in a cookie
        Cookies.set('token', token, { expires: 1 }); // expires in 1 day
        // Redirect to the dashboard upon successful sign-in
        router.push("/dashboard");
      }      
    } catch (error) {
      console.error(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <div className="user signinBox">
          <div className="formBox">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Input fields for email and password */}
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign In</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            <p className="signup">
              Don't have an Account? <a onClick={directToSignup}>Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

