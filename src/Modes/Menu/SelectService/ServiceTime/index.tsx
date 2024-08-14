import Time from "@/Components/Containers/Time";
import { ServiceTimeVM } from "./ServiceTimeVM";
import { useI18 } from "@/i18next";

type TServiceTime = {
  onSubmit(): void;
};

const ServiceTime = ({ onSubmit }: TServiceTime) => {
  const {
    fetchWorkDays,
    freeSlots,
    handleTimeSelect,
    loading,
    selectedDate,
    selectedTime,
    setSelectedDate,
    workDates,
    currentDate,
  } = ServiceTimeVM();
  const t = useI18();

  return (
    <Time
      selectedDate={selectedDate}
      onCalendarChange={setSelectedDate}
      loading={loading}
      timeSlots={freeSlots}
      slotDate={currentDate}
      onTimeSelect={handleTimeSelect}
      selectedTime={selectedTime}
      onMonthChange={fetchWorkDays}
      categorize
      disabledDays={(date) => {
        const enabledDates = workDates.map((d) => d.date);
        return !enabledDates.includes(date.format("YYYY.M.D"));
      }}
      showButton={!!selectedTime}
      buttonTitle={t("ready")}
      onSubmit={onSubmit}
      skipBeforeTime
    />
  );
};

export default ServiceTime;
