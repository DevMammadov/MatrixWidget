import { TContext, TStore } from "@/Store/TStore";

export const useStore = () => {
  const appContext = React.useContext<TContext>(
    window.matrixContext as React.Context<TContext>
  );

  if (!appContext) {
    return {
      setStore: () => {},
      store: {} as TStore,
      emptyStore: () => {},
      setLoading: () => {},
      mergeStore: () => {},
    };
  }

  return appContext;
};
