import _ from "lodash";
import { NavLink } from "react-router-dom";
import { useShoppingCartContext } from "../contexts/ShoppingCartContext";

const NavbarCartLink = () => {
  const { items } = useShoppingCartContext();
  return (
    <NavLink to={"/cart"} className="">
      <div className="absolute -right-1.5 -top-0.5 z-10 flex aspect-square size-6 items-center justify-center rounded-full border-[1.5px] border-brown-950 bg-brown-200 text-sm font-bold text-brown-950">
        {_.sumBy(items, "quantity")}
      </div>
      <span className="font-emoji">🍌</span>
    </NavLink>
  );
};

export default NavbarCartLink;
