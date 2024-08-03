import type { Dayjs } from "dayjs";
import type { i18n } from "i18next";
import sd from "i18next";

export type TConfig = {
  logo: string;
  isStep: number;
};

declare global {
  interface Window {
    matrixWidget: any;
    i18next: i18n;
    dayjs: typeof import("dayjs");
    matrixContext: React.Context<TContext>;
  }
}

export type TDayJS = Dayjs;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
