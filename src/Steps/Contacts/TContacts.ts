export type TContactForm = {
  onSubmit(data: TClientDTO): void;
  loading: boolean;
  hasConfirmCode: boolean;
  codeError: boolean;
};

export type TClientDTO = {
  name: string;
  surname: string;
  fatherName: string;
  phoneNumber: string;
  email: string;
  discount?: number;
  comment?: string;
  confirmCode?: string;
};

interface TServiceDTO {
  complexServiceId: string;
  countService: number;
  discount: number;
  parentId: string | undefined;
  price: number;
  rowNumber: number;
  salePrice: number;
  serviceId: string;
  serviceName: string;
}

export type TCreateDTO = {
  client: TClientDTO;
  colorCodeRecord: string;
  comment?: string;
  complexServiceIds: string[];
  dateOfRecord: string;
  durationOfTime: number;
  endTime: string;
  filialId: string;
  langId: string;
  recordCategoryIds: string[];
  resources: string[];
  services: TServiceDTO[];
  startTime: string;
  toEmployeeId: string;
  totalPrice: number;
};
