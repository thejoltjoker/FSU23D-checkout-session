import NavbarLinks from "./NavbarLinks";
import NavbarLogo from "./NavbarLogo";

const Navbar = () => {
  return (
    <nav className="h-navbar w-full px-4 text-brown-950 md:px-8">
      <div className="mx-auto flex h-navbar w-full max-w-screen-xl items-center">
        <NavbarLogo />
        <NavbarLinks />
      </div>
    </nav>
  );
};

export default Navbar;
