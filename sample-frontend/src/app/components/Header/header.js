import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import './header.css';
import Button from 'react-bootstrap/Button';
import { useRouter } from "next/navigation";


function HeaderComponent() {

  const router = useRouter();


  const handlegotToDashboard = () => {
    router.push('/dashboard');
  }


  return (
    <Container className='header-page-container'>
      <Row>
        <Col>
          <div className='home-page-heading'>This is a project to showcase the working of a Full stack Web Application</div>
          <Button className='header-page-button' variant="outline-dark" size="lg" onClick={handlegotToDashboard}>Test this application</Button>
        </Col>
        <Col>
        <Image
            className='header-page-image'
            src="/images/working2.jpg" // Path to your image in the public directory
            alt="Working" // Alt text for accessibility
            width={400} // Specify width of the image
            height={400} // Specify height of the image
          />
        </Col>
      </Row>
    </Container>
  );
}

export default HeaderComponent;