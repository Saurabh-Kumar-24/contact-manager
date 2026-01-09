

import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm({ fetchContacts }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});


  const validate = () => {
    let err = {};

    if (!form.name.trim()) {
      err.name = "Name is required";
    }

    if (!form.email) {
      err.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "Enter a valid email address";
    }

    if (!form.phone) {
      err.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      err.phone = "Phone number must be 10 digits";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  
  const isFormValid =
    form.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    /^\d{10}$/.test(form.phone);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    fetchContacts();
  };

  return (
    <div className="form-container">
      <h3>Contact Form</h3>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <textarea
          name="message"
          placeholder="Message (Optional)"
          value={form.message}
          onChange={handleChange}
        />

        {/* ✅ Disabled button */}
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
}