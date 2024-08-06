import { getFilialServices } from '@/Api';
import { TService } from '@/Components/Containers/Services/TServices';
import { useStore } from '@/Store';

export const ServiceServicesVM = () => {
  const { setStore, store } = useStore();
  const {
    filial: { selectedFilial },
    service: { services, loading, selectedServices },
  } = store;

  React.useEffect(() => {
    if (services.length === 0) {
      setStore({ service: { loading: true } });
      //TODO: change id
      getFilialServices(selectedFilial.id).then(({ data }) => {
        setStore({ service: { services: data, loading: false } });
      });
    }
  }, [services.length, setStore]);

  const handleServiceChange = (newServices: TService[]) => {
    setStore({
      service: {
        selectedServices: newServices,
      },
    });
  };

  return {
    loading,
    selectedServices: selectedServices,
    handleServiceChange,
    services,
    abbreviation: selectedFilial.abbreviation,
  };
};
