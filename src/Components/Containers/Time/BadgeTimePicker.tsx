import Badge from "@/Components/Shared/Badge";
import Collapse from "@/Components/Shared/Collapse";
import { clsx } from "@/Helpers/clsx";
import {
  categorizeTimes,
  filterTimesAfterNow,
  TCategorizedTimes,
} from "@/Helpers/operations";
import { useI18 } from "@/i18next";
import { TBadgeTimePicker } from "./TTime";

const BadgeTimePicker = ({
  timeSlots,
  onChange,
  selected,
  categorize,
  selectedDate,
  skipBeforeTime,
}: TBadgeTimePicker) => {
  const isToday = selectedDate?.isSame(window.dayjs(), "day");
  const _timeSlots =
    isToday && skipBeforeTime ? filterTimesAfterNow(timeSlots) : timeSlots;

  const categorizedSlots = categorize
    ? categorizeTimes(_timeSlots)
    : ({} as TCategorizedTimes);
  const t = useI18();

  const renderBadges = React.useCallback(
    (slots?: string[]) => {
      return (
        <div className="grid grid-cols-3 gap-2 p-3 relative">
          {slots?.map((time) => (
            <Badge
              key={time}
              onClick={() => onChange?.(time)}
              className={clsx(
                time === selected && "bg-primary",
                "hover:bg-gray-900 hover:text-white"
              )}
            >
              {time}
            </Badge>
          ))}
        </div>
      );
    },
    [selected, onChange]
  );

  return !categorize
    ? renderBadges(_timeSlots)
    : Object.keys(categorizedSlots).map(
        (dayName) =>
          categorizedSlots[dayName as keyof typeof categorizedSlots].length >
            0 && (
            <Collapse key={dayName} title={t(dayName as any)}>
              {renderBadges(
                categorizedSlots[dayName as keyof typeof categorizedSlots]
              )}
            </Collapse>
          )
      );
};

export default BadgeTimePicker;