import { Controller, Log } from "express-ext";
import { Team, TeamFilter, TeamService } from "./team";

export class TeamController extends Controller<Team, string, TeamFilter> {
  constructor(log: Log, teamService: TeamService) {
    super(log, teamService);
  }
}
