// src/app/dashboard/page.js

"use client";
import "./dashboard.css";

import React, { useEffect, useState } from "react";


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardNavbarComponent from "../components/Navbar2/navbar2";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { imageDb } from "../../../firebase";
import { getDownloadURL, listAll, ref, deleteObject } from "firebase/storage";

function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (event) => {
    setSortBy(event.target.value); // Update only sortBy state
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Update selectedCategory state
  };
  

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/userData");
      const { userData } = response.data;
      console.log(userData);

      const formattedData = await Promise.all(
        userData.map(async (data) => {
          const imgs = await listAll(
            ref(imageDb, `dataImages/${data.imageUrl}`)
          );
          console.log("Image reference: ", imgs);
          const urls = await Promise.all(
            imgs.items.map((val) => getDownloadURL(val))
          );
          console.log(urls);

          const imageUrl = urls.length > 0 ? urls[0] : "";
          return { ...data, imageUrl };
        })
      );

      setUserData(formattedData);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    try {
      const confirmation = prompt(
        "Are you sure to want to delete the Data? Type Yes"
      );
      if (confirmation !== "Yes") {
        return; // If the user doesn't confirm, do nothing
      }

      // Delete image from Firebase Storage
      const imageRef = ref(imageDb, imageUrl);
      await deleteObject(imageRef);
      await axios.delete(`/api/userData/${id}`);

      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error.response.data.message);
      // Handle error
    }
  };


    const handleFilterData = async () => {
      try {
        const response = await axios.get("/api/userData"); // Fetch raw data
        const { userData } = response.data;
        console.log(userData);
    
        const formattedData = await Promise.all(
          userData.map(async (data) => {
            const imgs = await listAll(
              ref(imageDb, `dataImages/${data.imageUrl}`)
            );
            console.log("Image reference: ", imgs);
            const urls = await Promise.all(
              imgs.items.map((val) => getDownloadURL(val))
            );
            console.log(urls);
  
            const imageUrl = urls.length > 0 ? urls[0] : "";
            return { ...data, imageUrl };
          })
        );
    
        let filteredData = formattedData; // Initially set to all data
    
        // Apply category filtering if selectedCategory exists:
        if (selectedCategory) {
          filteredData = filteredData.filter(
            (data) => data.category === selectedCategory
          );
        }
    
        // Apply sorting based on sortBy:
        const sortedData = [...filteredData]; // Create a copy to avoid mutation
        sortedData.sort((data1, data2) => {
          const date1 = new Date(data1.date);
          const date2 = new Date(data2.date);
          if (sortBy === "newest") {
            return date2 - date1; // Newest to Oldest
          } else if (sortBy === "oldest") {
            return date1 - date2; // Oldest to Newest
          }
          return 0; // No sorting if sortBy is empty
        });
    
        setUserData(sortedData); // Update state with filtered and sorted data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  


  const truncateTitle = (title) => {
    const maxChars = 20;
    if (title.length > maxChars) {
      return title.slice(0, maxChars) + "...";
    }
    return title;
  };

  const truncateDescription = (description) => {
    const maxChars = 50;
    if (description.length > maxChars) {
      return description.slice(0, maxChars) + "...";
    }
    return description;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <DashboardNavbarComponent />
      <br />
      <Container>
        <Row>
          <Col sm={4} className="custom-dashboard-col1">
            <div className="dashboard-content-col1">
              <h5 className="dashboard-content-heading">Topic Selection</h5>
              <div className="topic-selection-parent">
                <div className="topic-selection">
                  <Form.Check
                    inline
                    className="radio-selection-dashboard"
                    type="radio"
                    id="Sports"
                    name="topic"
                    value="Sports"
                    label="Sports"
                    onChange={handleCategoryChange}
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    className="radio-selection-dashboard"
                    type="radio"
                    id="Technology"
                    name="topic"
                    value="Technology"
                    label="Technology"
                    onChange={handleCategoryChange}
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    className="radio-selection-dashboard"
                    type="radio"
                    id="Science & Technology"
                    name="topic"
                    value="Science & Technology"
                    label="Science & Technology"
                    onChange={handleCategoryChange}
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    className="radio-selection-dashboard"
                    type="radio"
                    id="Business & Finance"
                    name="topic"
                    value="Business & Finance"
                    label="Business & Finance"
                    onChange={handleCategoryChange}
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    className="radio-selection-dashboard"
                    type="radio"
                    id="Education & Learning"
                    name="topic"
                    value="Education & Learning"
                    label="Education & Learning"
                    onChange={handleCategoryChange}
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    className="radio-selection-dashboard"
                    type="radio"
                    id="Lifestyle & Wellness"
                    name="topic"
                    value="Lifestyle & Wellness"
                    label="Lifestyle & Wellness"
                    onChange={handleCategoryChange}
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    className="radio-selection-dashboard"
                    type="radio"
                    id="Home & Garden"
                    name="topic"
                    value="Home & Garden"
                    label="Home & Garden"
                    onChange={handleCategoryChange}
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    className="radio-selection-dashboard"
                    type="radio"
                    id="Pets & Animals"
                    name="topic"
                    value="Pets & Animals"
                    label="Pets & Animals"
                    onChange={handleCategoryChange}
                  />
                </div>
              </div>
            </div>

            <div className="dashboard-content-col1">
              <h4 className="dashboard-content-heading">Sort By:</h4>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="sort-dropdown"
              >
                <option value="">Select Sorting Option</option>
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
              </select>
            </div>
            <Button onClick={handleFilterData}>Show Filtered Data</Button>
          </Col>

          {/* Cards */}
          <Col sm={8} className="custom-dashboard-col2">
            <Row className="dashboard-col2-unique-row">
              {userData.map((data) => (
                <Col key={data._id}>
                  <Card
                    className="dashboard-col2-unique-card"
                    style={{ width: "18rem" }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ height: "250px" }}
                      className="custom-dashboard-image-rendered"
                      src={data.imageUrl || "/images/hacktober.png"}
                    />
                    <Card.Body>
                      <Card.Title>{truncateTitle(data.title)}</Card.Title>
                      <Card.Text>
                        {truncateDescription(data.description)}
                      </Card.Text>
                      <Card.Text>
                        Published on: <b>{formatDate(data.date)}</b>
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() =>
                          router.push(`/dashboard/editData/${data._id}`)
                        }
                      >
                        Update
                      </Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(data._id, data.imageUrl)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardPage;
