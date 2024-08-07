import { deepMerge } from "@/Helpers/operations";
import { TFilial } from "@/Modes/Step/Filials/TFilials";
import { TStore } from "@/Store/TStore";
import { DeepPartial } from "@/types";
import { initialValues } from "./context";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setState] = React.useState<TStore>(initialValues);

  const setStore = React.useCallback((newState: DeepPartial<TStore>) => {
    setState((prevStore) => {
      return { ...deepMerge({ ...prevStore }, newState) };
    });
  }, []);

  const mergeStore = React.useCallback(
    (newState: (prev: TStore) => DeepPartial<TStore>) => {
      setState((prevStore) => ({
        ...deepMerge(prevStore, newState(prevStore)),
      }));
    },
    []
  );

  const emptyStore = React.useCallback(() => {
    setStore(initialValues);
  }, [setStore]);

  const setLoading = React.useCallback((key: keyof TStore, value: boolean) => {
    setState((prevStore) => {
      if (typeof prevStore[key] === "object") {
        return {
          ...deepMerge({ ...prevStore }, { [key]: { loading: value } }),
        };
      }
      return prevStore;
    });
  }, []);

  if (!window.matrixContext) {
    return <div>Loading...</div>;
  }

  return (
    <window.matrixContext.Provider
      value={{ store, setStore, emptyStore, setLoading, mergeStore }}
    >
      {children}
    </window.matrixContext.Provider>
  );
};

export default AppProvider;
