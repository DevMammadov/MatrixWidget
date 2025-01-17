import Workers from "@/Components/Containers/Workers";
import { useI18 } from "@/i18next";
import { DateWorkersVM } from "./DateWorkersVM";

type TDateWorkers = {
  onSubmit(): void;
};

const DateWorkers = ({ onSubmit }: TDateWorkers) => {
  const {
    workers,
    selectedWorker,
    selectedTime,
    handleWorkerSelect,
    handleTimeSelect,
  } = DateWorkersVM();
  const t = useI18();

  return (
    <Workers
      workers={workers}
      selectedTime={(worker) =>
        selectedWorker?.id === worker.id && selectedTime
      }
      selectedWorker={(worker) => worker.id === selectedWorker?.id}
      showSubmitButton={!!selectedWorker.id}
      buttonTitle={t("chooseService")}
      onWorkerSelect={handleWorkerSelect}
      onTimeSelect={handleTimeSelect}
      onSubmit={onSubmit}
      withSlots
    />
  );
};

export default DateWorkers;
