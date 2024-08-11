import Time from "@/Components/Containers/Time";
import { config } from "@/config";
import { ESteps } from "@/Data/enum";
import { useI18 } from "@/i18next";
import { DateTimeVM } from "./DateTimeVM";

type TDateTime = {
  onSubmit(): void;
};

const DateTime = ({ onSubmit }: TDateTime) => {
  const t = useI18();
  const {
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    loading,
    timeSlots,
  } = DateTimeVM();

  return (
    <Time
      selectedDate={selectedDate ? window.dayjs(selectedDate) : window.dayjs()}
      onCalendarChange={setSelectedDate}
      onTimeSelect={setSelectedTime}
      categorize
      showButton={!!selectedTime}
      selectedTime={selectedTime}
      buttonTitle={t("chooseSpecialist")}
      onSubmit={onSubmit}
      loading={loading}
      timeSlots={timeSlots}
      skipBeforeTime
    />
  );
};

export default DateTime;
