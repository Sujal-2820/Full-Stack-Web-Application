// src/app/dashboard/page.js

"use client";

import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardNavbarComponent from "../components/Navbar2/navbar2";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useRouter } from "next/navigation";
import "./dashboard.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/userData");
      const { username, userData } = response.data;
      console.log(response.data);
      setUsername(username); // Set the username state
      setUserData(userData); // Set the user data state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      prompt("Are you sure to want to delete the Data? Type Yes");
      await axios.delete(`/api/userData/${id}`);

      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error.response.data.message);
      // Handle error
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
              {username && (
                <div className="user-info">
                  <p>Welcome {username}</p>
                </div>
              )}
              <h5 className="dashboard-content-heading">Topic Selection</h5>
              <div className="topic-selection-parent">
                <div className="topic-selection">
                  <Form.Check
                    inline
                    type="radio"
                    id="sports"
                    name="topic"
                    value="sports"
                    label="Sports"
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    type="radio"
                    id="technology"
                    name="topic"
                    value="technology"
                    label="Technology"
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    type="radio"
                    id="science-tech"
                    name="topic"
                    value="science-tech"
                    label="Science & Technology"
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    type="radio"
                    id="business-finance"
                    name="topic"
                    value="business-finance"
                    label="Business & Finance"
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    type="radio"
                    id="education"
                    name="topic"
                    value="education"
                    label="Education & Learning"
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    type="radio"
                    id="lifestyle"
                    name="topic"
                    value="lifestyle"
                    label="Lifestyle & Wellness"
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    type="radio"
                    id="home-garden"
                    name="topic"
                    value="home-garden"
                    label="Home & Garden"
                  />
                </div>
                <div className="topic-selection">
                  <Form.Check
                    inline
                    type="radio"
                    id="pets-animals"
                    name="topic"
                    value="pets-animals"
                    label="Pets & Animals"
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
                      src={data.imageURL || "/images/hacktober.png"}
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
                        onClick={() => {
                          const confirmation = window.prompt(
                            "Are you sure you want to delete the data? Type 'Yes' to confirm."
                          );
                          if (confirmation === "Yes") {
                            handleDelete(data._id);
                          }
                        }}
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
