import { http } from "@/Helpers/http";
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
