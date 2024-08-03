import { config } from "@/config";
import { TDayJS } from "@/types";

export const getDateInterval = (
  startDate?: TDayJS,
  endDate?: TDayJS
): TDayJS[] => {
  const dates: TDayJS[] = [];
  const _startDate = startDate || window.dayjs();
  const _endDate = endDate || window.dayjs().add(3, "month").endOf("month");

  for (
    let date = _startDate;
    date.isBefore(_endDate) || date.isSame(_endDate, "day");
    date = date.add(1, "day")
  ) {
    dates.push(date);
  }

  return dates;
};

export const getDayName = (date: TDayJS) => {
  return date.toDate().toLocaleDateString(config.langId || "ru", {
    weekday: "short",
  });
};

export const getMonthName = (date: TDayJS) => {
  return date
    .toDate()
    .toLocaleDateString(config.langId || "ru", { month: "long" });
};

export const scrollElementToCenter = (
  index: number,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  if (containerRef.current && index !== -1) {
    const dateButton = containerRef.current.children[index] as HTMLElement;
    const containerRect = containerRef.current.getBoundingClientRect();
    const dateButtonRect = dateButton.getBoundingClientRect();

    const containerScrollLeft = containerRef.current.scrollLeft;
    const offset =
      dateButtonRect.left - containerRect.left + containerScrollLeft;
    const containerCenter = containerRect.width / 2;
    const cardCenter = dateButtonRect.width / 2;

    const scrollPosition = offset - containerCenter + cardCenter;

    containerRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }
};

export const getCalendarWeeks = (
  date: TDayJS | null,
  weekStartsOnMonday = true
): (undefined | TDayJS)[][] => {
  if (!date) return [];

  const startOfMonth = date.startOf("month");
  const endOfMonth = date.endOf("month");
  const daysInMonth = endOfMonth.date();

  let startDay = startOfMonth.day();
  if (weekStartsOnMonday) {
    startDay = (startDay + 6) % 7;
  }

  const weeks = [];
  let currentWeek = [];

  for (let i = 0; i < startDay; i++) {
    currentWeek.push(undefined);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(
      window.dayjs(new Date(startOfMonth.year(), startOfMonth.month(), day))
    );

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  while (currentWeek.length < 7) {
    currentWeek.push(undefined);
  }

  if (currentWeek.some((day) => !!day)) {
    weeks.push(currentWeek);
  }

  return weeks;
};

export const getDaysOfWeek = (locale = "ru", weekStartsOnMonday = true) => {
  const daysOfWeek = [];
  const baseDate = new Date(1970, 0, 4); // Starting from Sunday

  for (let i = 0; i < 7; i++) {
    const day = new Date(baseDate);
    day.setDate(baseDate.getDate() + i);
    daysOfWeek.push(day.toLocaleDateString(locale, { weekday: "short" }));
  }

  if (weekStartsOnMonday) {
    return [...daysOfWeek.slice(1), daysOfWeek[0]];
  }

  return daysOfWeek;
};
