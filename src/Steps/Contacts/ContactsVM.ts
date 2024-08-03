import { getConfirmationCode, addRecord } from "@/Api";
import { config } from "@/config";
import { TClientDTO, TCreateDTO } from "@/Steps/Contacts/TContacts";
import { useStore } from "@/Store";

export const ContactsVM = () => {
  const [hasConfirmCode, setHasConfirmCode] = React.useState(false);
  const [codeError, setCodeError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const {
    store: {
      worker: { selectedWorker },
      service: { selectedServices },
      time: { selectedDate, selectedTime },
      filial: { selectedFilial },
    },
    setStore,
  } = useStore();

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
          `${window.dayjs(selectedDate).format("YYYY MM DD")} ${selectedTime}`
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
      dateOfRecord: window.dayjs(selectedDate).format("YYYY-MM-DD"),
      startTime: `${window
        .dayjs(selectedDate)
        .format("YYYY-MM-DD")} ${selectedTime}:00`,
      endTime: `${window
        .dayjs(selectedDate)
        .format("YYYY-MM-DD")} ${endTime}:00`,
      durationOfTime: durations,
      colorCodeRecord: "",
      toEmployeeId: selectedWorker.id,
      totalPrice: 0,
      resources: [],
      complexServiceIds: [],
    };

    if (!confirmCode) {
      setLoading(true);
      getConfirmationCode(createDTO).then(() => {
        setHasConfirmCode(true);
        setLoading(false);
      });
    } else {
      addRecord(createDTO, confirmCode)
        .then(() => {
          setStore({
            contact: {
              isSuccess: true,
            },
          });
        })
        .catch(() => {
          setCodeError(true);

          setStore({
            contact: {
              isSuccess: false,
            },
          });
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
