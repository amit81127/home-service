import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ProviderSignup from "./pages/Signup/ProviderSignup/ProviderSignup";
import CustomerSignup from "./pages/Signup/CustomerSignup/CustomerSignup";
import SearchResult from "./pages/SearchResult/SearchResult";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import CustomerDashboard from "../src/pages/CustomerDashboard/CustomerDashboard"
import ProviderDashboard from "../src/pages/ProviderDashboard/ProviderDashboard"
import RoleBasedRoute from "./components/ProtectedRoutes/RoleBasedRoute";
import Bookings from "./pages/Bookings/Bookings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services/:category" element={<Services />} />
        <Route path="/SerchResult/:category" element={<SearchResult />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ProviderSignup" element={<ProviderSignup />} />
        <Route path="/CustomerSignup" element={<CustomerSignup />} />
        <Route
          path="/Customer_dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["customer"]}>
                <CustomerDashboard/>
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Provider_dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["service_provider"]}>
                <ProviderDashboard/>
              </RoleBasedRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
