"use client";

// src/app/signup/page.js

import { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import NavbarComponent from "../components/Navbar/navbar";
import { useRouter } from "next/navigation";
import "./signup.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(username,email,password);
      const response = await axios.post("/api/users/signup", {
        username, 
        email,
        password,
      });

      console.log(response.data); 
      router.push('/signin');
    } catch (error) {
      console.error(error.response.data.message); 
      setErrorMessage(error.response.data.message);
    }
  };

  const directToSignin = () => {
    router.push("/signin");
  };

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <div className="user signupBox">
          <div className="formBox">
            <h2>Create An Account</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
              <button type="submit">Sign Up</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            <p className="signin">
              Already have an Account? <a onClick={directToSignin}>Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;




