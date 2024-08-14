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

export type TWorkers = {
  onSubmit?(): void;
  workers: TWorkersWithTime[];
  buttonTitle?: string;
  loading?: boolean;
  selectedWorker(worker: TWorker, workDate?: TWorkDate): boolean;
  selectedTime?(worker: TWorker, workDate?: TWorkDate): string | false;
  onWorkerSelect(worker: TWorker, workDate?: TWorkDate): void;
  onTimeSelect?(time: string, worker: TWorker, workDate?: TWorkDate): void;
  withSlots?: boolean;
  showSubmitButton?: boolean;
  chooseAny?: boolean;
  classes?: {
    userContainer?: string;
  };
};

export type TWorkersVM = {
  workers: TWorkersWithTime[];
  onWorkerSelect(worker: TWorker, workDate?: TWorkDate): void;
};
