import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import useUserStore from "../store/UserStore";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn, error,user } = useUserStore();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      await signIn({ email, password }, navigate);
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
          Sign In
        </h2>
        {error && (
          <div style={{ color: "red", marginBottom: "12px", display: "flex", justifyContent: "center" }}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            autoFocus
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        {/* 
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="form2Example31">
                Remember me
              </label>
            </div>
          </div>

          <div className="col text-end">
            <a href="#!" style={{ fontSize: "0.95em" }}>
              Forgot password?
            </a>
          </div>
        </div> */}

        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-primary btn-block mb-4 w-100"
          style={{ fontWeight: 600, letterSpacing: "0.5px" }}
        >
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <NavLink to="/signup">Register</NavLink>
          </p>
          {/* <p>or sign up with:</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
              style={{ color: "#3b5998" }}
            >
              <i className="fab fa-facebook-f"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
              style={{ color: "#db4437" }}
            >
              <i className="fab fa-google"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
              style={{ color: "#1da1f2" }}
            >
              <i className="fab fa-twitter"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
              style={{ color: "#333" }}
            >
              <i className="fab fa-github"></i>
            </button>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default Login;