import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../store/UserStore";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, error, setFormDataStore, sendOTP } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.password === formData.confirmPassword
    ) {
      setFormDataStore(formData);
      const success = await sendOTP(formData.email, navigate);
      if (success) {
        navigate("/otp", { state: { email: formData.email } });
      }
    } else {
      alert("Passwords don't match or fields are empty");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "32px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        borderRadius: "16px",
        background: "#fff",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4" style={{ fontWeight: 700 }}>
          Sign Up
        </h2>
        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "12px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {error}
          </div>
        )}
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            required
            autoFocus
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">
            Name
          </label>
          <input
            type="text"
            id="form2Example2"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example3">
            Password
          </label>
          <input
            type="password"
            id="form2Example3"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example4">
            Confirm Password
          </label>
          <input
            type="password"
            id="form2Example4"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>

        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-primary btn-block mb-4 w-100"
          style={{ fontWeight: 600, letterSpacing: "0.5px" }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Sign up"}
        </button>

        <div className="text-center">
          <p>
            Already a member? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;