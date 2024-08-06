import Workers from '@/Components/Containers/Workers';
import StepWorkersVM from './StepWorkersVM';

type TStepWorkers = {
  onSubmit(): void;
};

const StepWorkers = ({ onSubmit }: TStepWorkers) => {
  const { handleWorkerSelect, loading, selectedWorker, workers } =
    StepWorkersVM();

  return (
    <Workers
      onSubmit={onSubmit}
      selectedWorker={(w) => selectedWorker?.id === w.id}
      onWorkerSelect={(worker) => {
        handleWorkerSelect(worker);
        onSubmit();
      }}
      workers={workers}
      loading={loading}
      classes={{
        userContainer: 'border-none py-0',
      }}
    />
  );
};

export default StepWorkers;
