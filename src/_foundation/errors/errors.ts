export class HTTPError extends Error {
  override readonly name = "HTTPError" as const;

  readonly http: {
    status: number;
    statusText: string;
    url: string;
  };

  constructor(response: Response) {
    super(response.statusText || String(response.status));

    this.http = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
  }
}
