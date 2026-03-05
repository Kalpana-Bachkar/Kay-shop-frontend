import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/user.service";

const Register = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await registerUser(formData);
      if (res.success) {
        alert(res.message || "Registered successfully");
        setFormData({ username: "", email: "", password: "" });
         navigate("/");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-4 fw-bold text-primary">Create Account</h2>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError("")}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter username"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.username}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-success btn-lg w-100 fw-semibold"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-muted">
              Already have an account? 
              <a href="/login" className="text-decoration-none ms-2 fw-semibold">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;