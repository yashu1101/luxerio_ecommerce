import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { AnimatePresence, motion } from "framer-motion";
export const AppLayout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar></Navbar>

      <Outlet></Outlet>
    </>
  );
};
