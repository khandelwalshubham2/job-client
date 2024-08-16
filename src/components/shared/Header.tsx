import MobileNavLinks from "./MobileNavLinks";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <div className="container flex items-center justify-between py-2">
      <div className="text-3xl font-bold">
        Job<span className="text-primaryRed">Portal</span>
      </div>
      <div className="hidden md:flex">
        <NavLinks />
      </div>

      <div className="md:hidden">
        <MobileNavLinks />
      </div>
    </div>
  );
};

export default Header;
