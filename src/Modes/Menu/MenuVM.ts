import { EMenuNavigate } from '@/Data/enum';
import { useStore } from '@/Store';

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
    setStore({
      main: {
        step: step || store.main.step + 1,
      },
    });
  };

  return {
    step: store.main.step,
    isSuccess: store.contact.isSuccess,
    mainStep,
    setMainStep,
    handleNavigate,
    handleStepChange,
  };
};
