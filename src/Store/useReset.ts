import { useStore } from "./context";

export const useResetStore = () => {
  const { setStore } = useStore();

  const reset = () => {
    setStore({});
  };

  return reset;
};
