import { http } from "@/Helpers/http";
import { config } from "@/config";

export const getFilials = async () => {
  return await http.get("/Publics/getAllFilialByChainId", {
    tenantId: config.tenantId,
    chainId: config.chainId,
    langId: config.langId,
  });
};
