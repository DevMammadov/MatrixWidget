import { clsx } from "@/Helpers/clsx";
import { TInlineTimePicker } from "./TTime";

const InlineTimePicker = ({
  onChange,
  timeSlots,
  step = 15,
  isSelected,
}: TInlineTimePicker) => {
  const generateTimes = () => {
    const times = [];
    let currentTime = window.dayjs().hour(9).minute(0);
    const endTime = window.dayjs().hour(23).minute(0);

    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
      times.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(step, "minute");
    }
    return times;
  };

  return (
    <div className="p-3 w-full">
      {generateTimes().map((time, index) => (
        <div className="w-full flex" key={time}>
          <div className="w-[10%] h-[22px] flex gap-1 justify-center items-end">
            {time.split(":")[1].startsWith("0") && (
              <span>{time.split(":")[0]}</span>
            )}
            <span
              className={clsx(
                !time.split(":")[1].endsWith("0") && "invisible",
                "text-sm"
              )}
            >
              {time.split(":")[1]}
            </span>
          </div>
          <button
            className={clsx(
              "focus:outline-none flex-grow text-sm text-transparent",
              !timeSlots?.includes(time) && "bg-gray-150",
              timeSlots?.includes(time) && "hover:bg-gray-900 hover:text-white",
              index % 2 === 0 && "border-b",
              isSelected(time) && "bg-primary text-gray-900"
            )}
            onClick={() => onChange?.(time)}
          >
            {time}
          </button>
        </div>
      ))}
    </div>
  );
};

export default InlineTimePicker;
