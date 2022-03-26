import axios from "axios";

/**
 * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
 */

type ErrorCodeName =
  | "OK"
  | "CANCELLED"
  | "UNKNOWN"
  | "INVALID_ARGUMENT"
  | "DEADLINE_EXCEEDED"
  | "NOT_FOUND"
  | "ALREADY_EXISTS"
  | "PERMISSION_DENIED"
  | "UNAUTHENTICATED"
  | "RESOURCE_EXHAUSTED"
  | "FAILED_PRECONDITION"
  | "ABORTED"
  | "OUT_OF_RANGE"
  | "UNIMPLEMENTED"
  | "INTERNAL"
  | "UNAVAILABLE"
  | "DATA_LOSS"
  | "UNEXPECTED"; // Oops, an unexpected error has occurred.

const errCodeBook: any = {
  500: "UNKNOWN",
  400: "INVALID_ARGUMENT",
  504: "DEADLINE_EXCEEDED",
  404: "NOT_FOUND",
  409: "ALREADY_EXISTS",
  403: "PERMISSION_DENIED",
  401: "UNAUTHENTICATED",
  429: "RESOURCE_EXHAUSTED",
  503: "UNAVAILABLE",
};

class RpcError extends Error {
  constructor(readonly code: ErrorCodeName, message?: string) {
    super(message);
    this.code = code;
  }
}

const httpErrorHandler = (error: unknown) => {
  if (error instanceof RpcError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const code: ErrorCodeName =
      errCodeBook(error.response?.status) ?? "UNEXPECTED";

    return new RpcError(code, error.message);
  }

  return new RpcError("UNEXPECTED", "Oops, an unexpected error has occurred.");
};

export { RpcError, httpErrorHandler };
