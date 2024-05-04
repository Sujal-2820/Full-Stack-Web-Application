// /src/app/page.js (Home page, localhost:3000/)
'use client'

import React from 'react';
import NavbarComponent from './components/Navbar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './components/Header/header';
import AboutComponent from './components/About/About';
import Footer from './components/Footer/footer';


const Home = () => {
  
    return (
      <>
        <NavbarComponent/>
        <HeaderComponent/>
        <br/>
        <AboutComponent/>
        <br/><br/>
        <Footer/>
      </>
    )
  }
  
  export default Home;