import { getDayName } from "@/Components/Shared/Calendar/helpers";
import { TDayButton } from "@/Components/Shared/Calendar/TCalendar";
import { clsx } from "@/Helpers/clsx";

const DayButton = ({
  active,
  disabled,
  date,
  itemWidth,
  onChange,
}: TDayButton) => {
  return (
    <button
      className={clsx(
        "flex flex-col justify-center items-center gap-1 focus:outline-none text-gray-600",
        disabled && "cursor-default text-gray-200"
      )}
      style={{ width: itemWidth, flexShrink: 0 }}
      key={date.toDate().toString()}
      onClick={() => onChange(date)}
      disabled={disabled}
    >
      <h1
        className={clsx(
          "text-3xl gap-1 leading-6",
          active && "text-6xl font-bold"
        )}
      >
        {window.dayjs(date).format("DD")}
      </h1>
      <span
        className={clsx(
          "text-center leading-3",
          active && "text-4xl mt-3 font-bold"
        )}
      >
        {getDayName(date)}
      </span>
    </button>
  );
};

export default DayButton;
