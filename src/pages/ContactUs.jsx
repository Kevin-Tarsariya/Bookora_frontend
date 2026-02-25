import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({}); // To store validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // Remove error message when user types
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Invalid email address';
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject.trim().length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            alert("Message submitted!");
            // Clear form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 text-white px-4 py-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-yellow-300">Get in Touch</h2>
                    <p className="text-zinc-400 text-lg">
                        We'd love to hear from you. Whether you have a question about features or anything else.
                    </p>
                    <div className="space-y-4 text-zinc-300 text-base">
                        <p className="flex items-center gap-3">
                            <FaEnvelope className="text-blue-500" /> support@bookora.com
                        </p>
                        <p className="flex items-center gap-3">
                            <FaPhoneAlt className="text-blue-500" /> +91 99999 99999
                        </p>
                        <p className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-blue-500" /> 18 KDK Mall, Surat City, India
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-zinc-800 p-8 rounded-2xl shadow-lg space-y-4"
                >
                    <h2 className="text-3xl text-yellow-400 font-semibold">Contact Us</h2>

                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white"
                        />
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
