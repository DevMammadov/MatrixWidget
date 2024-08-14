import { TWorkDate } from "@/Components/Containers/Workers/TWorkers";
import { useStore } from "@/Store";
import { TDayJS } from "@/types";
import { TEmployee } from "./TStepTime";
import { getFreeSlotsForServices } from "@/Api";
import { TStore } from "@/Store/TStore";
import { parseCustomDate } from "@/Helpers/operations";

export const StepTimeVM = () => {
  const { store, setStore, setLoading, mergeStore } = useStore();
  const { loading, selectedDate, workDates, selectedTime, currentDate } =
    store.time;
  const [freeSlots, setFreeSlots] = React.useState<string[]>([]);

  const findWorkDates = (dates: TWorkDate[], date: TDayJS) => {
    return dates.find((d) => parseCustomDate(d.date).isSame(date))?.timeSlots;
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
      setLoading("time", true);

      getFreeSlotsForServices({
        serviceId: store.service.selectedServices?.map((s) => s.serviceId),
        dateTime: date.format("YYYY-MM-DD"),
        employeeId: store.worker?.selectedWorker?.id,
        filialId: store.filial.selectedFilial.id,
      })
        .then(({ data }: { data: TEmployee }) => {
          if (typeof data !== "string") {
            mergeStore((state: TStore) => ({
              time: {
                workDates: [...state.time.workDates, ...data.workDates],
              },
            }));
            callback?.(data);
          }
        })
        .finally(() => {
          setLoading("time", false);
        });
    },
    [
      setLoading,
      mergeStore,
      store.filial.selectedFilial.id,
      store.worker?.selectedWorker?.id,
      store.service.selectedServices,
    ]
  );

  React.useEffect(() => {
    if (!selectedDate) {
      fetchWorkDays(window.dayjs(), (data) => {
        const firstActiveDate = parseCustomDate(data.workDates[0].date);

        setDateToStore(
          firstActiveDate,
          findWorkDates(data.workDates, firstActiveDate)
        );
      });
    } else {
      setFreeSlots(
        findWorkDates(workDates, parseCustomDate(selectedDate)) || []
      );
    }
  }, [fetchWorkDays, setStore, setDateToStore]);

  const setSelectedDate = (date: TDayJS) => {
    const slots = findWorkDates(workDates, date) || [];
    const lastWorkDate = workDates[workDates.length - 1].date;

    if (parseCustomDate(lastWorkDate).isSame(date)) {
      fetchWorkDays(date.add(1, "month").startOf("month"), () => {
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
        currentDate: selectedDate,
      },
    });
  };

  return {
    selectedDate: parseCustomDate(selectedDate),
    currentDate: parseCustomDate(currentDate),
    setSelectedDate,
    loading,
    handleTimeSelect,
    freeSlots,
    workDates,
    fetchWorkDays,
    selectedTime,
  };
};
