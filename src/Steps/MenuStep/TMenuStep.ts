import { config } from "@/config";

export type MenuItem = {
  label: string;
  icon: string;
  key: keyof typeof config.tabId;
  index: number;
};
