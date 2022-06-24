import { Controller, Log } from "express-ext";
import { League, LeagueFilter, LeagueService } from "./league";

export class LeagueController extends Controller<League, string, LeagueFilter> {
  constructor(log: Log, leagueService: LeagueService) {
    super(log, leagueService);
  }
}
