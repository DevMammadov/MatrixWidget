import { EMenuNavigate, EMenuSteps } from "@/Data/enum";
import { useStore } from "@/Store";

const routing: Record<number, number[]> = {
  [EMenuNavigate.ChooseEmployee]: [],
  [EMenuNavigate.ChooseServices]: [
    EMenuSteps.Services,
    EMenuSteps.WorkerWithTime,
    EMenuSteps.Time,
    EMenuSteps.Contacts,
  ],
  [EMenuNavigate.ChooseDateTime]: [
    EMenuSteps.GeneralTime,
    EMenuSteps.WorkerWithTime,
    EMenuSteps.Services,
    EMenuSteps.Contacts,
  ],
};

export const MenuVM = () => {
  const { store, setStore } = useStore();
  const [mainStep, setMainStep] = React.useState<keyof typeof routing>();

  const handleStepChange = (step: number) => {
    if (mainStep) {
      const stepIndex = routing[mainStep].indexOf(step);

      console.log({
        step,
        stepIndex,
        mainStep,
        stepss: routing[mainStep][stepIndex + 1],
      });

      setStore({
        main: {
          step: routing[mainStep][stepIndex + 1],
        },
      });
    }
  };

  const handleNavigate = (index: keyof typeof routing) => {
    setMainStep(index);

    setStore({
      main: {
        step: routing[index][0],
      },
    });
  };

  return {
    step: store.main.step,
    isSuccess: store.contact.isSuccess,
    handleNavigate,
    handleStepChange,
    mainStep,
  };
};
