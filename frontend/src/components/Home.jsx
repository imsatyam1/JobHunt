import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./categoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.workstatus === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]); // Add user and navigate as dependencies to avoid potential issues

  return (
    <div className="max-w-full mx-auto overflow-x-hidden">
      <Navbar />
      <HeroSection className="w-full" />
      <CategoryCarousel className="w-full" />
      <LatestJobs className="w-full" />
      <Footer />
    </div>
  );
}

export default Home;
