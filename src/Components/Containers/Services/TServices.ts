export type TService = {
  duration: number;
  filialId: string | null;
  id: string;
  name: string;
  price: number;
  serviceId: string;
  showInWidget: boolean;
};

export type TWorkerServicesDTO = {
  filialId: string | null;
  employeeId: string | null;
  time: string | null;
};
