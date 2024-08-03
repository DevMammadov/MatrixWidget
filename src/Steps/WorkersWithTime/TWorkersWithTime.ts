import { TWorkDate } from "@/Steps/Time/TTime";
import { TWroker } from "@/Steps/Workers/TWorkers";

export type TWorkersWithTime = {
  worker: TWroker;
  workDate?: TWorkDate;
  dayName?: string;
  diffInDays?: number;
};
