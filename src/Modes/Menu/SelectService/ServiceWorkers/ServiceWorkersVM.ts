import { getWorkers } from "@/Api";
import {
  TWorkDate,
  TWorker,
  TWorkersWithTime,
} from "@/Components/Containers/Workers/TWorkers";
import { config } from "@/config";
import { findNearestDate, parseCustomDate } from "@/Helpers/operations";
import { useI18 } from "@/i18next";
import { useStore } from "@/Store";

export const ServiceWorkersVM = () => {
  const { store, setStore, setLoading } = useStore();
  const { loading, selectedWorker, workers } = store.worker;
  const { selectedTime, selectedDate } = store.time;
  const t = useI18();

  React.useEffect(() => {
    if (workers?.length === 0) {
      setLoading("worker", true);
      getWorkers({
        filialId: store.filial.selectedFilial.id,
        langId: config.langId,
        serviceId: store.service.selectedServices?.map((s) => s.serviceId),
        tenantId: config.tenantId,
        dateTime: null,
      })
        .then(({ data }) => {
          setStore({
            worker: {
              workers: data,
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
    workers?.length,
  ]);

  const handleWorkerSelect = (worker: TWorker) => {
    setStore({
      worker: {
        selectedWorker: worker,
      },
      time: {
        selectedTime: "",
        selectedDate: null,
      },
    });
  };

  const handleTimeSelect = (
    time: string,
    worker: TWorker,
    workDate?: TWorkDate
  ) => {
    setStore({
      worker: {
        selectedWorker: worker,
      },
      time: {
        selectedDate: workDate?.date
          ? parseCustomDate(workDate?.date).toDate().toString()
          : null,
        selectedTime: time,
      },
    });
  };

  const nearestWorkers = (workerList: TWorker[]): TWorkersWithTime[] => {
    const list: TWorkersWithTime[] = [];

    workerList?.forEach((worker) => {
      const nearestData = findNearestDate(
        window.dayjs(),
        worker.workDates.map((w) => w.date)
      );

      if (nearestData) {
        const workDate = worker.workDates.find((w) =>
          parseCustomDate(w.date).isSame(nearestData.nearestDate, "day")
        );

        list.push({
          worker,
          workDate,
          dayName: t(nearestData.dayName as any),
        });
      }
    });

    return list;
  };

  return {
    workers: nearestWorkers(workers),
    loading,
    selectedWorker,
    handleWorkerSelect,
    handleTimeSelect,
    selectedTime,
  };
};
