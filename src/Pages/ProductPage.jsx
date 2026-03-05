import React from "react";
import { useState,useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import { useCart } from "../Context/cartContext";

function ProductPage() {
       const {id}=useParams();
      const [product, setProduct] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [review,setReview]=useState({username:"",rating:5,comment:""})
      const {addToCart}=useCart();
      // console.log(id)
    
    
      useEffect(() => {
        fetch(`http://localhost:5000/productById/${id}`)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
          })
          .then((data) => {
            // console.log(data.product);
            setProduct(data.product);
            
            setLoading(false);
          })
          .catch((e) => {
            setError(e.message);
            setLoading(false);
          });
      }, [id]);

      const handleSubmit=(e)=>{
       e.preventDefault();
       if(review.username&&review.comment){
        const addReview=[...(product.reviews),review];
        setProduct({...product,reviews:addReview})
        setReview({username:" ",rating:5,comment:""})

       }
      }
  

if (loading) return <Container className="mt-5">Loading...</Container>;
  if (error) return <Container className="mt-5">Error: {error}</Container>;
  if (!product) return <Container className="mt-5">Product not found</Container>;
  

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid className="product-image" />
        </Col>
        <Col md={6}>
          <h3 className="product-name">{product.name}</h3>
          
          <h3 className="mt-4">{product.description}</h3>
          <h3 className="text-success">₹{product.price}</h3>
          <Button variant="primary" className="mt-3"  onClick={() => addToCart(product._id, 1)}>
            Add to Cart
          </Button>
          
           <div>
          <h3 >Product Specifications</h3>
          <ul className="specifications">
          {      
            product.specifications && Object.entries(product.specifications).map(([key,value])=>{
              return(
              <li key={key}>
                {key} : {value}
              </li>)
            })
          }
          </ul>
          </div>
          <div className="mt-4 text-start">
            <Link to="/" className="btn btn-link">

            <Button className="mt-3" variant="secondary">
            Back to home
          </Button>
            
            </Link>
          </div>
           </Col>
           <Row>
            <Col md={6}>
          <div className="review-section">
            <h2 className="review-heading">Customer Review</h2>
            {
              product.reviews&&product.reviews.length>0 ?(
                product.reviews.map((review,index)=>{
                 return( <div className="review-card" key={index}>
                     <div>
                    <span> <h3 className="review-user">{review.username}</h3></span>
                    <span>
                    <p className="review-rating">{"⭐".repeat(review.rating)}</p></span>
                    </div>
                    <textarea className="review-comment">{review.comment}</textarea>
                     </div>
                )})

              ):(
                <h2>
                  No Reviews Yet
                </h2>
              )
            }
            
          </div>
           
           
           </Col>
           
           <Col md={6}>
          <div className="add-review">

          <h2 className="review-heading">Add a Review</h2>
          <form className="review-form" onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="add username"
            value={review.username}
            onChange={(e)=>setReview({...review,username:e.target.value})}
            required
            
            />
            <select  value={review.rating} onChange={e=>setReview({...review,rating:parseInt(e.target.value)})}>
               {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>{rating}  "⭐" </option>
            ))}
            </select>

            <textarea className="write-review"
            placeholder="write a review"
            value={review.comment}
            onChange={e=>setReview({...review,comment:e.target.value})
            }
            >

            </textarea>
          
             <Button type="submit" className="submit-button"> Submit Review</Button>

          </form>


          </div>
          </Col>
       </Row>
      </Row>
    </Container>
  );
}

export default ProductPage;
