import { useStore } from "@/Store";

export const MenuVM = () => {
  const { store, setStore } = useStore();
  const [mainStep, setMainStep] = React.useState(0);

  const handleNavigate = (index: number) => {
    setMainStep(index);
    setStore({
      main: {
        step: 1,
      },
    });
  };

  const handleStepChange = (step?: number) => {
    const _step = typeof step === "number" ? step : undefined;

    setStore({
      main: {
        step: _step || store.main.step + 1,
      },
    });
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
        selectedFilial: {},
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
    mainStep,
    setMainStep,
    handleNavigate,
    handleStepChange,
    handleSuccess,
  };
};
