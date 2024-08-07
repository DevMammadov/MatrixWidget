import { useStore } from "@/Store";
import { initialValues } from "@/Store/context";

export const StepVM = () => {
  const { store, setStore } = useStore();

  const conditions = {
    0: true,
    1: store.service.selectedServices.length > 0,
    2: !!store.worker.selectedWorker,
    3: !!store.time.selectedTime,
  };

  const handleStepChange = (tab: number) => {
    setStore({ main: { step: tab } });
  };

  console.log({ store });

  const handleTabChange = (tab: number) => {
    if (tab > store.main.step && conditions[tab as keyof typeof conditions]) {
      setStore({ main: { step: tab } });
    }

    if (tab < store.main.step) {
      if (tab === -1) {
        setStore({
          service: {
            selectedServices: [],
          },
        });
      } else if (tab === 0) {
        setStore({
          worker: {
            selectedWorker: null,
          },
        });
      } else if (tab === 1) {
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
    setStore(initialValues);
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
