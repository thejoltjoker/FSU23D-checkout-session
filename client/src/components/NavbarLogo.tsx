import { NavLink } from "react-router-dom";

export const NavbarLogo = () => {
  return (
    <h3>
      <NavLink to={"/"} className="inline-flex">
        <span className="pr-1 text-2xl">🦍</span>
        <span className="text-3xl">King Kong's</span>
      </NavLink>
    </h3>
  );
};

export default NavbarLogo;
