import "./ServiceProvider.css";
import { Link } from "react-router-dom";

const ServiceProviderList = ({ providerInfo }) => {
  return (
    <>
      <div className="popular-services">
        <div className="provider-info">
          {providerInfo.map((provider, index) => (
            <div className="provider-card" key={index}>
              <img
                src={provider.image_url}
                alt="ProviderImage"
                onError={(e) => {
                  e.target.src = "/No_Image_Available.jpg";
                }}
              ></img>
              <div className="provider-card-details">
                <div className="tag-price">
                  <div className="service-tag">{provider.category}</div>
                  <div className="price">&#8377;{provider.price}/hour </div>
                </div>
                <div className="business-name">
                  <h3>{provider.business_name}</h3>
                </div>
                <div className="provider-name" style={{ color: "blue" }}>
                  {provider.name}
                </div>
                <div className="address">{provider.address}</div>
                <Link to="/Login" className="book-btn">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    {providerInfo.length == 0 && (
        <div className="no-provider" style={{display: "flex" , justifyContent: "center", alignItems: "center" , fontSize: "2rem"}}>
            No provider found
        </div>
    )}
    </>
  );
};

export default ServiceProviderList;
