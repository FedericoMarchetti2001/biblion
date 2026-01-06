import { appConfig } from "../../app/config";

type RuntimeConfig = {
  useMocks: boolean;
  apiUrl: string;
};

let runtimeConfig: RuntimeConfig = {
  useMocks: appConfig.useMocks,
  apiUrl: appConfig.apiUrl
};

export const setRuntimeConfig = (next: RuntimeConfig) => {
  runtimeConfig = next;
};

export const getRuntimeConfig = () => runtimeConfig;
