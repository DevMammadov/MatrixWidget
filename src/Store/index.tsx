import { deepMerge } from "@/Helpers/operations";
import { TContext, TStore } from "@/Store/TStore";
import { context } from "@/main";

const initialValues: TStore = {};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [store, setState] = React.useState<TStore>(initialValues);

  const setStore = (newState: Partial<TStore>) => {
    setState((prevStore) => deepMerge({ ...prevStore }, newState));
  };

  return context ? (
    <context.Provider value={{ store, setStore }}>{children}</context.Provider>
  ) : (
    children
  );
};

export const useStore = () => {
  const appContext = React.useContext<TContext>(context || {});

  if (!appContext) {
    return { setStore: () => {}, store: {} as TStore };
  }

  return appContext;
};
