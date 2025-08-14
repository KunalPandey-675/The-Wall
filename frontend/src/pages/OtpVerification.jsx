import React, { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import useUserStore from "../store/UserStore";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { signUp, sendOTP, formData } = useUserStore();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) {
      alert("Missing signup data. Please go back and fill the form again.");
      navigate("/signup");
      return;
    }
    const finalData = {
      ...formData,
      otp,
    };
    console.log(finalData);
    signUp(finalData, navigate);
  };

  const handleResend = () => {
    if (formData?.email) {
      sendOTP(formData.email, navigate);
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
          OTP Verification
        </h2>
        {email ? (
          <p className="text-muted" style={{ marginTop: -8 }}>
            Code sent to {email}
          </p>
        ) : (
          <p className="text-muted" style={{ marginTop: -8 }}>
            Enter the code sent to your email
          </p>
        )}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="otpInput">
            One-time password
          </label>
          <input
            type="text"
            id="otpInput"
            className="form-control"
            name="otp"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="Enter 6-digit code"
            inputMode="numeric"
            autoFocus
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mb-3 w-100"
          style={{ fontWeight: 600, letterSpacing: "0.5px" }}
        >
          Verify
        </button>
        <div className="text-center mt-2">
          <NavLink to="/signup">Back to signup</NavLink>
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;