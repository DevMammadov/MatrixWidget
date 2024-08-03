import { deepMerge } from "@/Helpers/operations";
import { TFilial } from "@/Steps/Filials/TFilials";
import { TWroker } from "@/Steps/Workers/TWorkers";
import { TStore } from "@/Store/TStore";
import { DeepPartial } from "@/types";

const initialValues: TStore = {
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
    selectedWorker: {} as TWroker,
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
    loading: false,
  },
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setState] = React.useState<TStore>(initialValues);

  const setStore = React.useCallback((newState: DeepPartial<TStore>) => {
    setState((prevStore) => {
      return { ...deepMerge({ ...prevStore }, newState) };
    });
  }, []);

  const mergeStore = React.useCallback(
    (newState: (prev: TStore) => DeepPartial<TStore>) => {
      setState((prevStore) => ({
        ...deepMerge(prevStore, newState(prevStore)),
      }));
    },
    []
  );

  const emptyStore = React.useCallback(() => {
    setState({ ...initialValues });
  }, [initialValues]);

  const setLoading = React.useCallback((key: keyof TStore, value: boolean) => {
    setState((prevStore) => {
      if (typeof prevStore[key] === "object") {
        return {
          ...deepMerge({ ...prevStore }, { [key]: { loading: value } }),
        };
      }
      return prevStore;
    });
  }, []);

  if (!window.matrixContext) {
    return <div>Loading...</div>;
  }

  return (
    <window.matrixContext.Provider
      value={{ store, setStore, emptyStore, setLoading, mergeStore }}
    >
      {children}
    </window.matrixContext.Provider>
  );
};

export default AppProvider;
