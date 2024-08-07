import { useStore } from "@/Store";
import { initialValues } from "@/Store/context";

export const MenuVM = () => {
  const { store, setStore } = useStore();
  const [mainStep, setMainStep] = React.useState(-1);

  const handleNavigate = (index: number) => {
    setMainStep(index);
    setStore({
      main: {
        step: 0,
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
    setStore(initialValues);
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
