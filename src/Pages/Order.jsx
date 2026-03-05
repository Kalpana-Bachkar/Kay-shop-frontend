// import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useCart } from "../Context/cartContext";


function Order({ cart }) {

    const {placeOrder,address,setAddress,setCartCount}=useCart()

  // const [address, setAddress] = useState({
  //   fullName: "",
  //   phone: "",
  //   street: "",
  //   city: "",
  //   state: "",
  //   pincode: "",
  // });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.priceOnAddTime * item.quantity,
    0
  );
  const handlePlaceOrder=async()=>{
    const result=await placeOrder(address);
    if(result.success){
      alert("order placed successfully")
    //  setCartCount(0)
    }
    else{ 
      alert("something went wrong ",result.message);
    }
  }

  return (
    <div className="checkout-wrapper py-5">
      <div className="container">
        <div className="row g-4">

          {/* LEFT SIDE - ADDRESS FORM */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="fw-bold mb-4">Delivery Address</h4>

              <div className="row g-3">
                <div className="col-md-12">
                  Name
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    name="name"
                    value={address.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  Phone Number
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    name="phone"
                    value={address.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  Address
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Street Address"
                    name="street"
                    value={address.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pincode"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 p-4">
              <h4 className="fw-bold mb-4">Order Summary</h4>

              {cart.map((item) => (
                <div
                  className="d-flex justify-content-between mb-3"
                  key={item.productId._id}
                >
                  <div>
                    <div>{item.productId?.name}</div>
                    <small className="text-muted">
                      Qty: {item.quantity}
                    </small>
                  </div>
                  <div className="fw-bold">
                    ₹{item.priceOnAddTime * item.quantity}
                  </div>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
          
              <button className="btn btn-dark w-100 mt-4"
              onClick={handlePlaceOrder} >
                Place Order
              </button>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Order;