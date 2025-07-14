import React, { useState } from "react";

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

    // 🚀 Integrate Supabase, Resend, Twilio Here
    console.log("Quote sent:", quoteDetails);
    alert("Quote sent (simulation only). Email + SMS can be integrated.");
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>📨 Send a Quote</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Full Name</label>
        <input
          name="name"
          type="text"
          value={quoteDetails.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={quoteDetails.email}
          onChange={handleChange
