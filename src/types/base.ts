export interface BaseResponse<T> {
  result: string;
  data: T;
  error: {
    code: string;
    message: string;
  };
}
