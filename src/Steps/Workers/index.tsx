import UserSelectItem from "@/Components/Shared/UserSelectTem";
import SelectItemSkeleton from "@/Components/Skeletons/SelectItemSkeleton";
import { useI18 } from "@/i18next";
import WorkersVM from "@/Steps/Workers/WorkersVM";

type TWorkers = {
  onSubmit?(): void;
};

const Workers = ({ onSubmit }: TWorkers) => {
  const { workers, loading, setStore, selectedWorker, handleWorkerSelect } =
    WorkersVM();
  const t = useI18();

  return (
    <div className="px-3 relative">
      <h1 className="font-bold text-5xl text-gray-700 mb-7 sticky top-[105px] bg-white pb-2 z-20">
        {t("chooseSpecialist")}
      </h1>
      <div className="flex flex-col gap-2">
        {!loading &&
          workers?.map((worker) => (
            <UserSelectItem
              title={worker.name}
              text={worker.position}
              img={worker.photoUrl}
              checked={selectedWorker?.id === worker.id}
              key={worker.id}
              onChange={() => {
                handleWorkerSelect(worker);
                onSubmit?.();
              }}
            />
          ))}

        {!loading && workers.length === 0 && (
          <div className="p-5 flex justify-center items-center text-gray-600 text-3xl">
            {t("noWorkers")}
          </div>
        )}

        {loading && <SelectItemSkeleton count={6} />}
      </div>
    </div>
  );
};

export default Workers;
