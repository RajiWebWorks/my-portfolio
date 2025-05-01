// Utility functions for animations, if needed beyond component logic
// For example, defining reusable framer-motion variants

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Adjust as needed
      delayChildren: 0.1,   // Adjust as needed
    },
  },
}; 