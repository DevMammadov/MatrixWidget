import Radio from "@/Components/Shared/Radio";
import { config } from "@/config";
import { clsx } from "@/Helpers/clsx";

type TUserSelectItem = {
  title: string;
  text: string;
  onChange?(): void;
  img?: string | null;
  phosphorIcon?: string;
  checked?: boolean;
  selectable?: boolean;
  swap?: boolean;
};

const UserSelectItem = ({
  title,
  text,
  img,
  checked,
  onChange,
  selectable = true,
  phosphorIcon,
  swap,
}: TUserSelectItem) => {
  const textStyle = "text-xl text-gray-500";

  return (
    <div
      className={clsx(
        "flex items-center py-1 px-1 rounded-md",
        selectable && "hover:bg-gray-100 cursor-pointer select-none"
      )}
      onClick={onChange}
    >
      <div className="text-[27px] h-[45px] w-[45px] shrink-0 rounded-full bg-cyan-100 flex justify-center items-center relative">
        {phosphorIcon ? (
          <i className={clsx(`${phosphorIcon}`, "absolute")} />
        ) : (
          <img
            src={img || config.defaultFilialLogo}
            className="rounded-full object-cover h-[45px] max-w-[45px]"
          />
        )}
      </div>
      <div className="flex flex-col flex-grow ml-5 gap-0 capitalize overflow-hidden">
        <h1 className={clsx(swap && textStyle)}>{title}</h1>
        <h3 className={clsx("whitespace-nowrap truncate text-sm", !swap && textStyle)}>
          {text}
        </h3>
      </div>
      {selectable && (
        <Radio
          name={title}
          onChange={onChange}
          checked={checked}
          className="ml-4"
        />
      )}
    </div>
  );
};

export default UserSelectItem;
