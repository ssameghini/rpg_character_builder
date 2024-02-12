export enum UCastOperators {
  eq,
  ne,
  or,
  in,
  gt,
  gte,
  lt,
  lte,
  like,
}

export enum mongodbOperators {
  eq = '$eq',
  ne = '$ne',
  in = '$in',
  gt = '$gt',
  gte = '$gte',
  lt = '$lt',
  lte = '$lte',
  and = '$and',
  not = '$not',
  or = '$or',
  nor = '$nor',
  elemMatch = '$elemMatch',
}

export const separator = /,\s*/;

export const sortingDirections = {
  asc: 1,
  desc: -1,
};

export interface IParsedFilters {
  [key: string]: any; // TODO Can be improved into actually listing the possible operators and syntaxes
}

export interface IParsedQuery {
  filters?: IParsedFilters;
  fields?: string | null;
  sort?: [string, number][];
  limit?: number;
  page?: number;
}
