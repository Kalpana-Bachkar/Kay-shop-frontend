import { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
//import { loginUser } from "../services/user.service";
import {useAuth} from '../Context/userContext'



const Login = () => {
   const {login}=useAuth()
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const res=await login(formData);
    alert(res.message || "Login success");
    navigate('/')
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow"
        style={{ width: "320px" }}
      >
        <h2 className="text-center mb-4 fs-4 fw-bold">Login</h2>

        <div className="mb-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
