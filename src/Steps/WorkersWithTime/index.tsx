import BadgeTimePicker from "@/Components/Shared/BadgeTimePicker";
import Button from "@/Components/Shared/Button";
import Counter from "@/Components/Shared/Counter";
import UserSelectItem from "@/Components/Shared/UserSelectTem";
import BadgeSkeleton from "@/Components/Skeletons/BadgeSkeleton";
import SelectItemSkeleton from "@/Components/Skeletons/SelectItemSkeleton";
import { useI18 } from "@/i18next";
import { WorkerWithTimeVM } from "@/Steps/WorkersWithTime/WorkerWithTimeVM";

type TWorkerWithTime = {
  onSubmit?(isReady: boolean): void;
  skipDate?: boolean;
  skipService?: boolean;
  selectedDateSlots?: boolean;
  buttonTitle?: string;
};

const WorkerWithTime = ({
  onSubmit,
  skipDate = false,
  skipService = false,
  selectedDateSlots = false,
  buttonTitle,
}: TWorkerWithTime) => {
  const t = useI18();
  const {
    workers,
    selectedWorker,
    handleWorkerSelect,
    handleTimeSelect,
    selectedTime,
    loading,
    isReady,
  } = WorkerWithTimeVM(skipDate, skipService, selectedDateSlots);

  return (
    <div className="flex flex-col gap-5 relative pt-8">
      {!loading &&
        workers.map(({ worker, workDate, dayName }) => (
          <div key={worker.id} className="border-b py-2 pb-5 border-gray-100">
            <UserSelectItem
              title={worker.name}
              text={`${worker.position || ""} • ${dayName || ""}`}
              img={worker.photoUrl}
              checked={selectedWorker?.id === worker.id}
              key={worker.id}
              onChange={() => {
                handleWorkerSelect(worker);
              }}
            />
            {
              <BadgeTimePicker
                timeSlots={workDate?.timeSlots}
                selected={selectedWorker.id === worker.id && selectedTime}
                onChange={(time) => {
                  handleTimeSelect(time, worker, workDate?.date);
                }}
              />
            }
          </div>
        ))}

      {loading && (
        <Counter count={10}>
          <div className="flex flex-col gap-5 relative px-2">
            <SelectItemSkeleton />
            <div className="grid grid-cols-3 gap-2">
              <BadgeSkeleton count={9} />
            </div>
          </div>
        </Counter>
      )}

      <Button
        className="sticky bottom-[60px] w-[80%] mx-auto"
        onClick={() => onSubmit?.(isReady)}
        disabled={loading}
      >
        {buttonTitle || t(isReady ? "ready" : "chooseDateAndTime")}
      </Button>
    </div>
  );
};

export default WorkerWithTime;
