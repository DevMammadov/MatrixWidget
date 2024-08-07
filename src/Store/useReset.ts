import { initialValues, useStore } from "./context";

export const useResetStore = () => {
  const { setStore } = useStore();

  const reset = () => {
    setStore(initialValues);
  };

  return reset;
};
