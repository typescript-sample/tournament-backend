import { Statement } from "query-core";
import { LeagueFilter } from "./league";
export function buildQuery(s: LeagueFilter): Statement {
  let query = `select * from leagues`;
  const where = [];
  const params = [];
  let i = 1;

  if (where.length > 0) {
    query = query + ` where ` + where.join(" and ");
  }

  if (s.id && s.id.length > 0) {
    where.push(`id = $${i++}`);
    params.push(s.id);
  }

  return { query, params };
}
