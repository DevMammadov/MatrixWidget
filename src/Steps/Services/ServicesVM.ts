import { getFilialServices } from "@/Api";
import { TService } from "@/Steps/Services/TServices";
import { useStore } from "@/Store";

export const ServicesVM = () => {
  const [text, setText] = React.useState("");
  const { setStore, store } = useStore();
  const [error, setError] = React.useState(false);
  const {
    filial: { selectedFilial },
    service: { services, loading, selectedServices },
  } = store;

  const isSelected = (service: TService) => {
    return !!selectedServices.find((s) => s.serviceId === service.serviceId);
  };

  const filteredServices = React.useMemo(() => {
    return services.filter((s) => s.name.includes(text));
  }, [services, text]);

  React.useEffect(() => {
    if (services.length === 0) {
      setStore({ service: { loading: true } });
      //TODO: change id
      getFilialServices("7a0c5e20-309d-11eb-bbe0-0050568303be").then(
        ({ data }) => {
          setStore({ service: { services: data, loading: false } });
        }
      );
    }
  }, [services.length, setStore]);

  const addService = (service: TService) => {
    setError(false);

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

  const getTotals = () => {
    return selectedServices.reduce(
      (acc, el) => {
        let count = 0;
        acc.count += ++count;
        acc.price += el.price;
        acc.duration += el.duration;
        return acc;
      },
      {
        count: 0,
        price: 0,
        duration: 0,
      }
    );
  };

  return {
    filteredServices,
    servicesLoading: loading,
    selectedServices: selectedServices,
    addService,
    isSelected,
    setText,
    text,
    setError,
    selectedFilial,
    error,
    ...getTotals(),
  };
};
