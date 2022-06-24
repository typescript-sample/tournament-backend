import { Statement } from 'query-core';
import { TeamFilter } from './team';

export function buildQuery(s: TeamFilter): Statement {
    let query = `select * from teams`;
    const where = [];
    const params = [];
    let i = 1;
    if (s.id && s.id.length > 0) {
        where.push(`id = $${i++}`);
        params.push(s.id);
    }
    if (s.name && s.name.length > 0) {
        where.push(`name ilike $${i++}`);
        params.push('%' + s.name + '%');
    }
    if (s.status && s.status.length > 0) {
        where.push(`status ilike $${i++}`);
        params.push(s.status + '%');
    }
    if (s.decription && s.decription.length > 0) {
        where.push(`decription ilike $${i++}`);
        params.push('%' + s.decription + '%');
    }
    if (s.q && s.q.length > 0) {
        where.push(`(title  ilike$${i++} or description ilike $${i++}) `);
        params.push('%' + s.q + '%');
        params.push('%' + s.q + '%');
    }
    if (where.length > 0) {
        query = query + ` where ` + where.join(' and ');
    }
    return { query, params };
}
// CREATE INDEX interests_index ON users (interests);
// db.Query(`select interests from users where interests && $1 and skills && $2`, [ 'Basketball', 'Kapp' ])
