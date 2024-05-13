// /dashboard/editData/[id]/page.js

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import DashboardNavbarComponent from "@/app/components/Navbar2/navbar2";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { imageDb } from "../../../../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./editData.css";
import { v4 as uuidv4 } from "uuid";

const EditDataPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    imageURL: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/userData/${id}`);
      const { title, category, description, imageUrl } = response.data;

      // Fetch and set new image if imageUrl exists
      if (imageUrl) {
        const imgs = await listAll(ref(imageDb, `dataImages/${imageUrl}`));
        const urls = await Promise.all(
          imgs.items.map((val) => getDownloadURL(val))
        );
        const imageURL = urls.length > 0 ? urls[0] : "";
        setData({ title, category, description, imageURL });
      } else {
        setData({ title, category, description });
      }
    } catch (error) {
      console.error("Error fetching data:", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const uploadImageAndData = async () => {
    try {
      let uniqueFileID = data.imageURL; // Assume keeping the same if no new image
      if (newImage) {

         // Check image size
      if (newImage.size > 5 * 1024 * 1024) {
        // Size exceeds 5MB
        setErrorMessage("Image size should be less than 5MB");
        return;
      }
        // Delete existing image from Firebase Storage
        if (data.imageURL) {
          const existingImageRef = ref(imageDb, data.imageURL);
          await deleteObject(existingImageRef);
        }
        const uniqueFilename = generateUniqueFilename(newImage.name);
        const imageRef = ref(imageDb, `dataImages/${uniqueFilename}/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        uniqueFileID = uniqueFilename;
      }

      // Update data state with the new imageUrl
      const updatedData = { ...data, imageUrl: uniqueFileID };
      await axios.put(`/api/userData/${id}`, updatedData);
      alert("Data updated Successfully!")
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating data:", error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImageAndData();
  };

  function generateUniqueFilename(originalFilename) {
    const extension = originalFilename.split(".").pop(); // Get the file extension
    return `${uuidv4()}.${extension}`;
  }

  return (
    <>
      <DashboardNavbarComponent />
      <div className="editData-parent-div">
        <h1 className="editData-heading">Edit Data</h1>
        {errorMessage && (
          <p className="editData-error-message">{errorMessage}</p>
        )}
        <form className="editData-submit-form" onSubmit={handleSubmit}>
          <div className="editData-input-div">
            <label className="editData-label" htmlFor="title">
              Title:
            </label>
            <input
              className="editData-input"
              type="text"
              id="title"
              value={data.title || ""}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="editData-input-div">
            <label className="editData-label" htmlFor="category">
              Category:
            </label>
            <select
              className="editData-input"
              id="category"
              value={data.category || ""}
              onChange={(e) => setData({ ...data, category: e.target.value })}
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
          <div className="editData-input-div">
            <label className="editData-label" htmlFor="description">
              Description:
            </label>
            <textarea
              className="editData-input"
              id="description"
              value={data.description || ""}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
          <div className="editData-input-div">
            <label className="editData-label" htmlFor="existingImage">
              Existing Image:
            </label>
            <img
              src={data.imageURL || ""}
              alt="Existing Image"
              className="edit-data-existing-image"
            />
          </div>
          <div className="editData-input-div">
            <label className="editData-label" htmlFor="newImage">
              Select New Image:
            </label>
            <input
              className="editData-input"
              type="file"
              id="newImage"
              onChange={handleImageChange}
            />
          </div>
          <button className="editData-submit-button" type="submit">
            Submit
          </button>
        </form>
        
      </div>
    </>
  );
};

export default EditDataPage;
