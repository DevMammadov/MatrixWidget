import Time from '@/Components/Containers/Time';
import { StepTimeVM } from './StepTimeVM';
import { TStepTime } from './TStepTime';

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
      selectedTime={selectedTime}
      onMonthChange={fetchWorkDays}
      disabledDays={(date) => {
        const enabledDates = workDates.map((d) => d.date);
        return !enabledDates.includes(date.format('YYYY.M.D'));
      }}
    />
  );
};

export default StepTime;
