import { SelectQueryBuilder } from 'typeorm';

export function queryFilterByDate<T>(
  query: SelectQueryBuilder<T>,
  alias: string,
  search: string,
): SelectQueryBuilder<T> {
  const dates = search.trim().split(',').slice(0, 2);

  if (dates.length > 1) {
    query.orWhere(`${alias}.date BETWEEN :begin AND :end`, { begin: dates[0], end: dates[1] });
  } else {
    query.orWhere(`${alias}.date > :begin`, { begin: dates[0] });
  }

  return query;
}
