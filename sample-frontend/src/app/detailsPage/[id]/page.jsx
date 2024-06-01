"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/app/components/Footer/footer";
import NavbarComponent from "@/app/components/Navbar/navbar";
import "./detailsPage.css";
import { useParams } from "next/navigation";
import axios from "axios";
import { imageDb } from "../../../../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import LoadingSpinner from "@/app/components/LoadingSpinner/loadingSpinner";



function DatasetDetailsPage() {
  const { id } = useParams();
  const [dataset, setDataset] = useState({
    title: "",
    date:"",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/userData/${id}`
      );
      const { title, date, description, imageUrl } = response.data;

      const imgs = await listAll(ref(imageDb, `dataImages/${imageUrl}`));
      const urls = await Promise.all(
        imgs.items.map((val) => getDownloadURL(val))
      );

      const imageURL = urls.length > 0 ? urls[0] : "";
      setDataset({ title, date, description, imageURL });
    } catch (error) {
      console.error("Error fetching dataset:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
    <NavbarComponent/>
    <div className="dataset-details">
      <img src={dataset.imageURL || "/images/hacktober.png"} alt="Dataset" />
      <p className="date">Published on: <b>{formatDate(dataset.date)}</b></p>
      <h2 className="title">{dataset.title}</h2>
      <p className="description">{dataset.description}</p>
    </div>
    <Footer/>
    </>
  );
}

export default DatasetDetailsPage;
