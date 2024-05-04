type RawDBSearchParams = {
  limit?: number;
  offset?: number;
  orders?: string;
  q?: string;
  fields?: string;
  ids?: string;
  filters?: string;
};

type RawDBResponse<T> = {
  contents: (T & {
    id: string;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    revisedAt: Date;
  })[];
  totalCount: number;
  offset: number;
  limit: number;
};

type RawWorkResponse = {
  title: string;
  eyecatch: {
    url: string;
    width: number;
    height: number;
  };
  screenshots?: {
    url: string;
    width: number;
    height: number;
  }[];
  category: string[];
  launch: Date;
  url?: string;
  stacks: string[];
};

export type WorksAPISchema = {
  GET: {
    request: {
      params: RawDBSearchParams;
    };
    response: RawDBResponse<RawWorkResponse>;
  };
};
