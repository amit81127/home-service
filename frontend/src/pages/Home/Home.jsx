import "./Home.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState , useRef} from "react";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import CategoryList from "../../components/CategoryList/CategoryList";
import Footer from "../../components/Footer/Footer";
import Typewriter from "typewriter-effect";
import ServiceProviderList from "../../components/ServiceProviderList/ServiceProviderList";

function Home() {
  const [categories, setCategories] = useState([]);
  const [providerInfo, setProviderInfo] = useState([]);
  const [category, setCategory] = useState("Popular")
  const serviceRef = useRef("null");

  const scroolToServices = ()=>{
    serviceRef.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(()=>{
    getProviderInfo(category);
  },[category])

  const getCategoriesList = () => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("error"));
  };

  const getProviderInfo = (category) => {
    axios
      .get(`/api/serviceProviderinfo?category=${category}`)
      .then((res) => setProviderInfo(res.data))
      .catch((err) => console.log("error"));
  };

  return (
    <>
      <Navbar ></Navbar>
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
          <Searchbar ref={serviceRef}/>
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
      <CategoryList categoryList={categories}/>
      <h2 style={{fontWeight : "500", marginTop: "20px", padding : "0 10px"}}>
          {category} Providers
      </h2>
      <ServiceProviderList providerInfo={providerInfo} currentCategory={category} />   
      <Footer />
    </>
  );
}

export default Home;
