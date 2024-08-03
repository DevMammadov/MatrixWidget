export type TTime = {
  onSubmit?(): void;
};

export type TTimeDSO = {
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
  selected: string;
  onChange(time: string): void;
};
