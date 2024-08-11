import { useStore } from "@/Store";
import { TFilial } from "./Filials/TFilials";

export const StepVM = () => {
  const { store, setStore } = useStore();

  const conditions = {
    0: true,
    1: store.service.selectedServices.length > 0,
    2: !!store.worker.selectedWorker.id,
    3: !!store.time.selectedTime,
  };

  const handleStepChange = (tab: number) => {
    setStore({ main: { step: tab } });
  };

  const handleTabChange = (tab: number) => {
    if (tab > store.main.step && conditions[tab as keyof typeof conditions]) {
      setStore({ main: { step: tab } });
    }

    if (tab < store.main.step) {
      if (tab === 0) {
        setStore({
          service: {
            selectedServices: [],
          },
        });
      } else if (tab === 1) {
        setStore({
          worker: {
            selectedWorker: {
              id: undefined,
            },
          },
        });
      } else if (tab === 2) {
        setStore({
          time: {
            selectedTime: "",
          },
        });
      }

      setStore({ main: { step: tab } });
    }
  };

  const handleSuccess = () => {
    setStore({
      main: {
        step: 0,
      },
      service: {
        selectedServices: [],
        services: [],
        loading: false,
      },
      worker: {
        loading: false,
        selectedWorker: { id: undefined },
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
    });
  };

  return {
    step: store.main.step,
    isSuccess: store.contact.isSuccess,
    isError: store.contact.isError,
    handleStepChange,
    handleTabChange,
    handleSuccess,
  };
};
