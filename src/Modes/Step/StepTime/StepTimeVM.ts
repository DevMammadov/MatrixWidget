import { TWorkDate } from '@/Components/Containers/Workers/TWorkers';
import { useStore } from '@/Store';
import { TDayJS } from '@/types';
import { TEmployee } from './TStepTime';
import { getFreeSlots } from '@/Api';
import { TStore } from '@/Store/TStore';

export const StepTimeVM = () => {
  const { store, setStore, setLoading, mergeStore } = useStore();
  const { loading, selectedDate, workDates, selectedTime } = store.time;
  const [freeSlots, setFreeSlots] = React.useState<string[]>([]);

  const findWorkDates = (dates: TWorkDate[], date: TDayJS) => {
    return dates.find((d) =>
      window.dayjs(d.date).isSame(date.format('YYYY.M.D'))
    )?.timeSlots;
  };

  const setDateToStore = React.useCallback(
    (date: TDayJS, slots?: string[]) => {
      setFreeSlots(slots || []);
      setStore({
        time: {
          selectedDate: date.toDate().toString(),
        },
      });
    },
    [setStore]
  );

  const fetchWorkDays = React.useCallback(
    (date: TDayJS, callback?: (days: TEmployee) => void) => {
      setLoading('time', true);

      getFreeSlots({
        dateTime: date.format('YYYY-MM-DD'),
        employeeId: store.worker?.selectedWorker?.id,
        filialId: store.filial.selectedFilial.id,
      })
        .then(({ data }: { data: TEmployee }) => {
          if (typeof data !== 'string') {
            mergeStore((state: TStore) => ({
              time: {
                workDates: [...state.time.workDates, ...data.workDates],
              },
            }));
            callback?.(data);
          }
        })
        .finally(() => {
          setLoading('time', false);
        });
    },
    [
      setLoading,
      mergeStore,
      store.filial.selectedFilial.id,
      store.worker?.selectedWorker?.id,
    ]
  );

  React.useEffect(() => {
    if (!selectedDate) {
      fetchWorkDays(window.dayjs(), (data) => {
        const firstActiveDate = window.dayjs(data.workDates[0].date);

        setDateToStore(
          firstActiveDate,
          findWorkDates(data.workDates, firstActiveDate)
        );
      });
    } else {
      setFreeSlots(findWorkDates(workDates, window.dayjs(selectedDate)) || []);
    }
  }, [fetchWorkDays, setStore, setDateToStore]);

  const setSelectedDate = (date: TDayJS) => {
    const slots = findWorkDates(workDates, date) || [];
    const lastWorkDate = workDates[workDates.length - 1].date;

    if (window.dayjs(lastWorkDate).isSame(date)) {
      fetchWorkDays(date.add(1, 'month').startOf('month'), () => {
        setDateToStore(date, slots);
      });
    } else {
      setDateToStore(date, slots);
    }
  };

  const handleTimeSelect = (time: string) => {
    setStore({
      time: {
        selectedTime: time,
      },
    });
  };

  return {
    selectedDate: selectedDate ? window.dayjs(selectedDate) : null,
    setSelectedDate,
    loading,
    handleTimeSelect,
    freeSlots,
    workDates,
    fetchWorkDays,
    selectedTime,
  };
};
