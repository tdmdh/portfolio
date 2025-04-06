import React from "react";
// import styles from "../styles/Contact.module.css";
// import { useState } from "react";
import  ContactForm  from "@/components/contact/ContactForm";
import { motion } from "framer-motion";



const Contact = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
          <ContactForm />
        </div>
      </motion.div>
    );
  };
  export default Contact; 