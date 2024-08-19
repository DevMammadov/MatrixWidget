import Workers from "@/Components/Containers/Workers";
import StepWorkersVM from "./StepWorkersVM";
import { TWorker } from "@/Components/Containers/Workers/TWorkers";

type TStepWorkers = {
  onSubmit(): void;
};

const StepWorkers = ({ onSubmit }: TStepWorkers) => {
  const { handleWorkerSelect, loading, selectedWorker, workers } =
    StepWorkersVM();

  return (
    <Workers
      workers={workers}
      onWorkerSelect={(worker: TWorker) => {
        handleWorkerSelect(worker);
        onSubmit();
      }}
      loading={loading}
      selectedWorker={(worker) => worker.id === selectedWorker?.id}
      showSubmitButton={false}
      onSubmit={onSubmit}
    />
  );
};

export default StepWorkers;
