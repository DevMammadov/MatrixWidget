import { TCreateDTO } from "@/Components/Containers/Contacts/TContacts";
import { TWorkerServicesDTO } from "@/Components/Containers/Services/TServices";
import { TTimeDTO } from "@/Components/Containers/Time/TTime";
import { TWorkersDSO } from "@/Components/Containers/Workers/TWorkers";
import { BASE_URL, http } from "@/Helpers/http";
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

export const getFreeSlots = async (data: TTimeDTO) => {
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

export const getWorkerServices = async (data: TWorkerServicesDTO) => {
  return await http.get("/Publics/getEmployeeServices", {
    tenantId: config.tenantId,
    langId: config.langId,
    ...data,
  });
};

export const getWorkerServicesRaw = async ({
  employeeId,
  filialId,
  time,
  startingDateTime,
}: TWorkerServicesDTO) => {
  return fetch(
    `${BASE_URL}/Publics/getEmployeeServices?tenantId=${
      config.tenantId
    }&filialId=${filialId}&employeeId=${employeeId}&startingDateTime=${startingDateTime}&langId=ru&time=${`${
      time ? window.encodeURIComponent(time) : "00:00"
    }:00`}`
  ).then((res) => res.json());
};
