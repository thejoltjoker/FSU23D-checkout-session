import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Footer = () => {
  const { user } = useUserContext();
  return (
    <footer className="h-40 w-full bg-stone-900 text-banana-50">
      <div className="mx-auto flex w-full max-w-screen-xl justify-between px-4 py-8">
        <h6 className="">King Kong's</h6>
        <ul className="flex gap-4 font-heading font-bold uppercase text-banana-400">
          <li>{!user && <NavLink to={"/register"}>Sign up</NavLink>}</li>
          <li>
            {user ? (
              <NavLink to={"/account"}>Account</NavLink>
            ) : (
              <NavLink to={"/login"}>Log in</NavLink>
            )}
          </li>
          <li>{user && <NavLink to={"/logout"}>Log out</NavLink>}</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
