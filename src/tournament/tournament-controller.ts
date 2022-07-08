import { Controller, handleError, Log } from "express-ext";
import { Request, Response } from "express";
import {
  Match,
  Tournament,
  TournamentFilter,
  TournamentService,
} from "./tournament";
import { buildToInsertBatch } from "query-core";
import { convertTeamsGeneratedToMatches, generateRound } from "./query";

export class TournamentController extends Controller<
  Tournament,
  string,
  TournamentFilter
> {
  constructor(log: Log, protected tournamentService: TournamentService) {
    super(log, tournamentService);
    this.saveMatches = this.saveMatches.bind(this);
    // this. = this.getTeamByTournament.bind(this);
  }

  // saveMatches(req: Request, res: Response) {
  //   const touramentId = req.params
  //   const round = req.params

  //   generateRound()

  //   this.tournamentService.saveMatches()
  // }
  saveMatches(req: Request, res: Response) {
    const { tournament } = req.params;

    this.tournamentService
      .getTeamByTournament(tournament)
      .then((teams) => {
        // generateRound(teams).forEach((element) => {
        //   res.status(200).json(element[1].id);
        // });
        const teamGenerated = generateRound(teams);
        this.tournamentService
          .getRoundByTournament(tournament)
          .then((round) => {
            const roundNumber = round.length + 1;

            const matches = convertTeamsGeneratedToMatches(
              teamGenerated,
              tournament
            );
            const result = this.tournamentService.buildToInsertMatches(matches);
            res.status(200).json(result);
          })
          .catch((err) => {
            handleError(err, res, this.log);
          });
      })
      .catch((err) => {
        handleError(err, res, this.log);
      });
  }

  // getTeamByTournament(req: Request, res: Response) {
  //   const { tournament } = req.params;
  //   this.tournamentService.getTeamByTournament(tournament).then((team) => {})
  // }

  // saveMatches(tournament: string): Promise<Match[]>
}
