import BadgeTimePicker from "@/Components/Shared/BadgeTimePicker";
import Button from "@/Components/Shared/Button";
import Counter from "@/Components/Shared/Counter";
import UserSelectItem from "@/Components/Shared/UserSelectTem";
import BadgeSkeleton from "@/Components/Skeletons/BadgeSkeleton";
import SelectItemSkeleton from "@/Components/Skeletons/SelectItemSkeleton";
import { useI18 } from "@/i18next";
import { TWorkers } from "./TWorkers";
import { clsx } from "@/Helpers/clsx";
import { WorkersVM } from "@/Components/Containers/Workers/WorkersVM";

const Workers = ({
  onSubmit,
  buttonTitle,
  loading,
  workers: workerList,
  selectedWorker,
  selectedTime,
  onWorkerSelect,
  onTimeSelect,
  withSlots,
  showSubmitButton,
  classes,
  chooseAny = true,
  onChooseAnyDoctor,
}: TWorkers) => {
  const t = useI18();

  const { chooseAnyDoctor } = WorkersVM({
    workers: workerList,
    onWorkerSelect,
  });

  return (
    <div className="flex flex-col h-full gap-5 relative pt-8">
      <div className="px-3 block sm:flex items-center justify-between">
        <h2 className="text-5xl flex-grow font-bold">
          {t("chooseSpecialist")}
        </h2>
        {chooseAny && (
          <Button
            className="!py-1 !w-auto text-lg whitespace-nowrap"
            onClick={() => {
              chooseAnyDoctor();
              onChooseAnyDoctor?.();
            }}
          >
            {t("skip")}
          </Button>
        )}
      </div>
      <div className="flex-grow overflow-auto slim-scroll">
        {!loading &&
          workerList.map(({ worker, workDate, dayName }) => (
            <div
              key={worker.id}
              className={clsx(
                `border-b py-2 pb-5 border-gray-100`,
                classes?.userContainer
              )}
              ref={(el) => {
                if (selectedWorker(worker, workDate) && el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
            >
              <UserSelectItem
                title={worker.name}
                text={`${worker.position || ""} ${
                  dayName ? ` • ${dayName}` : ""
                }`}
                img={worker.photoUrl}
                checked={selectedWorker(worker, workDate)}
                key={worker.id}
                onChange={() => {
                  onWorkerSelect(worker, workDate);
                }}
              />
              {withSlots && (
                <BadgeTimePicker
                  timeSlots={workDate?.timeSlots}
                  selected={selectedTime?.(worker, workDate)}
                  onChange={(time) => {
                    onTimeSelect?.(time, worker, workDate);
                  }}
                />
              )}
            </div>
          ))}
      </div>

      {!loading && workerList.length === 0 && (
        <div className="p-5 flex justify-center items-center text-gray-600 text-3xl">
          {t("noWorkers")}
        </div>
      )}

      {loading && (
        <Counter count={10}>
          <div className="flex flex-col gap-5 relative px-2">
            <SelectItemSkeleton />
            {withSlots && (
              <div className="grid grid-cols-3 gap-2">
                <BadgeSkeleton count={9} />
              </div>
            )}
          </div>
        </Counter>
      )}

      {showSubmitButton && (
        <Button
          className="absolute bottom-[60px] w-[90%] left-1/2 translate-x-[-50%]"
          onClick={onSubmit}
          disabled={loading}
        >
          {buttonTitle || ""}
        </Button>
      )}
    </div>
  );
};

export default Workers;
