import React from "react";

const PopUp = ({ message, onClose }) => (
  <div style={{
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
  }}>
    <div style={{
      background: "#fff", padding: "2rem", borderRadius: "8px", minWidth: "250px", textAlign: "center"
    }}>
      <p>{message}</p>
      <button
        onClick={onClose}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1.5rem",
          background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "25px",
          fontWeight: "bold",
          fontSize: "1rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "background 0.2s, transform 0.2s"
        }}
        onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #0056b3 0%, #007bff 100%)"}
        onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)"}
      >
        Close
      </button>
    </div>
  </div>
);

export default PopUp;