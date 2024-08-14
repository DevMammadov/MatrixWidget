import { useStore } from "@/Store";
import { TFilial } from "./Filials/TFilials";
import { EStepMode } from "@/Data/enum";

export const StepVM = () => {
  const { store, setStore } = useStore();

  const conditions = {
    0: true,
    1: !!store.filial.selectedFilial.id,
    2: !!store.worker.selectedWorker.id,
    3: store.service.selectedServices.length > 0,
    4: !!store.time.selectedTime,
  };

  const handleStepChange = (tab: number) => {
    setStore({ main: { step: tab } });
  };

  const handleTabChange = (tab: number) => {
    if (tab > store.main.step && conditions[tab as keyof typeof conditions]) {
      setStore({ main: { step: tab } });
    }

    if (tab < store.main.step) {
      setStore({
        worker: {
          selectedWorker: {
            id:
              tab < EStepMode.worker
                ? undefined
                : store.worker.selectedWorker.id,
          },
        },
        service: {
          selectedServices:
            tab < EStepMode.service ? [] : store.service.selectedServices,
        },
        time: {
          selectedTime: tab < EStepMode.time ? "" : store.time.selectedTime,
        },
      });

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
        currentDate: null,
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
