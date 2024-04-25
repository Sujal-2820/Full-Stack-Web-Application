"use client";

import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardNavbarComponent from "../components/Navbar2/navbar2";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./dashboard.css";
import Image from "next/image";
import Form from 'react-bootstrap/Form';


function DashboardPage() {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
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
                {/* Add more sorting options */}
              </select>
            </div>
          </Col>
          <Col sm={8} className="custom-dashboard-col2">
            <Row className="dashboard-col2-unique-row">
              <Col>
                <Card
                  className="dashboard-col2-unique-card"
                  style={{ width: "18rem" }}
                >
                  <Card.Img
                    variant="top"
                    style={{ height: "250px" }}
                    className="custom-dashboard-image-rendered"
                    src="/images/hacktober.png"
                  />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    style={{ height: "250px" }}
                    className="custom-dashboard-image-rendered"
                    src="/images/hash.png"
                  />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <Row className="dashboard-col2-unique-row">
              <Col>
                <Card
                  className="dashboard-col2-unique-card"
                  style={{ width: "18rem" }}
                >
                  <Card.Img
                    variant="top"
                    style={{ height: "250px" }}
                    className="custom-dashboard-image-rendered"
                    src="/images/sim-tech.png"
                  />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    style={{ height: "250px" }}
                    className="custom-dashboard-image-rendered"
                    src="/images/linkedin.png"
                  />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardPage;
