import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import ServiceProviderList from "../../components/ServiceProviderList/ServiceProviderList";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

function SearchResult() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [providerInfo, setProviderInfo] = useState([]);
  const [categoryName, selectCategoryName] = useState(""); 

  const handleCategoryChange = (e) => {
    navigate(`/Services/${e.target.value}`);
  };

  const categoryObj = {
    Popular : "Popular",
    Cleaning : "Cleaning",
    Repair : "Repairing",
    Plumbing : "Plumbling",
    Electrical  : "Electrical Work",
    Shifting : "Shifting",
    Gardening : "Gardening",
    Painting : "Painting",
    PestControl : "Pest Control",
  }

  useEffect(() => {
    selectCategoryName(categoryObj[category])
    getProviderInfo();
  }, [category]);

  const getProviderInfo = () => {
    axios
      .get(`/api/serviceProviderinfo?category=${category}`)
      .then((res) => setProviderInfo(res.data))
      .catch((err) => console.log("error"));
  };

  return (
    <div>
      <Navbar />
      <div className="services-top">
        <div className="service-top-heading">
          <h2 style={{ fontWeight: "500", marginTop: "20px", padding: "0 10px", color: "blue" , fontSize: "1rem"}}>
          Showiing search results for {categoryName} 
        </h2>
        </div >
      </div>
      <ServiceProviderList providerInfo={providerInfo} />
      <Footer />
    </div>
  );
}

export default SearchResult;
