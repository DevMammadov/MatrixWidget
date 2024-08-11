import { TClientDTO } from "@/Components/Containers/Contacts/TContacts";
import { TService } from "@/Components/Containers/Services/TServices";
import { TWorkDay } from "@/Components/Containers/Time/TTime";
import { TWorker } from "@/Components/Containers/Workers/TWorkers";
import { TFilial } from "@/Modes/Step/Filials/TFilials";
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
  workers: TWorker[];
  selectedWorker: TWorker;
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
  isError: boolean;
  loading: boolean;
};

type TMainStore = {
  step: number;
};
