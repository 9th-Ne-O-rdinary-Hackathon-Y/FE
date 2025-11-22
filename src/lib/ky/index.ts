import ky from "ky";

const API_TIMEOUT = 10000; // 10초

const API_BASE_URL = "/api";

export const api = ky.create({
  timeout: API_TIMEOUT,
  prefixUrl: API_BASE_URL,
  retry: 0,
});
