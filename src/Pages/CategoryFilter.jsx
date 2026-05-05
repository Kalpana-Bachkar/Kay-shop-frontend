import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/cartContext";
 let BASE_URL= process.env.REACT_APP_SERVER_URL 
// const BASE_URL=""
 
export default function CategoryFilter() {
    const {category}=useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const{addToCart}=useCart();
  console.log(BASE_URL)

  
//  console.log("🔍 Category from URL:", category);
  useEffect(() => {
  fetch(`${BASE_URL}/productByCategory/${category}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    })
    .then(data => {
     
      setProducts(data.products);      // set the data received
      setLoading(false);      // turn off loading
    })
    .catch(err => {
      setError(err.message);  // show error
      setLoading(false);      // turn off loading
    });
}, [category]);


if (loading) return <p>Loading products...</p>;
if (error) return <p>Error: {error}</p>;


  return (
    <div className="container my-4">
      
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <Link to={`/productById/${product._id}`}>
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ objectFit: "contain", height: "200px" }}
              />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fs-6">{product.name}</h5>
                <p className="card-text flex-grow-1">{product.description}</p>
                <h6 className="mt-auto">${product.price.toFixed(2)}</h6>
                   {/* <Link to={`/product/${product._id}`} className="btn btn-primary">
                  View Details
                </Link> */}

                 <div className="d-flex gap-2">
                                  <Link
                                      to={`/productById/${product._id}`}
                                      className="btn btn-outline-secondary w-50"
                                   >
                                     Details
                                   </Link>
                
                                      <button
                                       className="btn btn-primary w-50"
                                      onClick={() => addToCart(product._id, 1)}
                                       >
                                      Add
                                    </button>
                                   </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}

