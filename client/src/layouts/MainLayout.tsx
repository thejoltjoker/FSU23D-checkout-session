import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="h-full min-h-[calc(100vh-14rem)] px-4 py-8 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
