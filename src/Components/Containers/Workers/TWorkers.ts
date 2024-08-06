export type TWorkersDSO = {
  dateTime: string | null;
  endingDateTime: string | null;
  filialId: string;
  langId: string;
  serviceId: string[] | null;
  startingDateTime: string | null;
  tenantId: string;
};

export type TWorkDate = {
  date: string;
  timeSlots: string[];
};

export type TWorker = {
  employeeEndTimeOfDay: string;
  employeeStartTimeOfDay: string;
  id: string;
  name: string;
  photoUrl: string | null;
  position: string;
  workDates: TWorkDate[];
};

export type TWorkersWithTime = {
  worker: TWorker;
  workDate?: TWorkDate;
  dayName?: string;
  diffInDays?: number;
};
