import { getFilialServices } from "@/Api";
import { TService } from "@/Components/Containers/Services/TServices";
import { useStore } from "@/Store";

export const StepServicesVM = () => {
  const { setStore, store } = useStore();
  const {
    filial: { selectedFilial },
    service: { services, loading, selectedServices },
  } = store;

  React.useEffect(() => {
    if (services?.length === 0) {
      setStore({ service: { loading: true } });
      getFilialServices(selectedFilial.id).then(({ data }) => {
        setStore({ service: { services: data, loading: false } });
      });
    }
  }, [services?.length, setStore, selectedFilial.id]);

  const handleServiceChange = (newServices: TService[]) => {
    setStore({
      service: {
        selectedServices: newServices,
      },
    });
  };

  return {
    loading,
    selectedServices,
    handleServiceChange,
    services,
    abbreviation: selectedFilial.abbreviation,
  };
};
