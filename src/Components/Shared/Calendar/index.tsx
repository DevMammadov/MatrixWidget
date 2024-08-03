import Horizontal from "@/Components/Shared/Calendar/Horizontal";
import {
  TCalendar,
  TCalendarMode,
} from "@/Components/Shared/Calendar/TCalendar";
import Vertical from "@/Components/Shared/Calendar/Vertical";
import { clsx } from "@/Helpers/clsx";
import { TDayJS } from "@/types";

const Calendar = ({
  endDate,
  startDate,
  locale,
  selectedDate,
  disabled,
  onChange,
  className,
  onMonthChange,
  loading,
}: TCalendar) => {
  const [mode, setMode] = React.useState<TCalendarMode>("horizontal");

  const startOfDate = React.useMemo(() => {
    return window.dayjs(startDate);
  }, [startDate]);

  const endOfDate = React.useMemo(() => {
    return endDate
      ? window.dayjs(endDate)
      : window.dayjs().add(3, "month").endOf("month");
  }, [endDate]);

  const handleSelect = (date: TDayJS) => {
    onChange?.(date);
  };

  return (
    <div className={clsx("border rounded-sm py-7 px-2", className)}>
      {mode === "horizontal" ? (
        <Horizontal
          startDate={startOfDate}
          endDate={endOfDate}
          locale={locale}
          selectedDate={selectedDate}
          onChange={handleSelect}
          onChangeMode={() => setMode("vertical")}
          disabled={disabled}
          loading={loading}
        />
      ) : (
        <Vertical
          startDate={startOfDate}
          endDate={endOfDate}
          locale={locale}
          selectedDate={selectedDate}
          onChange={handleSelect}
          onChangeMode={() => setMode("horizontal")}
          disabled={disabled}
          onMonthChange={onMonthChange}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Calendar;
