import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/cartContext";
import '../styles/home.css';
let BASE_URL= process.env.REACT_APP_SERVER_URL 
// const BASE_URL="";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();


  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Handle if data is an object with products property
        const productsArray = Array.isArray(data) ? data : (data?.products || data?.data || []);
        setProducts(productsArray);
      })
      .catch(err => {
        // console.error("Fetch error:", err);
        setProducts([]); // Set empty array on error
      });
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="fashion-hero d-flex align-items-center">
        <div className="container text-white">
          <h1 className="hero-title">NEW SEASON ARRIVALS</h1>
          <p className="hero-subtitle">
            Elevate your wardrobe with timeless essentials.
          </p>
          <a href="#shop" className="btn btn-light hero-btn mt-3">
            SHOP COLLECTION
          </a>
        </div>
      </section>

      {/* CATEGORY STRIP */}
     <section className="container bestsellers-section">
  <div className="row g-4">
    <h2>Our Bestsellers</h2>

    {/* MEN */}
    <div className="col-md-6">
      
      <Link to="/productsByCategory/men" className="category-card">
        <img 
          src= "/images/CasualShirt.jpg"
          alt="Men Collection" 
        />
        <div className="overlay">
          <h3>MEN</h3>
        </div>
      </Link>
    </div>

    {/* WOMEN */}
    <div className="col-6 text-align-center">
      <Link to="/productsByCategory/women" className="category-card">
        <img 
          src="https://images.unsplash.com/photo-1763817959593-c3ec2b1ec257?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhbiUyMGV0aG5pYyUyMHdlYXJ8ZW58MHx8MHx8fDA%3D" 
          alt="Women Collection" 
        />
        <div className="overlay">
          <h3>WOMEN</h3>
        </div>
      </Link>
    </div>

  </div>
</section>


      {/* BRAND STORY SECTION */}
      <section className="brand-section text-center">
        <div className="container">
          <h2>MODERN. MINIMAL. TIMELESS.</h2>
          <p>
            Designed for individuals who appreciate subtle luxury and
            confident expression.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fashion-footer text-center ">
        <p>© 2026 Kay Shop. All Rights Reserved.</p>
      </footer>
    </>
  );
}