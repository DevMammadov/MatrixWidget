import { IFetchOptions } from "@/Helpers/http.type";
import { clearEmptyFields } from "@/Helpers/operations";

const BASE_URL = "https://back.matrixcrm.ru/api/v1";
const defaultHeaders = {
  "Content-Type": "application/json",
};

export const http = {
  get: async (
    endpoint: string,
    params?: Record<string, unknown>,
    options?: IFetchOptions
  ) => {
    const queryString = params
      ? "?" + new URLSearchParams(clearEmptyFields(params)).toString()
      : "";

    try {
      const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
        ...getSafeOptions("GET", options),
      });

      if (!response.ok) {
        onFail(endpoint);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch GET error:", error);
    }
  },

  post: async (endpoint: string, body = {}, options?: IFetchOptions) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...getSafeOptions("POST", options),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        onFail(endpoint);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch POST error:", error);
    }
  },
};

const onFail = (url: string) => {
  console.log("failed to fetch from", url);
};

const getSafeOptions = (method: "GET" | "POST", options?: IFetchOptions) => {
  const safeOptions = options || {};
  const safeheaders = options?.headers ? options.headers : {};

  return {
    method: method,
    ...safeOptions,
    headers: {
      ...defaultHeaders,
      ...safeheaders,
    },
  };
};
