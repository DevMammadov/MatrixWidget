import Time from "@/Components/Containers/Time";
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
    currentDate,
  } = DateTimeVM();

  return (
    <Time
      selectedDate={selectedDate}
      slotDate={currentDate}
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
