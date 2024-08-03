import { TClientDTO } from "@/Steps/Contacts/TContacts";
import { TFilial } from "@/Steps/Filials/TFilials";
import { TService } from "@/Steps/Services/TServices";
import { TWorkDay } from "@/Steps/Time/TTime";
import { TWroker } from "@/Steps/Workers/TWorkers";
import { DeepPartial } from "@/types";

export type TStore = {
  main: TMainStore;
  service: TServicesStore;
  worker: TWorkersStore;
  time: TTimeStore;
  filial: TFilialStore;
  contact: TContactStore;
};

export type TContext = {
  store: TStore;
  setStore(data: DeepPartial<TStore>): void;
  mergeStore(newState: (prev: TStore) => DeepPartial<TStore>): void;
  setLoading(key: keyof TStore, value: boolean): void;
  emptyStore(): void;
};

type TServicesStore = {
  services: TService[];
  selectedServices: TService[];
  loading: boolean;
};

type TWorkersStore = {
  workers: TWroker[];
  selectedWorker: TWroker;
  loading: boolean;
};

type TTimeStore = {
  workDates: TWorkDay[];
  selectedDate: string | null;
  selectedTime: string;
  loading: boolean;
};

type TFilialStore = {
  filials: TFilial[];
  selectedFilial: TFilial;
  loading: boolean;
};

type TContactStore = {
  form?: TClientDTO;
  isSuccess: boolean;
  loading: boolean;
};

type TMainStore = {
  step: number;
};
