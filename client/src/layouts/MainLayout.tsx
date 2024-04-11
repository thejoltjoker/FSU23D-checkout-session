import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="px-8">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
