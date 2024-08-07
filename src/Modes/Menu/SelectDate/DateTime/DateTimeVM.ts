import { getWorkers } from "@/Api";
import { TWorker } from "@/Components/Containers/Workers/TWorkers";
import { config } from "@/config";
import { mergeUniqueArrays } from "@/Helpers/operations";
import { useStore } from "@/Store";
import { TDayJS } from "@/types";

export const DateTimeVM = () => {
  const { store, setStore, setLoading } = useStore();
  const { loading } = store.worker;
  const { selectedDate: currentDate, selectedTime } = store.time;
  const selectedDate = React.useMemo(
    () => window.dayjs(currentDate || undefined),
    [currentDate]
  );

  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);

  React.useEffect(() => {
    setLoading("worker", true);
    getWorkers({
      filialId: store.filial.selectedFilial.id,
      langId: config.langId,
      tenantId: config.tenantId,
      dateTime: selectedDate.format("YYYY-MM-DD"),
    })
      .then(({ data }: { data: TWorker[] }) => {
        if (data && data.length) {
          setTimeSlots(
            mergeUniqueArrays(...data.map((w) => w.workDates[0].timeSlots))
          );

          setStore({
            worker: {
              workers: data,
            },
          });
        }
      })
      .finally(() => {
        setLoading("worker", false);
      });
  }, [
    setLoading,
    setStore,
    store.filial.selectedFilial.id,
    store.service.selectedServices,
    selectedDate,
  ]);

  React.useEffect(() => {
    setStore({ time: { selectedDate: window.dayjs().toDate().toString() } });
  }, [setStore]);

  const setSelectedDate = (date: TDayJS) => {
    setStore({
      time: {
        selectedDate: date.toDate().toString(),
        selectedTime: "",
      },
    });
  };

  const setSelectedTime = (time: string) => {
    setStore({
      time: {
        selectedTime: time,
      },
    });
  };

  return {
    setSelectedDate,
    setSelectedTime,
    selectedDate,
    selectedTime,
    loading,
    timeSlots,
  };
};
