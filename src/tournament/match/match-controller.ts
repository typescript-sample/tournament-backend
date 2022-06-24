import { Controller, Log } from "express-ext";
import { Match, MatchFilter, MatchService } from "./match";

export class MatchController extends Controller<
  Match,
  string,
  MatchFilter>
{
  constructor(log: Log, matchService: MatchService) {
    super(log, matchService);
  }
}
