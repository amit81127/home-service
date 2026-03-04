import "./Home.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar/SearchBar";
import CategoryList from "../../components/CategoryList/CategoryList";
import Footer from "../../components/Footer/Footer";
import Typewriter from "typewriter-effect";

function Home() {
  const [categories, setCategories] = useState([]);
  const [providerInfo, setProviderInfo] = useState([]);

  useEffect(() => {
    getCategoriesList();
    getProviderInfo();
  }, []);

  const getCategoriesList = () => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("error"));
  };

  const getProviderInfo = () => {
    axios
      .get("/api/serviceProviderinfo")
      .then((res) => setProviderInfo(res.data))
      .catch((err) => console.log("error"));
  };

  return (
    <>
      <Navbar></Navbar>
      <section className="hero-section">
        <div className="hero-section-container">
          <div className="hero">
            <h2 className="headline">
              <div>
                Trusted <span className="blue">Home Services</span> At
              </div>
              <div>
                <span>Your Fingertips</span>
              </div>
            </h2>
            <h2 className="subheadline">
              Find best home services/repairs near you
            </h2>
          </div>
          <Searchbar />
        </div>
        <div className="type-writer">
          <span>Avaliable at </span>
          <span className="type-writer-text">
            <Typewriter 
            style={{color:"var(--primary-color) !important"}}
            options={{
              strings: ["Srinagar", "Chauras", "Srikot", "Kirtinagar"],
              autoStart: true,
              loop: true,
              pauseFor : 3000
            }}
          />
          </span> 
        </div>
      </section>
      <CategoryList categoryList={categories} />
      <Footer />
    </>
  );
}

export default Home;
