import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Testimonial from "./pages/Testimonials";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Navbar from "./pages/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Booking from "./pages/Booking";
import Footer from "./pages/Footer";
import NotFound from "./components/404/NotFound";
import Plumbers from "./pages/Plumbers";
import Appointment from "./pages/Appointment";
import ServicesSection from './components/services/Hero';
import ServiceDetail from './components/services/ServiceDetail';
import Book from './pages/Book';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';

const AppRoutes = () => {
  return (
    <div className="poppins-regular">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plumbers" element={<Plumbers />} />
        <Route path="/plumbers/:city" element={<Plumbers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/appointment/:plumberId" element={<Appointment />} />
        <Route path="/book" element={<Book />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default AppRoutes;
