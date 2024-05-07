// /dashboard/editData/[id]/page.js

"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import DashboardNavbarComponent from '@/app/components/Navbar2/navbar2';
import "bootstrap/dist/css/bootstrap.min.css";
import "./editData.css";


const EditDataPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch data for the specified ID
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      console.log(id);
      const response = await axios.get(`/api/userData/${id}`);
      const { title, category, description, imageURL } = response.data;
      setTitle(title);
      setCategory(category);
      setDescription(description);
      setImageURL(imageURL);
    } catch (error) {
      console.error('Error fetching data:', error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/userData/${id}`, {
        title,
        category,
        description,
        imageURL
      });
      console.log(response.data);
      alert("Data Updated Successfully");
      router.push('/dashboard'); // Redirect to dashboard after successful submission
    } catch (error) {
      console.error('Error updating data:', error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
    <DashboardNavbarComponent/>
    <div className='editData-parent-div'>
      <h1 className='editData-heading'>Edit Data</h1>
      <form className='editData-submit-form' onSubmit={handleSubmit}>
        <div className='editData-input-div'>
          <label className='editData-label' htmlFor="title">Title:</label>
          <input
            className='editData-input'
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='editData-input-div'>
          <label className='editData-label' htmlFor="category">Category:</label>
          <select
            className='editData-input'
            id="category"
            value={category}
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
        <div className='editData-input-div'>
          <label className='editData-label' htmlFor="description">Description:</label>
          <textarea
            className='editData-input'
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className='editData-submit-button' type="submit">Submit</button>
      </form>
      {errorMessage && <p className='editData-error-message'>{errorMessage}</p>}
    </div>
    </>
  );
};

export default EditDataPage;
