import ArrowButton from "@/Components/Shared/ArrowButton";
import DayButton from "@/Components/Shared/Calendar/DayButton";
import {
  getDateInterval,
  getMonthName,
  scrollElementToCenter,
} from "@/Components/Shared/Calendar/helpers";
import { TInternalCalendar } from "@/Components/Shared/Calendar/TCalendar";
import { useI18 } from "@/i18next";
import { TDayJS } from "@/types";

const Horizontal = ({
  locale,
  selectedDate,
  onChange,
  startDate,
  endDate,
  onChangeMode,
  disabled,
  loading,
}: TInternalCalendar) => {
  const t = useI18();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const startOfDate = startDate.subtract(2, "day");

  const dateInterval = React.useMemo(
    () => getDateInterval(startOfDate, endDate),
    [endDate, startOfDate]
  );

  const isDisabled = (date: TDayJS) => {
    return disabled?.(date) || date.isBefore(startDate, "day");
  };

  const itemWidth = React.useMemo(() => {
    if (scrollRef.current) {
      const scrollRect = scrollRef?.current?.getBoundingClientRect();
      return scrollRect.width / 5;
    }
    return 80;
  }, [scrollRef.current]);

  React.useEffect(() => {
    if (selectedDate) {
      scrollElementToCenter(
        dateInterval.findIndex((d) => d.isSame(selectedDate, "day")),
        scrollRef
      );
    }
  }, [selectedDate, dateInterval]);

  const isValidDate = (date: TDayJS) => {
    return (
      !date.isBefore(startOfDate, "day") &&
      !date.isAfter(endDate, "day") &&
      !date.isSame(endDate, "day")
    );
  };

  const handleSelect = (date: TDayJS) => {
    if (isDisabled(date) && isValidDate(date)) {
      const toDate = date.isBefore(selectedDate, "day")
        ? date.subtract(1, "day")
        : date.add(1, "day");
      handleSelect(toDate);
    } else {
      onChange(date);
    }
  };

  const handleNavigate = (date?: TDayJS) => {
    if (date && isValidDate(date)) {
      handleSelect(date);
    }
  };

  return (
    <div>
      <div className="text-gray-600 flex flex-col gap-1">
        <div className="text-5xl capitalize text-center">
          {getMonthName(selectedDate || window.dayjs())}
        </div>
        <button
          className="text-sm text-center border-b-1 border-dashed self-center focus:outline-none"
          onClick={onChangeMode}
        >
          {t("chooseDateFromCalendar")}
        </button>
      </div>
      <div className="flex items-center pt-3">
        <ArrowButton
          direction="left"
          onClick={() => handleNavigate(selectedDate?.subtract(1, "day"))}
          disabled={
            !selectedDate || selectedDate.isSame(startOfDate, "day") || loading
          }
        />
        <div
          className="flex overflow-x-auto overflow-y-hidden hide-scrollbar py-3"
          ref={scrollRef}
        >
          {dateInterval.map((date) => (
            <DayButton
              active={date.isSame(selectedDate, "day")}
              date={date}
              disabled={isDisabled(date)}
              itemWidth={itemWidth}
              onChange={handleSelect}
              key={date.toDate().toString()}
              locale={locale}
            />
          ))}
        </div>
        <ArrowButton
          onClick={() => handleNavigate(selectedDate?.add(1, "day"))}
          disabled={
            !selectedDate || selectedDate.isSame(endDate, "day") || loading
          }
        />
      </div>
    </div>
  );
};

export default Horizontal;
