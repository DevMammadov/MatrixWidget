import { config } from "@/config";

const Header = () => {
  return (
    <header className="h-[120px] bg-gray-100 relative">
      <img
        src={config.logo}
        className="h-20 w-20 rounded-full absolute left-[10px] translate-y-3 bottom-0 z-10"
      />
      <div className="h-[30px] w-full absolute left-0 bottom-0 bg-white rounded-t-extra"></div>
    </header>
  );
};

export default Header;
