import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return (
    <div className="h-navbar w-full px-4 text-brown-950 md:px-8">
      <nav className="mx-auto flex h-navbar w-full max-w-screen-xl items-center">
        <NavbarLogo />
        <NavbarLinks />
      </nav>
    </div>
  );
};

export default Navbar;
