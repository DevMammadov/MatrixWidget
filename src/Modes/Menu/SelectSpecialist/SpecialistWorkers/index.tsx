import Workers from "@/Components/Containers/Workers";
import { SpecialistWorkersVM } from "./SpecialistWorkersVM";
import { useI18 } from "@/i18next";

type TSpecialistWorkers = {
  onSubmit(): void;
};

const SpecialistWorkers = ({ onSubmit }: TSpecialistWorkers) => {
  const {
    handleTimeSelect,
    handleWorkerSelect,
    loading,
    selectedTime,
    selectedWorker,
    workers,
  } = SpecialistWorkersVM();
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

export default SpecialistWorkers;
