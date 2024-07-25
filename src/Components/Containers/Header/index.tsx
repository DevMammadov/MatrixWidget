import { config } from "@/config";

const Header = () => {
  return (
    <div className="h-[120px] bg-gray-100 relative">
      <img
        src={config.MatrixLogo}
        className="h-20 w-20 rounded-full absolute left-[10px] translate-y-3 bottom-0 z-10"
      />
      <div className="h-[30px] w-full absolute left-0 bottom-0 bg-white rounded-t-extra"></div>
    </div>
  );
};

export default Header;
