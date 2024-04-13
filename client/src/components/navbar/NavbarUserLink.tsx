import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const NavbarUserLink = () => {
  const { user } = useUserContext();
  return (
    <NavLink to={user ? "/account" : "/login"}>
      {user ? (
        <span className="font-emoji">🐵</span>
      ) : (
        <span className="text-xl font-bold">Log in</span>
      )}
    </NavLink>
  );
};

export default NavbarUserLink;
