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
  let nearestDate: TDayJS | null = null;
  let smallestDifference = Infinity;
  let dayName = "";

  datesArray?.forEach((date) => {
    const currentDayjs = parseCustomDate(date);
    const difference = currentDayjs.diff(givenDate, "millisecond");

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

export const getRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const parseCustomDate = (dateString: string | null): TDayJS => {
  if (dateString === null) {
    return window.dayjs();
  }

  if (!window.dayjs(dateString).isValid()) {
    // Step 1: Split the date string by '.'
    const parts = dateString.split(".");

    // Step 3: Extract year, month, and day
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const day = parseInt(parts[2], 10);

    // Step 4: Create a Date object
    const jsDate = new Date(year, month, day);

    // Step 6: Create and return a dayjs object
    return window.dayjs(jsDate);
  } else {
    return window.dayjs(dateString);
  }
};
