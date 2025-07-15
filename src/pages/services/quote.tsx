import React, { useState } from "react";

const containerStyle: React.CSSProperties = {
  maxWidth: "480px",
  margin: "40px auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontFamily: "Arial, sans-serif",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "600",
  marginBottom: "6px",
  display: "block",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  padding: "12px 20px",
  fontSize: "16px",
  borderRadius: "4px",
  cursor: "pointer",
};

const Quote = () => {
  const [quoteDetails, setQuoteDetails] = useState({
    name: "Jayden Fisher",
    email: "bcpressurewashing.ca@gmail.com",
    phone: "778-808-7620",
    service: "Pressure Washing",
    address: "15501 Marine Dr",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setQuoteDetails({ ...quoteDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://bcpressurewashing.ca/api/sendquote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteDetails),
      });

      if (res.ok) {
        alert("✅ Quote sent successfully!");
        setQuoteDetails({
          name: "",
          email: "",
          phone: "",
          service: "Pressure Washing",
          address: "",
          message: "",
        });
      } else {
        alert("❌ Failed to send quote.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        📨 Request a Free Quote
      </h1>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle} htmlFor="name">Name</label>
        <input
          style={inputStyle}
          type="text"
          id="name"
          name="name"
          value={quoteDetails.name}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="email">Email</label>
        <input
          style={inputStyle}
          type="email"
          id="email"
          name="email"
          value={quoteDetails.email}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="phone">Phone</label>
        <input
          style={inputStyle}
          type="tel"
          id="phone"
          name="phone"
          value={quoteDetails.phone}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="service">Service</label>
        <select
          style={inputStyle}
          id="service"
          name="service"
          value={quoteDetails.service}
          onChange={handleChange}
          required
        >
          <option value="Pressure Washing">Pressure Washing</option>
          <option value="Window Cleaning">Window Cleaning</option>
          <option value="Roof Cleaning">Roof Cleaning</option>
          <option value="Gutter Cleaning">Gutter Cleaning</option>
        </select>

        <label style={labelStyle} htmlFor="address">Address</label>
        <input
          style={inputStyle}
          type="text"
          id="address"
          name="address"
          value={quoteDetails.address}
          onChange={handleChange}
          required
        />

        <label style={labelStyle} htmlFor="message">Message</label>
        <textarea
          style={{ ...inputStyle, height: "100px" }}
          id="message"
          name="message"
          value={quoteDetails.message}
          onChange={handleChange}
          placeholder="Additional details or questions..."
        />

        <button style={buttonStyle} type="submit">Send Quote</button>
      </form>
    </div>
  );
};

export default Quote;
