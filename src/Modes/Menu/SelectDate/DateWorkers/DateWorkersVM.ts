import { TWorkDate } from "@/Components/Containers/Time/TTime";
import {
  TWorker,
  TWorkersWithTime,
} from "@/Components/Containers/Workers/TWorkers";
import { useStore } from "@/Store";

export const DateWorkersVM = () => {
  const { store, setStore } = useStore();
  const { workers, selectedWorker } = store.worker;

  const processWorkers = (workerList: TWorker[]): TWorkersWithTime[] => {
    const list: TWorkersWithTime[] = [];

    workerList?.forEach((worker) => {
      const workDate = worker.workDates[0];

      list.push({
        worker,
        workDate,
      });
    });

    return list;
  };

  const handleWorkerSelect = (worker: TWorker, workDate?: TWorkDate) => {
    const currentTime =
      selectedWorker?.id === worker.id ? store.time.selectedTime : "";

    setStore({
      worker: {
        selectedWorker: worker,
      },
      time: {
        selectedTime: currentTime || workDate?.timeSlots?.[0],
      },
    });
  };

  const handleTimeSelect = (time: string, worker: TWorker) => {
    setStore({
      worker: {
        selectedWorker: worker,
      },
      time: {
        selectedTime: time,
      },
    });
  };

  return {
    workers: processWorkers(workers),
    selectedWorker,
    selectedTime: store.time.selectedTime,
    handleWorkerSelect,
    handleTimeSelect,
  };
};
