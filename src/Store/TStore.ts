import { TFilial } from "@/Steps/Filials/TFilials";

export type TStore = {
  selectedFilial?: TFilial;
  selectedFilials?: string[];
};

export type TContext = {
  store: TStore;
  setStore(data: Partial<TStore>): void;
};
