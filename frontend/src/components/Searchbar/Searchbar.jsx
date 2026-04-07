import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  
  const handleSearchOnchange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchValue.trim().length > 0) {
      navigate(`/SerchResult/${searchValue.trim()}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="search-container-premium"
    >
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon-inside" />
          <input
            type="search"
            name="search"
            placeholder="Search for repair, cleaning, shifting..."
            value={searchValue}
            onChange={handleSearchOnchange}
            className="search-input-premium"
          />
        </div>
        <button type="submit" className="search-submit-btn">
          Search Services
        </button>
      </form>
    </motion.div>
  );
}

export default Searchbar;
