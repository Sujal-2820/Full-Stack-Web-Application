import React, { useEffect, useState } from "react";
import "./listCards.css";
import { useRouter } from "next/navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { imageDb } from "../../../../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import LoadingSpinner from "../LoadingSpinner/loadingSpinner";

function ListCards() {
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/userData/publicRoute");
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
    } finally {
      setLoading(false);
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

  const randomCards = userData.sort(() => Math.random() - 0.5).slice(0, 3);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="listcards-container">
      <Row className="listcards-row">
        <span className="listcards-heading">Some  Published Datasets</span>
        <Col sm={12} className="listcards-col">
          <Row className="listcards-inner-row">
            {randomCards.map((data) => (
              <Col key={data._id} className="listcards-col-inner">
                <Card className="listcards-card" style={{ width: "20rem" }}>
                  <Card.Img
                    variant="top"
                    style={{ height: "250px" }}
                    className="listcards-card-image"
                    src={data.imageUrl || "/images/hacktober.png"}
                  />
                  <Card.Body>
                    <Card.Title className="listcards-card-title">
                      {truncateTitle(data.title)}
                    </Card.Title>
                    <Card.Text className="listcards-card-description">
                      {truncateDescription(data.description)}
                    </Card.Text>
                    <Card.Text className="listcards-card-date">
                      Published on: <b>{formatDate(data.date)}</b>
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="listcards-card-button-details"
                      onClick={() => router.push(`/detailsPage/${data._id}`)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ListCards;
