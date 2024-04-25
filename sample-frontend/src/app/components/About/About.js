import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import "./About.css";

function AboutComponent() {
  return (
    <Container className="about-container">
      <Row>
        <Col>
          <Image
            className="about-page-image"          
            src="/images/Sujal-Soni1.jpg" // Path to your image in the public directory
            alt="Working" // Alt text for accessibility
            width={300} // Specify width of the image
            height={300} // Specify height of the image
          />
        </Col>
        <Col className="about-page-col2">
          <div className="about-page-heading">About Me</div>
          <div className="about-page-para">
            I'm Sujal Soni, a dedicated and passionate Full Stack Web Developer.
            With proficiency in technologies like Node.js, Express.js, React.js,
            and MongoDB, Firebase and Next JS. I've completed several projects showcasing my
            problem-solving abilities and attention to detail. I'm committed to
            continuous learning and growth, excited about contributing to
            innovative projects, and collaborating with talented teams.
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutComponent;
