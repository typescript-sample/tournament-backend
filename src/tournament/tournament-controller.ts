import { Controller, handleError, Log } from "express-ext";
import { Request, Response } from "express";
import { nanoid } from "nanoid";
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
            this.tournamentService
              .getRoundByTournament(tournament)
              .then((round) => {
                console.log(tournamentResult);
                console.log(tournamentResult[0].competitor);

                let indexRound = teams.length;

                if (indexRound % 2 === 0 && indexRound >= 0)
                  indexRound = indexRound - 1;

                let roundArray = [];
                const roundGenerated = [];

                while (indexRound > 0) {
                  const roundId = nanoid();

                  const teamGenerated = generateRound(
                    teams,
                    tournamentResult[0].competitor,
                    roundGenerated
                  );

                  roundGenerated.push(...teamGenerated);

                  const matches = convertTeamsGeneratedToMatches(
                    teamGenerated,
                    tournament,
                    roundId
                  );

                  // console.log(Date.now);
                  roundArray = [
                    ...roundArray,
                    {
                      matches: matches,
                      roundname: (teams.length - indexRound).toString(),
                      tournamentid: tournament,
                      createat: new Date(Date.now()),
                    },
                  ];
                  indexRound--;
                }
                // console.log();
                // }

                // const matches = convertTeamsGeneratedToMatches(
                //   teamGenerated,
                //   tournament,
                //   (teams.length- indexRound).toString()
                // );

                // let maxRoundNumber = teams.length;
                // let indexRound = roundArray.length + 1;

                // // while(indexRound  < maxRoundNumber){

                // //   indexRound++
                // //   round
                // // }

                // const matches = convertTeamsGeneratedToMatches(
                //   teamGenerated,
                //   tournament
                // );
                // const result =
                //   this.tournamentService.buildToInsertMatches(matches);

                res.status(200).json({ message: roundArray });
              })
              .catch((err) => {
                handleError(err, res, this.log);
              });
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
