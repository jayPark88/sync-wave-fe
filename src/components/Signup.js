import React, { useState } from "react";
import axios from "../util/axiosInstance";

function Signup() {
  const [formData, setFormData] = useState({ userName: "", password: "", nickName: "", phone: "",  email: ""});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/v1/user/signUp", formData);
      alert("Signup successful!");
    } catch (error) {
      alert("Signup failed!");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="Username" value={formData.userName} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="nickName" name="nickName" placeholder="nickName" value={formData.nickName} onChange={handleChange} />
        <input type="phone" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
