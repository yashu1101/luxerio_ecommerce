import { motion } from "framer-motion";

export const AuthAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
};
