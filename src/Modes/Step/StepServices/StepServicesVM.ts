import { getFilialServices } from "@/Api";
import { TService } from "@/Steps/Services/TServices";
import { useStore } from "@/Store";

export const StepServicesVM = () => {
  const { setStore, store, setLoading } = useStore();
  const [inputValue, setInputValue] = React.useState("");
  const {
    filial: { selectedFilial },
    service: { services, loading, selectedServices },
  } = store;

  const isSelected = (service: TService) => {
    return !!selectedServices.find((s) => s.serviceId === service.serviceId);
  };

  const filteredServices = React.useMemo(() => {
    return services.filter((s) => s.name.includes(inputValue));
  }, [services, inputValue]);

  React.useEffect(() => {
    if (services.length === 0) {
      setLoading("service", true);
      //TODO: change id
      getFilialServices("7a0c5e20-309d-11eb-bbe0-0050568303be")
        .then(({ data }) => {
          setStore({ service: { services: data } });
        })
        .finally(() => {
          setLoading("service", false);
        });
    }
  }, [services.length, setStore]);

  const addService = (service: TService) => {
    const foundService = selectedServices.find(
      (s) => s.serviceId === service.serviceId
    );
    if (foundService) {
      setStore({
        service: {
          selectedServices: selectedServices?.filter(
            (s) => s.serviceId !== service.serviceId
          ),
        },
      });
    } else {
      setStore({
        service: {
          selectedServices: [...selectedServices, service],
        },
      });
    }
  };

  return {
    filteredServices,
    loading,
    selectedServices: selectedServices,
    addService,
    isSelected,
    selectedFilial,
    setInputValue,
  };
};
