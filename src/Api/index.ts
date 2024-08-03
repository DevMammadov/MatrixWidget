import { http } from "@/Helpers/http";
import { TCreateDTO } from "@/Steps/Contacts/TContacts";
import { TTimeDSO } from "@/Steps/Time/TTime";
import { TWorkersDSO } from "@/Steps/Workers/TWorkers";
import { config } from "@/config";

export const getFilials = async () => {
  return await http.get("/Publics/getAllFilialByChainId", {
    tenantId: config.tenantId,
    chainId: config.chainId,
    langId: config.langId,
  });
};

export const getFilialServices = async (
  filialId?: string,
  employeeId?: string
) => {
  return await http.get("/Publics/getFilialServices", {
    tenantId: config.tenantId,
    filialId,
    employeeId,
    langId: config.langId,
  });
};

export const getWorkers = async (data: Partial<TWorkersDSO>) => {
  return await http.post("/Publics/employeeWorkTimesAndRecordTimes", data);
};

export const getFreeSlots = async (data: TTimeDSO) => {
  return await http.post("/Publics/getEmployeeWorkDatesAndFreeTimeSlots", {
    tenantId: config.tenantId,
    ...data,
  });
};

export const getConfirmationCode = async (data: TCreateDTO) => {
  return await http.post(
    `/Publics/generateConfirmationCode?tenantId=${config.tenantId}`,
    data
  );
};

export const addRecord = async (data: TCreateDTO, confirmCode: string) => {
  return await http.post(
    `/Publics/addRecordForPublicWidget?tenantId=${config.tenantId}&confirmationCode=${confirmCode}`,
    data
  );
};
