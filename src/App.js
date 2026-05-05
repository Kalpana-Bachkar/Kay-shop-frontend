import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
//import Cart from "./Pages/Cart";
//import Women from "./Pages/Women";
import ProductPage from "./Pages/ProductPage";
import CategoryFilter from "./Pages/CategoryFilter";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import { useAuth } from "./Context/userContext";
import { useCart } from "./Context/cartContext";
import { FaShoppingCart } from "react-icons/fa";
import Order from "./Pages/Order";
import OrderSuccess from "./Pages/OrderSuccess";
//import { useContext } from "react";

function App() {
  const { user, logout } = useAuth()
  const { cart, cartCount } = useCart()
  // console.log(user)
  // console.log(cart)
  console.log(cartCount)






  return (
    <BrowserRouter>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Kay Shop</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/productsByCategory/men">Men</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/productsByCategory/women">Women</Link>
                  </li>




                </ul>

                <ul>
                  <li className="nav-item float-end">

                    {user ? (
                      <div className="d-flex align-items-center">


                        <span className="me-3 fw-semibold">
                          Hello, {user.username}
                        </span>


                        <Link
                          to="/getcart"
                          className="nav-link position-relative me-3"
                        >
                          <FaShoppingCart size={22} />

                          {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                              {cartCount}
                            </span>
                          )}
                        </Link>


                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={logout}
                        >
                          Logout
                        </button>

                      </div>
                    ) : (
                      <div >

                        <button type="button" className="btn btn-info me-3">
                          <Link to="/login">Login
                          </Link>

                        </button>




                        <button type="button" className="btn btn-info">
                          <Link to="/register">Register</Link></button>




                      </div>)


                    }
                  </li>
                </ul>




              </div>
            </div >
          </nav >

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productById/:id" element={<ProductPage />} />

            <Route path="/productsByCategory/:category" element={<CategoryFilter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/getcart" element={< Cart />} />
            <Route path="/order" element={<Order cart={cart} />} />
            <Route path="/order-success" element={<OrderSuccess />}
            />

          </Routes>
        </div >
      </div>
    </BrowserRouter >
  );
}

export default App;
