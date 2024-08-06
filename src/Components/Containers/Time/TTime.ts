import { TDayJS } from '@/types';

export type TTime = {
  selectedDate: TDayJS | null;
  onCalendarChange(data: TDayJS): void;
  loading: boolean;
  timeSlots: string[];
  selectedTime?: string;
  onTimeSelect(time: string): void;
  categorize?: boolean;
  onMonthChange?(date: TDayJS): void;
  disabledDays?(date: TDayJS): boolean;
  inline?: boolean;
  onSubmit?(): void;
  buttonTitle?: string;
  showButton?: boolean;
};

export type TTimeDTO = {
  dateTime: string;
  employeeId: string;
  filialId: string;
};

export type TWorkDate = {
  date: string;
  timeSlots: string[];
};

export type TEmployee = {
  employeeEndTimeOfDay: string;
  employeeStartTimeOfDay: string;
  id: string;
  name: string;
  photoUrl: string;
  position: string;
  workDates: TWorkDate[];
  workDatesDay: number[];
};

export type TWorkDay = {
  date: string;
  timeSlots: string[];
};

export type TInlineTimePicker = {
  step?: number;
  timeSlots: string[];
  selected?: string;
  onChange(time: string): void;
};

export type TBadgeTimePicker = {
  timeSlots?: string[];
  selected?: string | false;
  onChange(time: string): void;
  categorize?: boolean;
};
