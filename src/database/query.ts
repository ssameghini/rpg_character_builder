import _ from 'lodash';
import {
  IParsedQuery,
  IParsedFilters,
  mongodbOperators,
  separator,
  sortingDirections,
} from 'types/request';

const parseFilters = (filters: string[]): IParsedFilters => {
  return _.reduce(
    filters,
    (acc: IParsedFilters, filter) => {
      const [key, op, value] = filter.split(' ');
      let parsedValue: string | number = value;
      if (!key || !op || !value) return acc;
      if (_.isNumber(Number(value))) parsedValue = Number(value);
      if (_.has(mongodbOperators, op)) {
        acc[key] = {
          [mongodbOperators[op as keyof typeof mongodbOperators]]: parsedValue,
        };
      }
      return acc;
    },
    {},
  );
};

const parseSorting = (sort: string): [string, number][] => {
  return _.reduce(
    sort.split(separator),
    (acc: Array<[string, number]>, sort) => {
      let [key, direction = 'asc'] = sort.split('_');
      key = key.trim();
      direction = direction.trim();
      if (
        !key ||
        !sortingDirections[direction as keyof typeof sortingDirections]
      )
        return acc;
      acc.push([
        key,
        sortingDirections[direction as keyof typeof sortingDirections],
      ]);
      return acc;
    },
    [],
  );
};

export const parseQuery = (query: any) => {
  const parsedQuery: IParsedQuery = {
    filters: query.filters
      ? parseFilters(query.filters.split(separator))
      : undefined,
    fields: query.fields ? query.fields.split(',') : null,
    sort: query.sort ? parseSorting(query.sort) : [['_id', 1]],
    limit: query.limit ? parseInt(query.limit) : 10,
    page: query.page ? parseInt(query.page) : 1,
  };
  return parsedQuery;
};
