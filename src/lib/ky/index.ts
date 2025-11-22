import ky from "ky";

const API_TIMEOUT = 10000; // 10초

export const api = ky.create({
  timeout: API_TIMEOUT,
  prefixUrl: "/api/api",
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
