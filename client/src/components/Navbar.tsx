import _ from "lodash";
import { NavLink } from "react-router-dom";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";
import { useUserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user } = useUserContext();
  const { items } = useShoppingCartContext();
  return (
    <div className="text-brown-950 relative z-50 h-navbar w-full">
      <nav className="mx-auto flex h-navbar w-full max-w-screen-xl items-center">
        <h3 className="me-12">
          <NavLink to={"/"}>
            <span className="text-xl">🦍</span>

            <span className="text-2xl">King Kong's</span>
          </NavLink>
        </h3>

        <ul className="ml-auto flex gap-8 text-3xl">
          <li>
            <NavLink to={user ? "/account" : "/login"}>
              {user ? (
                <span className="font-emoji">🐵</span>
              ) : (
                <span className="text-xl font-bold">Log in</span>
              )}
            </NavLink>
          </li>
          <li className="relative">
            <NavLink to={"/cart"} className="">
              <div className="bg-brown-200 border-brown-950 text-brown-950 absolute -right-1.5 -top-0.5 z-10 flex aspect-square size-6 items-center justify-center rounded-full border-[1.5px] text-sm font-bold">
                {_.sumBy(items, "quantity")}
              </div>
              {/* <FaCartShopping /> */}
              <span className="font-emoji">🍌</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
