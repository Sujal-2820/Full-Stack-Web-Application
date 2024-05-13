//src/app/dashboard/addData/page.js

"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./addData.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardNavbarComponent from "@/app/components/Navbar2/navbar2";
import { imageDb } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const AddDataPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  function generateUniqueFilename(originalFilename) {
    const extension = originalFilename.split(".").pop(); // Get the file extension
    return `${uuidv4()}.${extension}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setErrorMessage("Please select an image to upload");
      return;
    }

    // Check image size
    if (selectedImage.size > 5 * 1024 * 1024) {
      // Size exceeds 5MB
      setErrorMessage("Image size should be less than 5MB");
      return;
    }

    try {
      let uniqueFilename = generateUniqueFilename(selectedImage.name);

      // Upload image to Firebase Storage
      const imageRef = ref(
        imageDb,
        `dataImages/${uniqueFilename}/${selectedImage.name}`
      );
      await uploadBytes(imageRef, selectedImage);
      const imageUrl = uniqueFilename;
      console.log("image URL in Firebase", imageUrl);

      const response = await axios.post("/api/userData", {
        title,
        category,
        imageUrl, // Update with actual URL
        description,
      });
      console.log(response.data);
      router.push("/dashboard"); // Redirect to dashboard after successful submission
      setTitle("");
      setCategory("");
      setDescription("");
      setSelectedImage(null);
    } catch (error) {
      if (error.response) {
        // Check for errors during image download
        console.error(
          "Error downloading image URL:",
          error.response.data.message
        );
        setErrorMessage(error.response.data.message);
      } else {
        console.error("Error adding data:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <DashboardNavbarComponent />

      <div className="addData-parent-div">
        <h1 className="addData-heading">Add Data</h1>
        {errorMessage && (
          <p className="addData-error-message">{errorMessage}</p>
        )}
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

          <div className="addData-input-div">
            <label className="addData-label" htmlFor="category">
              Select Category:
            </label>
            <select
              className="addData-input"
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
            <label className="addData-label" htmlFor="image">
              Image:
            </label>
            <input
              className="addData-input"
              type="file"
              id="image"
              onChange={handleImageChange}
            />
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
        
      </div>
    </>
  );
};

export default AddDataPage;
