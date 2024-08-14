import { getConfirmationCode, addRecord } from "@/Api";
import { config } from "@/config";
import { useStore } from "@/Store";
import { TClientDTO, TCreateDTO } from "./TContacts";
import { parseCustomDate } from "@/Helpers/operations";

export const ContactsVM = () => {
  const [hasConfirmCode, setHasConfirmCode] = React.useState(false);
  const [codeError, setCodeError] = React.useState(false);
  const {
    store: {
      worker: { selectedWorker },
      service: { selectedServices },
      time: { selectedDate: selectedStoreDate, currentDate, selectedTime },
      filial: { selectedFilial },
      contact: { loading },
    },
    setStore,
    setLoading,
  } = useStore();
  const selectedDate = currentDate || selectedStoreDate;

  React.useEffect(() => {
    setHasConfirmCode(false);
  }, []);

  const { endTime, durations, totalPrice } = React.useMemo(() => {
    const durations = selectedServices.reduce(
      (acc, item) => (acc += item.duration),
      0
    );

    const totalPrice = selectedServices.reduce(
      (acc, el) => (acc += el.price),
      0
    );

    return {
      durations,
      totalPrice,
      endTime: window
        .dayjs(
          `${parseCustomDate(selectedDate).format(
            "YYYY MM DD"
          )} ${selectedTime}`
        )
        .add(durations, "minutes")
        .format("HH:mm"),
    };
  }, [selectedDate, selectedServices, selectedTime]);

  const formattedDate = new Date(selectedDate!).toLocaleDateString(
    config.langId || "ru",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
    }
  );

  const handleSubmit = ({ comment, confirmCode, ...client }: TClientDTO) => {
    const createDTO: TCreateDTO = {
      langId: config.langId,
      client: {
        ...client,
        discount: 0,
      },
      recordCategoryIds: [],
      services: selectedServices.map((item) => ({
        rowNumber: 0,
        serviceId: item.serviceId,
        serviceName: item.name,
        countService: 1,
        discount: 0,
        price: item.price,
        salePrice: item.price,
        complexServiceId: "",
        parentId: "undefined",
      })),
      filialId: selectedFilial.id,
      comment,
      dateOfRecord: parseCustomDate(selectedDate).format("YYYY-MM-DD"),
      startTime: `${window
        .dayjs(selectedDate)
        .format("YYYY-MM-DD")} ${selectedTime}:00`,
      endTime: `${window
        .dayjs(selectedDate)
        .format("YYYY-MM-DD")} ${endTime}:00`,
      durationOfTime: durations,
      colorCodeRecord: "",
      toEmployeeId: selectedWorker?.id,
      totalPrice: 0,
      resources: [],
      complexServiceIds: [],
    };

    if (!confirmCode) {
      setLoading("contact", true);
      getConfirmationCode(createDTO)
        .then(() => {
          setHasConfirmCode(true);
        })
        .finally(() => {
          setLoading("contact", false);
        });
    } else {
      addRecord(createDTO, confirmCode)
        .then((data) => {
          setLoading("contact", true);
          if (data.code === 200) {
            setStore({
              contact: {
                isSuccess: true,
              },
            });
          } else if (data.code === 400) {
            setCodeError(true);
          } else {
            setStore({
              contact: {
                isError: true,
              },
            });
          }
        })
        .finally(() => {
          setLoading("contact", false);
        });
    }
  };

  return {
    selectedWorker,
    selectedTime,
    selectedDate: formattedDate,
    endTime,
    durations,
    selectedServices,
    selectedFilial,
    totalPrice,
    handleSubmit,
    loading,
    hasConfirmCode,
    codeError,
  };
};
