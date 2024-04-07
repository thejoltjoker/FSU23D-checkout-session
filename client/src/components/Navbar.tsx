import { FaCartShopping, FaUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user } = useUserContext();
  return (
    <div className="relative z-50 h-navbar w-full">
      <nav className="mx-auto flex h-navbar w-full max-w-screen-xl items-center">
        <h3 className="me-12">
          <NavLink to={"/"}>
            <span className="text-xl">🌵</span>
            <span className="text-2xl">Cactify</span>
          </NavLink>
        </h3>
        <ul className="flex items-center gap-6 font-bold text-fern-900">
          <li>
            <NavLink to={"/plants"}>Plants</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
        </ul>
        <ul className="ml-auto flex gap-8">
          <li className="text-lg">
            <NavLink to={user ? "/account" : "/login"}>
              <FaUser />
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink to={"/cart"}>
              <FaCartShopping />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
