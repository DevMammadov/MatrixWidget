import { TFilial } from "@/Modes/Step/Filials/TFilials";
import { TContext, TStore } from "@/Store/TStore";

export const initialValues: TStore = {
  main: {
    step: -1,
  },
  service: {
    selectedServices: [],
    services: [],
    loading: false,
  },
  worker: {
    loading: false,
    selectedWorker: null,
    workers: [],
  },
  time: {
    loading: false,
    selectedDate: null,
    selectedTime: "",
    workDates: [],
  },
  filial: {
    filials: [],
    selectedFilial: {} as TFilial,
    loading: false,
  },
  contact: {
    isSuccess: false,
    isError: false,
    loading: false,
  },
};

export const useStore = () => {
  const appContext = React.useContext<TContext>(
    window.matrixContext as React.Context<TContext>
  );

  if (!appContext) {
    return {
      setStore: () => {},
      store: {} as TStore,
      emptyStore: () => {},
      setLoading: () => {},
      mergeStore: () => {},
    };
  }

  return appContext;
};
