"use client"

import { motion } from "framer-motion"

function LoadingThreeDotsJumping() {
    const dotVariants = {
        jump: {
            y: -30,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: 0.2 }}
            className="flex justify-center items-center gap-3"
        >
            <motion.div 
                className="w-5 h-5 rounded-full bg-blue-600" 
                variants={dotVariants} 
            />
            <motion.div 
                className="w-5 h-5 rounded-full bg-blue-600" 
                variants={dotVariants} 
            />
            <motion.div 
                className="w-5 h-5 rounded-full bg-blue-600" 
                variants={dotVariants} 
            />
        </motion.div>
    )
}

export default LoadingThreeDotsJumping