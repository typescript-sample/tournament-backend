import { Controller, Log } from "express-ext";
import { Tournament, TournamentFilter, TournamentService } from "./tournament";

export class TournamentController extends Controller<
  Tournament,
  string,
  TournamentFilter
> {
  constructor(log: Log, tournamentService: TournamentService) {
    super(log, tournamentService);
  }
}
