import { Statement } from "query-core";
import { MatchFilter } from "./match";
export function buildQuery(s: MatchFilter): Statement {
    let query = `select * from match`;
    const where = [];
    const params = [];
    let i = 1;
    if (s.id && s.id.length > 0) {
        where.push(`id = $${i++}`);
        params.push(s.id);
    }
    if (s.touramentid && s.touramentid.length > 0) {
        where.push(`tournament = $${i++}`);
        params.push(s.id);
    }
    if (s.round && s.round.length > 0) {
        where.push(`round ilike $${i++}`);
        params.push('%' + s.round + '%');
    }
    if (s.team1 && s.team1.length > 0) {
        where.push(`team1 ilike $${i++}`);
        params.push('%' + s.team1 + '%');
    }
    if (s.team2 && s.team2.length > 0) {
      where.push(`team2 ilike $${i++}`);
      params.push('%' + s.team2 + '%');
    }
    if (s.q && s.q.length > 0) {
        where.push(`(round  ilike $${i++} or id = $${i++} or tournamentid = $${i++} ) `);
        params.push('%' + s.q + '%');
        params.push( s.q );
        params.push( s.q );
    }
    if (where.length > 0) {
        query = query + ` where ` + where.join(' and ');
    }
    console.log('this is query: ', s);
    return { query, params };
}