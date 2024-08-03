import { getWorkers } from "@/Api";
import { config } from "@/config";
import { findNearestDate } from "@/Helpers/operations";
import { useI18 } from "@/i18next";
import { TWroker } from "@/Steps/Workers/TWorkers";
import { TWorkersWithTime } from "@/Steps/WorkersWithTime/TWorkersWithTime";
import { useStore } from "@/Store";

export const WorkerWithTimeVM = (
  skipDate: boolean,
  skipService: boolean,
  selectedDateSlots: boolean
) => {
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
        serviceId: !skipService
          ? store.service.selectedServices?.map((s) => s.serviceId)
          : null,
        tenantId: config.tenantId,
        dateTime: !skipDate
          ? window.dayjs(selectedDate).format("YYYY-MM-DD")
          : null,
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
    workers?.length,
    selectedDate,
    skipDate,
    skipService,
  ]);

  const handleWorkerSelect = (worker: TWroker) => {
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

  const handleTimeSelect = (time: string, worker: TWroker, date?: string) => {
    setStore({
      time: {
        selectedDate: window.dayjs(date).toDate().toString(),
        selectedTime: time,
      },
      worker: {
        selectedWorker: worker,
      },
    });
  };

  const nearesWorkers = (workerList: TWroker[]): TWorkersWithTime[] => {
    const list: TWorkersWithTime[] = [];

    workerList?.forEach((worker) => {
      const nearestData = findNearestDate(
        window.dayjs(),
        worker.workDates.map((w) => w.date)
      );

      if (nearestData) {
        const workDate = worker.workDates.find((w) =>
          window.dayjs(w.date).isSame(nearestData.nearestDate, "day")
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

  const exactSlots = (workerList: TWroker[]): TWorkersWithTime[] => {
    const list: TWorkersWithTime[] = [];

    workerList.forEach((worker) => {
      list.push({
        worker,
        workDate: worker.workDates[0],
      });
    });

    return list;
  };

  return {
    workers: selectedDateSlots ? exactSlots(workers) : nearesWorkers(workers),
    loading,
    setStore,
    selectedWorker,
    handleWorkerSelect,
    handleTimeSelect,
    selectedTime,
    isReady: !!selectedTime && !!selectedWorker,
  };
};
