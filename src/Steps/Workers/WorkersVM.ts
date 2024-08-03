import { getWorkers } from "@/Api";
import { config } from "@/config";
import { TWroker } from "@/Steps/Workers/TWorkers";
import { useStore } from "@/Store";

const WorkersVM = () => {
  const { store, setStore, setLoading } = useStore();
  const { loading, selectedWorker, workers } = store.worker;

  React.useEffect(() => {
    if (workers.length === 0) {
      setLoading("worker", true);
      getWorkers({
        filialId: store.filial.selectedFilial.id,
        langId: config.langId,
        serviceId: store.service.selectedServices?.map((s) => s.serviceId),
        tenantId: config.tenantId,
      })
        .then(({ data }) => {
          setStore({
            worker: {
              workers: data,
              loading: false,
            },
          });
        })
        .finally(() => {
          setLoading("worker", false);
        });
    }
  }, [
    setLoading,
    setStore,
    store.filial.selectedFilial.id,
    store.service.selectedServices,
    workers.length,
  ]);

  const handleWorkerSelect = (worker: TWroker) => {
    setStore({
      worker: {
        selectedWorker: worker,
      },
    });
  };

  return { workers, loading, setStore, selectedWorker, handleWorkerSelect };
};

export default WorkersVM;
