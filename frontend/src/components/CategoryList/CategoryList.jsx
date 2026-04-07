import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import HandymanIcon from "@mui/icons-material/Handyman";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import GrassIcon from '@mui/icons-material/Grass';
import PestControlIcon from '@mui/icons-material/PestControl';
import "./CategoryList.css";

const icons = {
  cleaning: <CleaningServicesIcon sx={{ fontSize: 32 }} />,
  construction: <HandymanIcon sx={{ fontSize: 32 }} />,
  plumbing: <PlumbingIcon sx={{ fontSize: 32 }} />,
  local_shipping: <LocalShippingIcon sx={{ fontSize: 32 }} />,
  format_paint: <FormatPaintIcon sx={{ fontSize: 32 }} />,
  electrical_services: <ElectricBoltIcon sx={{ fontSize: 32 }} />,
  gardening: <GrassIcon sx={{ fontSize: 32 }} />,
  pest_control: <PestControlIcon sx={{ fontSize: 32 }} />,
};

function CategoryList({ categoryList }) {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/Services/${category.name}`);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="categories-section max-width">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Explore Our Services
      </motion.h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="categories-grid"
      >
        {categoryList.map((category, index) => (
          <motion.div 
            key={index}
            variants={item}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => handleCategoryClick(category)}
            className="category-card"
          >
            <div className="category-icon-wrapper" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
              {icons[category.icon]}
            </div>
            <h3>{category.name}</h3>
          </motion.div> 
        ))}
      </motion.div>
    </section>
  );
}

export default CategoryList;
