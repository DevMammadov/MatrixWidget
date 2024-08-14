import { getWorkerServicesTimeless } from "@/Api";
import { TService } from "@/Components/Containers/Services/TServices";
import { useStore } from "@/Store";

export const StepServicesVM = () => {
  const { setStore, store, setLoading } = useStore();
  const { loading, services, selectedServices } = store.service;

  React.useEffect(() => {
    setLoading("service", true);
    getWorkerServicesTimeless({
      employeeId: store.worker.selectedWorker?.id,
      filialId: store.filial.selectedFilial.id,
    })
      .then(({ data }) => {
        setStore({
          service: {
            services: data,
          },
        });
      })
      .finally(() => {
        setLoading("service", false);
      });
  }, [
    setLoading,
    setStore,
    store.filial.selectedFilial.id,
    store.worker.selectedWorker?.id,
  ]);

  const handleServiceChange = (newServices: TService[]) => {
    setStore({
      service: {
        selectedServices: newServices,
      },
    });
  };

  return {
    services,
    loading,
    handleServiceChange,
    selectedServices,
    abbreviation: store.filial.selectedFilial.abbreviation,
  };
};
