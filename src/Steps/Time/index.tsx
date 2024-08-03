import BadgeTimePicker from "@/Components/Shared/BadgeTimePicker";
import Calendar from "@/Components/Shared/Calendar";
import BadgeSkeleton from "@/Components/Skeletons/BadgeSkeleton";
import { config } from "@/config";
import { ESteps } from "@/Data/enum";
import InlineTimePicker from "@/Steps/Time/InlineTimePicker";
import { TimeVM } from "@/Steps/Time/TimeVM";
import { TTime } from "@/Steps/Time/TTime";

const Time = ({ onSubmit }: TTime) => {
  const {
    selectedDate,
    setSelectedDate,
    loading,
    handleTimeSelect,
    freeSlots,
    fetchWorkDays,
    workDates,
    selectedTime,
  } = TimeVM();

  return (
    <div>
      <Calendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        className="border-l-0 border-r-0"
        onMonthChange={fetchWorkDays}
        loading={loading}
        disabled={(date) => {
          const enabledDates = workDates.map((d) => d.date);
          return !enabledDates.includes(date.format("YYYY.M.D"));
        }}
      />
      {!loading &&
        (config.isStep !== ESteps.inline ? (
          <BadgeTimePicker
            timeSlots={freeSlots}
            selected={selectedTime}
            onChange={(time) => {
              handleTimeSelect(time);
              onSubmit?.();
            }}
          />
        ) : (
          <InlineTimePicker
            timeSlots={freeSlots}
            selected={selectedTime}
            onChange={(time) => {
              handleTimeSelect(time);
              onSubmit?.();
            }}
          />
        ))}

      {loading && config.isStep === ESteps.inline && (
        <div className="flex flex-col pt-2 px-4">
          <BadgeSkeleton className="rounded-none  border-b" count={12} />
        </div>
      )}

      {loading && config.isStep !== ESteps.inline && (
        <div className="grid grid-cols-3 gap-2 p-3 relative">
          <BadgeSkeleton count={12} />
        </div>
      )}
    </div>
  );
};

export default Time;
