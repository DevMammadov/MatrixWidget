import Radio from "@/Components/Shared/Radio";
import { config } from "@/config";

type TUserSelectItem = {
  title: string;
  text: string;
  onChange?(): void;
  img?: string;
  checked?: boolean;
};

const UserSelectItem = ({
  title,
  text,
  img,
  checked,
  onChange,
}: TUserSelectItem) => {
  return (
    <div
      className="flex items-center w-full justify-between cursor-pointer select-none hover:bg-gray-50 py-1"
      onClick={onChange}
    >
      <img
        src={img || config.defaultFilialLogo}
        className="h-[40px] w-[40px] rounded-full"
      />
      <div className="flex flex-col flex-1 ml-5 w-full">
        <h1>{title}</h1>
        <h3 className="text-sm text-gray-500 whitespace-nowrap truncate max-w-[80%]">
          {text}
        </h3>
      </div>
      <Radio name={title} onChange={onChange} checked={checked} />
    </div>
  );
};

export default UserSelectItem;
