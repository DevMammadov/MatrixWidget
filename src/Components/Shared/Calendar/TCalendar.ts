import { TDayJS } from "@/types";

export type TCalendar = {
  startDate?: TDayJS;
  endDate?: TDayJS;
  selectedDate: TDayJS | null;
  disabled?(date: TDayJS): boolean;
  locale?: string;
  onChange?(date: TDayJS): void;
  className?: string;
  onMonthChange?(date: TDayJS): void;
  loading?: boolean;
};

export type TInternalCalendar = {
  startDate: TDayJS;
  endDate: TDayJS;
  selectedDate: TDayJS | null;
  locale?: string;
  onChange(date: TDayJS): void;
  onChangeMode(): void;
  disabled?(date: TDayJS): boolean;
  onMonthChange?(date: TDayJS): void;
  loading?: boolean;
};

export type TDayButton = {
  locale?: string;
  active: boolean;
  disabled?: boolean;
  date: TDayJS;
  itemWidth: number;
  onChange(date: TDayJS): void;
};

export type TCalendarMode = "vertical" | "horizontal";
