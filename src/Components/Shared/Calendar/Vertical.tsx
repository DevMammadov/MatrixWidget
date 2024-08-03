import ArrowButton from "@/Components/Shared/ArrowButton";
import {
  getCalendarWeeks,
  getDaysOfWeek,
  getMonthName,
} from "@/Components/Shared/Calendar/helpers";
import { TInternalCalendar } from "@/Components/Shared/Calendar/TCalendar";
import { clsx } from "@/Helpers/clsx";
import { TDayJS } from "@/types";

const Vertical = ({
  selectedDate,
  locale,
  onChange,
  endDate,
  startDate,
  onChangeMode,
  disabled,
  onMonthChange,
}: TInternalCalendar) => {
  const [internalDate, setInternalDate] = React.useState<TDayJS | null>(
    selectedDate
  );

  const dateToRender = React.useMemo(
    () => getCalendarWeeks(internalDate || window.dayjs()),
    [internalDate]
  );

  const weekDays = React.useMemo(() => getDaysOfWeek(locale), [locale]);

  const handlePreviousMonth = () => {
    if (internalDate) {
      setInternalDate(internalDate.subtract(1, "month"));
      onMonthChange?.(internalDate.subtract(1, "month").startOf("month"));
    }
  };

  const handleNextMonth = () => {
    if (internalDate) {
      setInternalDate(internalDate.add(1, "month"));
      onMonthChange?.(internalDate.add(1, "month").startOf("month"));
    }
  };

  const isDateDisabled = (date?: TDayJS) => {
    return !date || disabled?.(date) || date?.isBefore(startDate, "day");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <ArrowButton
          direction="left"
          onClick={handlePreviousMonth}
          disabled={!internalDate || internalDate.isSame(startDate, "month")}
        />
        <div className="capitalize text-5xl">
          {getMonthName(internalDate || window.dayjs())}{" "}
          {(internalDate || window.dayjs()).format("YYYY")}
        </div>
        <ArrowButton
          onClick={handleNextMonth}
          disabled={!internalDate || internalDate.isSame(endDate, "month")}
        />
      </div>
      <div>
        <div className="flex uppercase w-full">
          {weekDays.map((day) => (
            <div key={day} className="p-2 flex-1 text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {dateToRender.map((week, i) => (
            <div className="flex w-full" key={i}>
              {week.map((date, y) => (
                <button
                  className={clsx(
                    "p-2 flex-1 focus:outline-none active:scale-90 text-gray-600 rounded-md hover:bg-gray-900 hover:text-white",
                    isDateDisabled(date) &&
                      "text-gray-200 active:scale-100 cursor-default",
                    date?.isSame(selectedDate, "day") && "bg-primary"
                  )}
                  key={`${date?.toString()}${y}`}
                  disabled={isDateDisabled(date)}
                  onClick={() => {
                    onChange(date!);
                    onChangeMode();
                  }}
                >
                  {date ? date.format("D") : ""}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vertical;
