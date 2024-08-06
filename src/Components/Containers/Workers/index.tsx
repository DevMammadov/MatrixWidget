import BadgeTimePicker from '@/Components/Shared/BadgeTimePicker';
import Button from '@/Components/Shared/Button';
import Counter from '@/Components/Shared/Counter';
import UserSelectItem from '@/Components/Shared/UserSelectTem';
import BadgeSkeleton from '@/Components/Skeletons/BadgeSkeleton';
import SelectItemSkeleton from '@/Components/Skeletons/SelectItemSkeleton';
import { useI18 } from '@/i18next';
import { TWorkersWithTime, TWorker, TWorkDate } from './TWorkers';
import { clsx } from '@/Helpers/clsx';

type TWorkers = {
  onSubmit?(): void;
  workers: TWorkersWithTime[];
  buttonTitle?: string;
  loading?: boolean;
  selectedWorker(worker: TWorker, workDate?: TWorkDate): boolean;
  selectedTime(worker: TWorker, workDate?: TWorkDate): string | false;
  onWorkerSelect(worker: TWorker, workDate?: TWorkDate): void;
  onTimeSelect?(time: string, worker: TWorker, workDate?: TWorkDate): void;
  withSlots?: boolean;
  showSubmitButton?: boolean;
  classes?: {
    userContainer?: string;
  };
};

const Workers = ({
  onSubmit,
  buttonTitle,
  loading,
  workers,
  selectedWorker,
  selectedTime,
  onWorkerSelect,
  onTimeSelect,
  withSlots,
  showSubmitButton,
  classes,
}: TWorkers) => {
  const t = useI18();

  return (
    <div className="flex flex-col gap-5 relative pt-8">
      {!loading &&
        workers.map(({ worker, workDate, dayName }) => (
          <div
            key={worker.id}
            className={clsx(
              `border-b py-2 pb-5 border-gray-100`,
              classes?.userContainer
            )}
          >
            <UserSelectItem
              title={worker.name}
              text={`${worker.position || ''} ${
                dayName ? ` • ${dayName}` : ''
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
                selected={selectedTime(worker, workDate)}
                onChange={(time) => {
                  onTimeSelect?.(time, worker, workDate);
                }}
              />
            )}
          </div>
        ))}

      {!loading && workers.length === 0 && (
        <div className="p-5 flex justify-center items-center text-gray-600 text-3xl">
          {t('noWorkers')}
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
          className="sticky bottom-[60px] w-[80%] mx-auto"
          onClick={onSubmit}
          disabled={loading}
        >
          {buttonTitle || ''}
        </Button>
      )}
    </div>
  );
};

export default Workers;
