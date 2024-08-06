import Calendar from '@/Components/Shared/Calendar';
import BadgeSkeleton from '@/Components/Skeletons/BadgeSkeleton';
import BadgeTimePicker from './BadgeTimePicker';
import InlineTimePicker from './InlineTimePicker';
import { TTime } from './TTime';
import Button from '@/Components/Shared/Button';

const Time = ({
  selectedDate,
  onCalendarChange,
  loading,
  timeSlots,
  selectedTime,
  onTimeSelect,
  categorize,
  onMonthChange,
  disabledDays,
  inline,
  buttonTitle,
  onSubmit,
  showButton,
}: TTime) => {
  return (
    <div className="relative h-full flex flex-col">
      <Calendar
        selectedDate={selectedDate}
        onChange={onCalendarChange}
        className="border-l-0 border-r-0"
        onMonthChange={onMonthChange}
        loading={loading}
        disabled={disabledDays}
      />
      <div className="flex-grow">
        {!loading &&
          (!inline ? (
            <BadgeTimePicker
              timeSlots={timeSlots}
              selected={selectedTime}
              categorize={categorize}
              onChange={onTimeSelect}
            />
          ) : (
            <InlineTimePicker
              timeSlots={timeSlots}
              selected={selectedTime}
              onChange={onTimeSelect}
            />
          ))}

        {loading && inline && (
          <div className="flex flex-col pt-2 px-4">
            <BadgeSkeleton className="rounded-none  border-b" count={12} />
          </div>
        )}

        {loading && !inline && (
          <div className="grid grid-cols-3 gap-2 p-3 relative">
            <BadgeSkeleton count={12} />
          </div>
        )}
      </div>

      {showButton && (
        <Button
          //className="absolute bottom-0 w-[80%] self-center"
          onClick={onSubmit}
        >
          {buttonTitle}
        </Button>
      )}
    </div>
  );
};

export default Time;
