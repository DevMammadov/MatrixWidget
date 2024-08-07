import { config } from "@/config";
import { DeepPartial, TDayJS } from "@/types";

export const deepMerge = <T>(
  target: T | null | undefined,
  source: DeepPartial<T>
): T => {
  if (
    target == null ||
    typeof target !== "object" ||
    typeof source !== "object"
  ) {
    return source as T;
  }

  for (const key in source) {
    if (Array.isArray(source[key])) {
      (target as T)[key] = source[key] as T[typeof key];
    } else if (source[key] instanceof Object) {
      if (!(key in target)) {
        Object.assign(target, { [key]: source[key] });
      } else {
        (target as T)[key] = deepMerge(
          (target as T)[key],
          source[key] as T[typeof key]
        );
      }
    } else {
      (target as T)[key] = source[key] as T[typeof key];
    }
  }

  return target;
};

export const clearEmptyFields = (
  obj: Record<string, any>
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );
};

export const isEmpty = <T extends object>(obj: T) => {
  return Object.keys(obj).length === 0;
};

export const findNearestDate = (givenDate: TDayJS, datesArray: string[]) => {
  const givenDayjs = window.dayjs(givenDate);
  let nearestDate: TDayJS | null = null;
  let smallestDifference = Infinity;
  let dayName = "";

  datesArray.forEach((date) => {
    const currentDayjs = window.dayjs(date);
    const difference = currentDayjs.diff(givenDayjs, "millisecond");

    if (difference >= 0 && difference < smallestDifference) {
      smallestDifference = difference;
      nearestDate = currentDayjs;
    }
  });

  if (nearestDate) {
    const diffInDays = Math.ceil(smallestDifference / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      dayName = "today";
    } else if (diffInDays === 1) {
      dayName = "tomorrow";
    } else if (diffInDays === 2) {
      dayName = "afterTomorrow";
    } else {
      const nearestDateObj = (nearestDate as TDayJS).toDate();
      dayName = nearestDateObj.toLocaleDateString(config.langId, {
        day: "2-digit",
        month: "short",
      });
    }

    return {
      dayName,
      nearestDate,
      diffInDays,
    };
  }

  return null;
};

export const mergeUniqueArrays = (...arrays: string[][]): string[] => {
  const uniqueItems = new Set<string>();

  arrays.forEach((array) => {
    array.forEach((item) => {
      uniqueItems.add(item);
    });
  });

  const uniqueArray = Array.from(uniqueItems);

  uniqueArray.sort((a, b) => {
    const [aHours, aMinutes] = a.split(":").map(Number);
    const [bHours, bMinutes] = b.split(":").map(Number);

    if (aHours === bHours) {
      return aMinutes - bMinutes;
    }
    return aHours - bHours;
  });

  return uniqueArray;
};

export type TTimeCategory = "morning" | "afternoon" | "evening";
export type TCategorizedTimes = Record<TTimeCategory, string[]>;

export const categorizeTimes = (times?: string[]): TCategorizedTimes => {
  const morning: string[] = [];
  const afternoon: string[] = [];
  const evening: string[] = [];

  if (!times) return {} as TCategorizedTimes;

  times.forEach((time) => {
    const [hours] = time.split(":").map(Number);

    if (hours < 13) {
      morning.push(time);
    } else if (hours >= 13 && hours < 18) {
      afternoon.push(time);
    } else {
      evening.push(time);
    }
  });

  return { morning, afternoon, evening };
};

export const uniqueBy = <T>(array: T[], prop: keyof T) => {
  const map = new Map();

  array.forEach((item) => {
    if (!map.has(item[prop])) {
      map.set(item[prop], item);
    }
  });
  return Array.from(map.values());
};

export const filterTimesAfterNow = (timeArray?: string[]) => {
  const currentTime = window.dayjs().format("HH:mm");

  const filteredTimes = timeArray?.filter((time) => {
    return window
      .dayjs(time, "HH:mm")
      .isAfter(window.dayjs(currentTime, "HH:mm"), "minute");
  });

  return filteredTimes;
};
