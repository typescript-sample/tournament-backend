import { Controller, handleError, Log } from "express-ext";
import e, { Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  Match,
  Tournament,
  TournamentFilter,
  TournamentService,
} from "./tournament";
import { buildToInsertBatch } from "query-core";
import {
  checkDuplicateMatch,
  checkGhostTeamAndRemove,
  convertTeamsGeneratedToMatches,
  generateRound,
  randomTeam,
} from "./query";

export class TournamentController extends Controller<
  Tournament,
  string,
  TournamentFilter
> {
  constructor(log: Log, protected tournamentService: TournamentService) {
    super(log, tournamentService);
    this.getGeneratedMatches = this.getGeneratedMatches.bind(this);
    // this. = this.getTeamByTournament.bind(this);
  }

  getGeneratedMatches(req: Request, res: Response) {
    const { tournament } = req.params;

    const roundArray = [];

    this.tournamentService
      .getTournamentById(tournament)
      .then((tournamentResult) => {
        // console.log(tournamentResult);
        this.tournamentService
          .getTeamByTournament(tournament)
          .then((teams) => {
            // console.log(tournamentResult);
            // console.log(tournamentResult[0].competitor);

            if (tournamentResult[0].rounds === null) {
              let indexRound = teams.length;

              if (indexRound % 2 === 0 && indexRound >= 0)
                indexRound = indexRound - 1;

              console.log("indexRound", indexRound);

              let roundArray = [];
              let matchesArray = [];

              const team = randomTeam(teams, tournamentResult[0].competitor);

              while (indexRound > 0) {
                const roundId = nanoid();
                const teamGenerated = generateRound(
                  team,
                  tournamentResult[0].competitor
                );

                team.push(team[1]);
                team.splice(1, 1);

                // roundGenerated = [...roundGenerated, ...teamGenerated];
                // console.log(roundGenerated);

                // checkGhostMatchAndRemove(roundGenerated);

                const matches = convertTeamsGeneratedToMatches(
                  teamGenerated,
                  tournament,
                  roundId
                );

                // // console.log(Date.now);
                const newMatches = checkGhostTeamAndRemove(matches);
                // console.log(newMatches);
                matchesArray.push(...newMatches);

                roundArray = [
                  ...roundArray,
                  {
                    id: roundId,
                    matches: newMatches,
                    roundname: (teams.length - indexRound).toString(),
                    tournamentId: tournament,
                    createdAt: new Date(Date.now()),
                  },
                ];

                indexRound--;
                console.log("indexRound", indexRound);
              }

              this.tournamentService.buildToInsertMatches(matchesArray);

              const result = this.tournamentService
                .buildToInsertRound(roundArray)
                .then()
                .catch((err) => {
                  handleError(err, res);
                });

              this.tournamentService.updateRoundTournament(
                tournamentResult[0],
                roundArray
              );

              res.status(200).json({
                message: matchesArray,
              });
            } else {
              res.status(400).json({
                message: "Rounds already exist",
              });
            }
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
