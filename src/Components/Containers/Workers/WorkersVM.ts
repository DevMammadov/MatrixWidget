import { TWorkersVM } from "@/Components/Containers/Workers/TWorkers";
import { getRandomNumberBetween } from "@/Helpers/operations";

export const WorkersVM = ({ workers, onWorkerSelect }: TWorkersVM) => {
  const chooseAnyDoctor = () => {
    const randomIndex = getRandomNumberBetween(0, workers.length - 1);
    const randomWorker = workers[randomIndex];
    onWorkerSelect(randomWorker.worker, randomWorker.workDate);
  };

  return {
    chooseAnyDoctor,
  };
};
