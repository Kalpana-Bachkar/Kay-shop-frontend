import React from "react"

import { useCart } from "../Context/cartContext.js";
import { Link } from "react-router-dom";
export default function Cart(){

    const {cart,cartCount,loading,totalPrice,getCart, updateCart, deleteItem, clearCart }=useCart()
    // console.log(cart)
    console.log("Cart state in Cart page:", cart);


//     return(
//         <div>
//     {cart.length === 0 ? (
//     <p>Cart is empty</p>
//       ) : (

   
//     cart.map((item, index) => (
//         <div key={index}>
//             <p>Product ID: {item.productId}</p>
//             <p>Quantity: {item.quantity}</p>
//             <p>Price: {item.priceOnAddTime}</p>
//         </div>
//     ))
   
// )
// }
//  </div>

// )  


const handleIncrease = async (productId, currentQty) => {
  await updateCart(productId, currentQty + 1);
  getCart(); // refresh cart after update
};

const handleDecrease = async (productId, currentQty) => {
  if (currentQty <= 1) {
    await deleteItem(productId); // remove if qty becomes 0
  } else {
    await updateCart(productId, currentQty - 1);
  }
  
};
const handleDelete=async(productId)=>{
    await deleteItem(productId);
   
}

const handleClearCart=async()=>{
  await clearCart();
}

return (
  <div>

    {cart.length === 0 ? (
      <h1>Cart is empty</h1>
    ) : (

      <div className="container mt-4">
        <div className="align-text-center">
            <h1>Cart Summary</h1>
          
        </div>

        {cart.map((item) => (
          <div className="card mb-3 shadow-sm" key={item.productId._id}>
            <div className="row g-0 align-items-center">

              {/* LEFT SIDE - IMAGE */}
              <div className="col-md-3 text-center p-3">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "180px", objectFit: "contain" }}
                />
              </div>

              {/* RIGHT SIDE - DETAILS */}
              <div className="col-md-9">
                <div className="card-body">

                  <h5 className="card-title">
                    {item.productId?.name}
                  </h5>

                  <p className="text-success fw-semibold mb-1">
                    In Stock
                  </p>

                  <h4 className="fw-bold mb-3">
                    ₹{item.priceOnAddTime}
                  </h4>

                  <div className="d-flex align-items-center gap-3">
                    <button className="btn btn-outline-secondary btn-sm" onClick={()=>handleDecrease(item.productId._id,item.quantity)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={()=>handleIncrease(item.productId._id,item.quantity)}>+</button>
                    
                  </div>
                  <button className="btn btn-secondary mt-3 " onClick={()=>handleDelete(item.productId._id)}>
                   Delete 
                  </button>
                </div>
              </div>
             
              

            </div>
            
          </div>
        ))}
         <div className="row g-0 align-items-center shadow-sm border border-secondary-subtle mb-3">

                 <div className="col-md-3 text-center p-3">
                    <h3>Total</h3>
                    </div>
                    <div className="col-md-9  p-3">
                    <h3>{totalPrice}</h3>
                    </div>
                   
                </div>
                <div  className=" g-0 align-items-center mb-3">
                <Link to="/order">
                 <button className="btn btn-warning ">
                        Proceed to buy

                    </button>
                    </Link>
                    <button className="btn btn-warning float-end "
                    onClick={()=>handleClearCart()}>
                        Clear  Cart

                    </button>

                    </div>


      </div>
    )}

  </div>
)
}