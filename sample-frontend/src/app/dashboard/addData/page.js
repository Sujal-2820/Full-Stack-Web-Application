//src/app/dashboard/addData/page.js

"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./addData.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardNavbarComponent from "@/app/components/Navbar2/navbar2";


const AddDataPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/userData", {
        title,
        category,
        description,
      });
      console.log(response.data);
      router.push("/dashboard"); // Redirect to dashboard after successful submission
      setTitle("");
      setCategory("");
      setDescription("");
    } catch (error) {
      console.error("Error adding data:", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <DashboardNavbarComponent />

      <div className="addData-parent-div">
        <h1 className="addData-heading">Add Data</h1>
        <form className="addData-submit-form" onSubmit={handleSubmit}>
          <div className="addData-input-div">
            <label className="addData-label" htmlFor="title">
              Title:
            </label>
            <input
              className="addData-input"
              type="text"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='addData-input-div'>
          <label className='addData-label' htmlFor="category">Select Category:</label>
          <select
            className='addData-input'
            id="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Science & Technology">Science & Technology</option>
            <option value="Business & Finance">Business & Finance</option>
            <option value="Education & Learning">Education & Learning</option>
            <option value="Lifestyle & Wellness">Lifestyle & Wellness</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Pets & Animals">Pets & Animals</option>
          </select>
        </div>
          <div className="addData-input-div">
            <label className="addData-label" htmlFor="description">
              Description:
            </label>
            <textarea
              className="addData-input"
              id="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="addData-submit-button" type="submit">
            Submit
          </button>
        </form>
        {errorMessage && (
          <p className="addData-error-message">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default AddDataPage;
