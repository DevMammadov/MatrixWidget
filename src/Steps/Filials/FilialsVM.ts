import { getFilials } from "@/Api";
import { useStore } from "@/Store";

export const FilialsVM = () => {
  const { setStore, store, setLoading } = useStore();

  React.useEffect(() => {
    setLoading("filial", true);
    getFilials().then(({ data }) => {
      setStore({
        filial: {
          selectedFilial: data[0],
          filials: data,
          loading: false,
        },
      });
    });
  }, [setLoading, setStore]);

  return {
    filials: store.filial.filials,
    selectedFilial: store.filial.selectedFilial,
    setStore,
  };
};
