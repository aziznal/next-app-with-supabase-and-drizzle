export type SuccessResponse<T> = {
  _type: "success";
  data: T;
};

export type ErrorResponse = {
  _type: "error";
  errorMessage: string;
};

export type CustomResponse<T> = SuccessResponse<T> | ErrorResponse;
