import BadgeTimePicker from "@/Components/Shared/BadgeTimePicker";
import Button from "@/Components/Shared/Button";
import Calendar from "@/Components/Shared/Calendar";
import BadgeSkeleton from "@/Components/Skeletons/BadgeSkeleton";
import { config } from "@/config";
import { ESteps } from "@/Data/enum";
import { useI18 } from "@/i18next";
import { GeneralTimeVM } from "@/Steps/GeneralTime/GeneralTimeVM";

type TGeneralTime = {
  onSubmit?(): void;
};

const GeneralTime = ({ onSubmit }: TGeneralTime) => {
  const {
    selectedDate,
    selectedTime,
    setSelectedDate,
    loading,
    timeSlots,
    handleTimeSelect,
  } = GeneralTimeVM();
  const t = useI18();

  return (
    <div className="relative h-full flex flex-col">
      <Calendar
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        className="border-l-0 border-r-0 mb-4 shadow-md rounded-b-large sticky top-0 z-20 bg-white"
        loading={loading}
      />
      <div className="flex-grow">
        {!loading && (
          <BadgeTimePicker
            timeSlots={timeSlots}
            selected={selectedTime}
            categorize
            onChange={(time) => {
              handleTimeSelect(time);
            }}
          />
        )}

        {loading && config.isStep !== ESteps.inline && (
          <div className="grid grid-cols-3 gap-2 p-3 relative">
            <BadgeSkeleton count={12} />
          </div>
        )}
      </div>

      {selectedTime && (
        <div className="absolute bottom-0 w-[80%] self-center">
          <Button onClick={onSubmit} disabled={loading}>
            {t("chooseSpecialist")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GeneralTime;
