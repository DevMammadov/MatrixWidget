import { isEmpty } from "@/Helpers/operations";
import { useStore } from "@/Store";

export const StepVM = () => {
  const { store, setStore, emptyStore } = useStore();

  const conditions = {
    0: true,
    1: store.service.selectedServices.length > 0,
    2: !isEmpty(store.worker.selectedWorker),
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
      setStore({ main: { step: tab } });
    }
  };

  const handleSuccess = () => {
    emptyStore(); // TODO: NOT WORKING
    setStore({
      main: {
        step: -1,
      },
      contact: {
        isSuccess: false,
      },
    });
  };

  return {
    step: store.main.step,
    isSuccess: store.contact.isSuccess,
    handleStepChange,
    handleTabChange,
    handleSuccess,
  };
};
