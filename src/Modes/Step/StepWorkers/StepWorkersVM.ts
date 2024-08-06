import { getWorkers } from '@/Api';
import {
  TWorkersWithTime,
  TWorker,
} from '@/Components/Containers/Workers/TWorkers';
import { config } from '@/config';
import { useStore } from '@/Store';

export const StepWorkersVM = () => {
  const { store, setStore, setLoading } = useStore();
  const { loading, selectedWorker, workers } = store.worker;

  React.useEffect(() => {
    if (workers.length === 0) {
      setLoading('worker', true);
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
          setLoading('worker', false);
        });
    }
  }, [
    setLoading,
    setStore,
    store.filial.selectedFilial.id,
    store.service.selectedServices,
    workers.length,
  ]);

  const handleWorkerSelect = (worker: TWorker) => {
    setStore({
      worker: {
        selectedWorker: worker,
      },
    });
  };

  const processWorkers = (workers: TWorker[]): TWorkersWithTime[] => {
    return workers.map((w) => ({ worker: w }));
  };

  return {
    workers: processWorkers(workers),
    loading,
    setStore,
    selectedWorker,
    handleWorkerSelect,
  };
};

export default StepWorkersVM;
