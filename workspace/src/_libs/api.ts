import ky, { HTTPError } from "ky";

type Options<T = object> = {
  params?: T;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

const client = ky.create({
  timeout: 10000, // milliseconds
});

class HttpError<T = any> extends Error {
  constructor(public response: Response & T) {
    super(response.statusText);
    this.name = "HttpError";
  }
}

export const apiClient = {
  async get<T, U = object>(path: string, options?: Options<U>) {
    try {
      const response = await client.get<T>(path, {
        ...options,
        prefixUrl: "https://hayakawasho.microcms.io/api/v1",
        searchParams: options?.params ?? undefined,
        headers: {
          "Content-Type": "application/json",
          "X-MICROCMS-API-KEY": import.meta.env.VITE_API_KEY,
        },
      });
      return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw new HttpError(e.response);
      }
      throw e;
    }
  },
};
