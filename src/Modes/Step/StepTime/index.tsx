import Time from "@/Components/Containers/Time";
import { StepTimeVM } from "./StepTimeVM";
import { TStepTime } from "./TStepTime";
import { config } from "@/config";
import { ESteps } from "@/Data/enum";

const StepTime = ({ onSubmit }: TStepTime) => {
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
  } = StepTimeVM();

  return (
    <Time
      selectedDate={selectedDate}
      loading={loading}
      timeSlots={freeSlots}
      onCalendarChange={setSelectedDate}
      onTimeSelect={(time) => {
        handleTimeSelect(time);
        onSubmit();
      }}
      slotDate={currentDate}
      selectedTime={selectedTime}
      onMonthChange={fetchWorkDays}
      inline={config.isStep === ESteps.inline}
      disabledDays={(date) => {
        const enabledDates = workDates.map((d) => d.date);
        return !enabledDates.includes(date.format("YYYY.M.D"));
      }}
      categorize
    />
  );
};

export default StepTime;
