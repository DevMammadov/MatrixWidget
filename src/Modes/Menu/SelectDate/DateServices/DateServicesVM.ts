import { getWorkerServicesRaw } from "@/Api";
import { TService } from "@/Components/Containers/Services/TServices";
import { parseCustomDate, uniqueBy } from "@/Helpers/operations";
import { useStore } from "@/Store";

export const DateServicesVM = () => {
  const { setStore, store, setLoading } = useStore();
  const { loading, services, selectedServices } = store.service;
  const endTime = React.useMemo(() => {
    const durations = selectedServices.reduce(
      (acc, item) => (acc += Number(item.duration)),
      0
    );

    return window
      .dayjs(
        `${parseCustomDate(store.time.selectedDate).format("YYYY-MM-DD")} ${
          store.time.selectedTime
        }`
      )
      .add(durations, "minute");
  }, [selectedServices, store.time.selectedDate, store.time.selectedTime]);

  React.useEffect(() => {
    setLoading("service", true);
    getWorkerServicesRaw({
      employeeId: store.worker.selectedWorker?.id,
      filialId: store.filial.selectedFilial.id,
      time: `${window.dayjs(endTime).format("YYYY-MM-DD HH:mm")}`,
      startingDateTime: store.time.selectedTime,
    })
      .then(({ data }) => {
        const servicesData = data || [];
        setStore({
          service: {
            services: uniqueBy<TService>(
              [...selectedServices, ...servicesData],
              "serviceId"
            ),
          },
        });
      })
      .finally(() => {
        setLoading("service", false);
      });
  }, [
    selectedServices,
    endTime,
    setLoading,
    setStore,
    store.filial.selectedFilial.id,
    store.worker.selectedWorker?.id,
    store.time.selectedTime,
  ]);

  const handleServiceChange = (newServices: TService[]) => {
    setStore({
      service: {
        selectedServices: newServices,
      },
    });
  };

  return {
    services,
    loading,
    handleServiceChange,
    selectedServices,
    abbreviation: store.filial.selectedFilial.abbreviation,
  };
};
