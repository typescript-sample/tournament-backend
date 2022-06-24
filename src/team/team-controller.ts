import { Controller, Log } from 'express-ext';
import { Teams, TeamFilter, TeamService } from './team';

export class TeamController extends Controller<Teams, string, TeamFilter> {
    constructor(log: Log, TeamService: TeamService) {
        super(log, TeamService);
    }
}
