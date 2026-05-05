
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order.order;
//   console.log(order)

  if (!order) {
    return (
      <div className="container text-center mt-5">
        <h3>No Order Found</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">

      {/* Success Header */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body text-center">

          <div className="text-success display-4">
            ✔
          </div>

          <h2 className="fw-bold">
            Order Placed Successfully!
          </h2>

          <p className="text-muted">
            Thank you for your purchase. Your order has been confirmed.
          </p>

        </div>
      </div>

      {/* Order Details */}
      <div className="card shadow-sm border-0 mb-4">

        <div className="card-header bg-white fw-bold">
          Order Details
        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-4">
              <p className="text-muted mb-1">
                Order ID
              </p>
              <h6>{order?._id}</h6>
            </div>

            <div className="col-md-4">
              <p className="text-muted mb-1">
                Order Date
              </p>
              <h6>
                {new Date(order.createdAt)
                  .toLocaleDateString()}
              </h6>
            </div>

            <div className="col-md-4">
              <p className="text-muted mb-1">
                Payment Method
              </p>
              <h6>{order?.paymentMethod}</h6>
            </div>

          </div>

        </div>

      </div>

      {/* Ordered Items */}
      <div className="card shadow-sm border-0 mb-4">

        <div className="card-header bg-white fw-bold">
          Items Ordered
        </div>

        <div className="card-body">

          {order?.orderItems?.map((item,index) => (
            

            <div
              key={index}
              className="row align-items-center border-bottom pb-3 mb-3"
            >

              {/* Product Name */}
              <div className="col-md-6">

                <h6 className="mb-1">
                  {item.name}
                </h6>

                <small className="text-muted">
                  Quantity: {item.quantity}
                </small>

              </div>

              {/* Price */}
              <div className="col-md-3">

                ₹{item.price}
              </div>

              {/* Total */}
              <div className="col-md-3 text-end fw-bold">

                ₹{item.totalPrice}

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Shipping Address */}
      <div className="card shadow-sm border-0 mb-4">

        <div className="card-header bg-white fw-bold">
          Shipping Address
        </div>

        <div className="card-body">

          <p className="mb-1">
            <strong>
              {order?.shippingAddress?.name}
            </strong>
          </p>

          <p className="mb-1">
            {order?.shippingAddress?.phone}
          </p>

          <p className="mb-1">
            {order?.shippingAddress?.street}
          </p>

          <p className="mb-1">
            {order?.shippingAddress?.city},{" "}
            {order?.shippingAddress?.state}
          </p>

          <p className="mb-0">
            {order?.shippingAddress?.pincode}
          </p>

        </div>

      </div>

      {/* Payment Summary */}
      <div className="card shadow-sm border-0 mb-4">

        <div className="card-header bg-white fw-bold">
          Payment Summary
        </div>

        <div className="card-body">

          <div className="d-flex justify-content-between fs-5 fw-bold">

            <span>Total Amount</span>

            <span>
              ₹{order?.totalAmount}
            </span>

          </div>

          <div className="mt-2">

            <span className="badge bg-warning text-dark me-2">
              Payment: {order?.paymentStatus}
            </span>

            <span className="badge bg-info text-dark">
              Status: {order?.orderStatus}
            </span>

          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="text-center">

        <button
          className="btn btn-primary me-3"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/orders")}
        >
          View My Orders
        </button>

      </div>

    </div>
  );
};

export default OrderSuccess;
