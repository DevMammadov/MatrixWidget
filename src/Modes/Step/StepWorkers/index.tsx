import Workers from "@/Components/Containers/Workers";
import StepWorkersVM from "./StepWorkersVM";
import { useI18 } from "@/i18next";

type TStepWorkers = {
  onSubmit(): void;
};

const StepWorkers = ({ onSubmit }: TStepWorkers) => {
  const { handleWorkerSelect, loading, selectedWorker, workers } =
    StepWorkersVM();
  const t = useI18();

  return (
    <Workers
      workers={workers}
      onWorkerSelect={handleWorkerSelect}
      loading={loading}
      selectedWorker={(worker) => worker.id === selectedWorker?.id}
      showSubmitButton={!!selectedWorker.id}
      buttonTitle={t("chooseService")}
      onSubmit={onSubmit}
    />
  );
};

export default StepWorkers;
