import ky from "ky";

const API_TIMEOUT = 10000; // 10초

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = ky.create({
  prefixUrl: BASE_URL,
  timeout: API_TIMEOUT,
  retry: 0,
  hooks: {
    beforeRequest: [
      async () => {
        // 클라이언트측에서 필요한 헤더 추가 (예: 인증 토큰)
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        // 응답 처리 로직 (예: 토큰 갱신)

        return response;
      },
    ],
  },
});
