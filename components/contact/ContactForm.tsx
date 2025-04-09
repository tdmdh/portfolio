"use client"
import React, { useState } from "react";
import styles from "@/app/styles/Contact.module.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending...");

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        await response.json();
        if (response.ok) {
            setStatus("Message sent");
            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } else {
            setStatus("Error sending message. Try again later.");
        }
    };

    return (
        <div className={styles.main}>
            <p className={styles.title}>Contact me</p>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input type="text" className={styles.input} name="name" value={formData.name} onChange={handleChange} />

                    <label className={styles.label} htmlFor="email">E-mail</label>
                    <input type="email" className={styles.input} name="email" value={formData.email} onChange={handleChange} />

                    <label className={styles.label} htmlFor="message">Message</label>
                    <textarea className={styles.textarea} name="message" value={formData.message} onChange={handleChange} />

                    <button type="submit" className={styles.button}>Send</button>
                </form>
                {status && <p className={styles.status}>{status}</p>}
            </div>
        </div>
    );
};

export default ContactForm;
