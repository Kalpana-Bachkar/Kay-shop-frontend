import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/cartContext";
import '../styles/home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
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
     <section className="container py-5">
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
    <div className="col-md-6 text-align-center">
      <Link to="/productsByCategory/women" className="category-card">
        <img 
          src="/images/Salwarsuits.png" 
          alt="Women Collection" 
        />
        <div className="overlay">
          <h3>WOMEN</h3>
        </div>
      </Link>
    </div>

  </div>
</section>

      {/* PRODUCT GRID
      <section id="shop" className="container py-5">
        <h2 className="section-title text-center mb-5">
          FEATURED COLLECTION
        </h2>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card fashion-card border-0">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                </Link>

                <div className="card-body text-center">
                  <h6 className="product-name">{product.name}</h6>
                  <p className="product-price">₹ {product.price}</p>

                  <button
                    className="btn btn-dark w-100 add-btn"
                    onClick={() => addToCart(product._id, 1)}
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

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
      <footer className="fashion-footer text-center py-4">
        <p>© 2026 YourBrand. All Rights Reserved.</p>
      </footer>
    </>
  );
}