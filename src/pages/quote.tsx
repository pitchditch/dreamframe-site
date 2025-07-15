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

    try {
      const res = await fetch("https://bcpressurewashing.ca/api/sendquote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteDetails),
      });

      if (res.ok) {
        alert("✅ Quote sent successfully!");
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
      <h1 style={titleStyle}>📨 Request a Free Qu
