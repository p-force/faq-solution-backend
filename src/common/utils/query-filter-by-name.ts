import { Brackets, SelectQueryBuilder } from 'typeorm';

/**
 * Возвращает query, с добавленным условием поиска по имени
 * @param query
 * @param alias
 * @param search
 */
export function queryFilterByName<T>(
  query: SelectQueryBuilder<T>,
  alias: string,
  search: string,
): SelectQueryBuilder<T> {
  const searchArr = search
    .trim()
    .replace(/  +/g, ' ')
    .split(' ')
    .slice(0, 2)
    .filter((el) => el);

  if (searchArr.length === 1) {
    query.andWhere(
      new Brackets((qb) => {
        qb.where(`LOWER(${alias}.first_name) LIKE :first_name`, {
          first_name: `%${searchArr[0].toLowerCase()}%`,
        }).orWhere(`LOWER(${alias}.last_name) LIKE :last_name`, {
          last_name: `%${searchArr[0].toLowerCase()}%`,
        });
      }),
    );
  }

  if (searchArr.length === 2) {
    query.andWhere(
      new Brackets((qb) => {
        qb.where(`LOWER(${alias}.last_name) LIKE :last_name`).andWhere(
          `LOWER(${alias}.first_name) LIKE :first_name`,
          {
            last_name: `%${searchArr[0].toLowerCase()}%`,
            first_name: `%${searchArr[0].toLowerCase()}%`,
          },
        );
      }),
    );
  }

  return query;
}
