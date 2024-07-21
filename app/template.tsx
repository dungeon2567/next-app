"use client";

import { motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
}


export default function Template({ children }) {
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="enter"
            transition={{ duration: 0.25 }}
        >
            {children}
        </motion.div>
    );
}