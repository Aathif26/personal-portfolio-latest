"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-4xl mx-auto"
    >
      <motion.div variants={fadeInLeft} className="lg:col-span-2">
        <ContactInfo />
      </motion.div>

      <motion.div
        variants={fadeInRight}
        className="lg:col-span-3 surface-2 rounded-2xl p-6 sm:p-8 gradient-border"
      >
        <ContactForm submitted={submitted} setSubmitted={setSubmitted} />
      </motion.div>
    </motion.div>
  );
}
