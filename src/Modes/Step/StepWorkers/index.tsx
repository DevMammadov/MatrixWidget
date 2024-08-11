import Workers from "@/Components/Containers/Workers";
import StepWorkersVM from "./StepWorkersVM";
import { useI18 } from "@/i18next";

type TStepWorkers = {
  onSubmit(): void;
};

const StepWorkers = ({ onSubmit }: TStepWorkers) => {
  const {
    handleWorkerSelect,
    loading,
    selectedWorker,
    workers,
    handleTimeSelect,
    selectedTime,
  } = StepWorkersVM();
  const t = useI18();

  return (
    <Workers
      workers={workers}
      onWorkerSelect={handleWorkerSelect}
      loading={loading}
      onTimeSelect={handleTimeSelect}
      selectedTime={(worker) =>
        selectedWorker?.id === worker.id && selectedTime
      }
      selectedWorker={(worker) => worker.id === selectedWorker?.id}
      showSubmitButton={!!selectedTime}
      buttonTitle={t("chooseService")}
      onSubmit={onSubmit}
      withSlots
    />
  );
};

export default StepWorkers;
