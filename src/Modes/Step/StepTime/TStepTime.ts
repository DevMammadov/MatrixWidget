import { TWorkDate } from '@/Components/Containers/Workers/TWorkers';

export type TStepTime = {
  onSubmit(): void;
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
