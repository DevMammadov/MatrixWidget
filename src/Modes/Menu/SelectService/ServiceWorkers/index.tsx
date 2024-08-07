import Workers from "@/Components/Containers/Workers";
import { ServiceWorkersVM } from "./ServiceWorkersVM";
import { isEmpty } from "@/Helpers/operations";
import { useI18 } from "@/i18next";

type TServiceWorkers = {
  onSubmit(step?: number): void;
};

const ServiceWorkers = ({ onSubmit }: TServiceWorkers) => {
  const {
    handleTimeSelect,
    handleWorkerSelect,
    loading,
    selectedTime,
    selectedWorker,
    workers,
  } = ServiceWorkersVM();
  const t = useI18();

  return (
    <Workers
      workers={workers}
      loading={loading}
      selectedTime={(worker) =>
        selectedWorker?.id === worker.id && selectedTime
      }
      selectedWorker={(worker) => worker.id === selectedWorker?.id}
      showSubmitButton={!!selectedWorker}
      buttonTitle={t(selectedTime ? "ready" : "chooseDateAndTime")}
      onWorkerSelect={handleWorkerSelect}
      onTimeSelect={handleTimeSelect}
      onSubmit={() => onSubmit(selectedTime ? 3 : 2)}
      withSlots
    />
  );
};

export default ServiceWorkers;
