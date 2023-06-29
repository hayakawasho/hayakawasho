import { HTTPError } from "./errors/errors";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type APISchema = {
  [key: string]: {
    request: {
      body?: unknown;
      params?: Record<string, unknown>;
    };
    response: unknown;
  };
};

type APIRequestConfig<T extends APISchema, U extends Method> = {
  headers?: HeadersInit;
  body?: T[U]["request"]["body"];
  params?: T[U]["request"]["params"];
  responseType?: "text" | "json";
};

type APIResponse<T> = {
  data: T;
  headers: Headers;
  status: number;
};

const responseToAPIResponse = <T>(data: T, res: Response): APIResponse<T> => {
  return {
    data,
    headers: res.headers,
    status: res.status,
  };
};

export const apiClient = {
  delete<T extends APISchema>(
    url: string,
    { headers }: APIRequestConfig<T, "DELETE">
  ) {
    return fetch(url, {
      headers,
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        throw new HTTPError(res);
      }
      return responseToAPIResponse(res.ok, res);
    });
  },

  get<T extends APISchema>(
    url: string,
    { responseType = "json", headers }: APIRequestConfig<T, "GET">
  ) {
    return fetch(url, {
      headers,
      method: "GET",
    }).then(async (res) => {
      if (!res.ok) {
        throw new HTTPError(res);
      }
      const data = await res[responseType]();
      return responseToAPIResponse<T["GET"]["response"]>(data, res);
    });
  },

  patch<T extends APISchema>(
    url: string,
    { body, responseType = "json", headers }: APIRequestConfig<T, "PATCH">
  ) {
    return fetch(url, {
      body: JSON.stringify(body),
      headers,
      method: "PATCH",
    }).then(async (res) => {
      if (!res.ok) {
        throw new HTTPError(res);
      }
      const data = await res[responseType]();
      return responseToAPIResponse<T["PATCH"]["response"]>(data, res);
    });
  },

  post<T extends APISchema>(
    url: string,
    { body, responseType = "json", headers }: APIRequestConfig<T, "POST">
  ) {
    return fetch(url, {
      body: JSON.stringify(body),
      headers,
      method: "POST",
    }).then(async (res) => {
      if (!res.ok) {
        throw new HTTPError(res);
      }
      const data = await res[responseType]();
      return responseToAPIResponse<T["POST"]["response"]>(data, res);
    });
  },

  put<T extends APISchema>(
    url: string,
    { body, responseType = "json", headers }: APIRequestConfig<T, "PUT">
  ) {
    return fetch(url, {
      body: JSON.stringify(body),
      headers,
      method: "PUT",
    }).then(async (res) => {
      if (!res.ok) {
        throw new HTTPError(res);
      }
      const data = await res[responseType]();
      return responseToAPIResponse<T["PUT"]["response"]>(data, res);
    });
  },
};
