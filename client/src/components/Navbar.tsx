import { FaCartShopping, FaUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user } = useUserContext();
  return (
    <div className="fixed w-full">
      <nav className="mx-auto flex h-16 w-full max-w-screen-xl items-center">
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
            <NavLink to={"/register"}>Register</NavLink>
          </li>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/logout"}>Logout</NavLink>
          </li>
        </ul>
        <ul className="ml-auto flex gap-8">
          <li className="text-lg">
            <button>
              {user && "Account"}
              <FaUser />
            </button>
          </li>
          <li className="text-xl">
            <button>
              <FaCartShopping />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
