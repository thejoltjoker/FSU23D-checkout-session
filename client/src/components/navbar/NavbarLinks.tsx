import NavbarCartLink from "./NavbarCartLink";
import NavbarUserLink from "./NavbarUserLink";

const NavbarLinks = () => {
  return (
    <ul className="ml-auto flex gap-2 text-3xl md:gap-8">
      <li>
        <NavbarUserLink />
      </li>
      <li className="relative">
        <NavbarCartLink />
      </li>
    </ul>
  );
};

export default NavbarLinks;
