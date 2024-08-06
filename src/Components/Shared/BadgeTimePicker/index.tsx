import Badge from "@/Components/Shared/Badge";
import Collapse from "@/Components/Shared/Collapse";
import { clsx } from "@/Helpers/clsx";
import { categorizeTimes } from "@/Helpers/operations";
import { useI18 } from "@/i18next";

export type TBadgeTimePicker = {
  timeSlots?: string[];
  selected?: string | false;
  onChange(time: string): void;
  categorize?: boolean;
};

const BadgeTimePicker = ({
  timeSlots,
  onChange,
  selected,
  categorize,
}: TBadgeTimePicker) => {
  const categorizedSlots = categorize ? categorizeTimes(timeSlots) : [];
  const t = useI18();

  const renderBadges = React.useCallback(
    (slots?: string[]) => {
      return (
        <div className="grid grid-cols-3 gap-2 p-3 relative">
          {slots?.map((time) => (
            <Badge
              key={time}
              onClick={() => onChange(time)}
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
    ? renderBadges(timeSlots)
    : Object.keys(categorizedSlots).map((dayName) => (
      <Collapse key={dayName} title={t(dayName as any)}>
        {renderBadges(
          categorizedSlots[dayName as keyof typeof categorizedSlots]
        )}
      </Collapse>
    ));
};

export default BadgeTimePicker;
