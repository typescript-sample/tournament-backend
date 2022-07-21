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
  isCompetitor,
  randomTeam,
  splitTheTeam,
} from "./query";

export class TournamentController extends Controller<
  Tournament,
  string,
  TournamentFilter
> {
  constructor(log: Log, protected tournamentService: TournamentService) {
    super(log, tournamentService);
    this.getGeneratedMatches = this.getGeneratedMatches.bind(this);
    this.getAllTournament = this.getAllTournament.bind(this);
    this.createTournament = this.createTournament.bind(this);
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
              let teamLength = teams.length;

              if (indexRound % 2 === 0 && indexRound >= 0) {
                indexRound = indexRound - 1;
                teamLength = teamLength - 1;
              }

              let roundArray = [];
              let matchesArray = [];
              let saveTeam = [];
              const team = randomTeam(teams, tournamentResult[0].competitor);

              while (indexRound > 0) {
                const roundId = nanoid();
                const teamGenerated = generateRound(team);

                team.push(team[1]);
                team.splice(1, 1);

                saveTeam = [...saveTeam, teamGenerated];

                const newTeamGenerated = splitTheTeam(teamGenerated);
                const matches = convertTeamsGeneratedToMatches(
                  newTeamGenerated,
                  tournament,
                  roundId,
                  teamLength - indexRound
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
                    roundname: (teamLength - indexRound + 1).toString(),
                    tournamentId: tournament,
                    createdAt: new Date(Date.now()),
                  },
                ];

                indexRound--;
              }

              if (tournamentResult[0].competitor === "double") {
                let indexReverse = teams.length;
                let teamLength = teams.length;
                if (indexReverse % 2 === 0 && indexReverse >= 0) {
                  indexReverse = indexReverse - 1;
                  teamLength = teamLength - 1;
                }

                while (indexReverse > 0) {
                  saveTeam.forEach((element) => {
                    const roundId = nanoid();
                    const teamReversed = element.reverse();

                    const newTeamGenerated = splitTheTeam(teamReversed);

                    const matches = convertTeamsGeneratedToMatches(
                      newTeamGenerated,
                      tournament,
                      roundId,
                      teamLength * 2 - indexReverse
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
                        roundname: (
                          teamLength * 2 -
                          indexReverse +
                          1
                        ).toString(),
                        tournamentId: tournament,
                        createdAt: new Date(Date.now()),
                      },
                    ];

                    indexReverse--;
                  });
                }

                this.tournamentService
                  .buildToInsertMatches(matchesArray)
                  .then((r) => {
                    if (r === 0) {
                      res.status(400).json({ message: "Save match failed" });
                    }
                  })
                  .catch((err) => {
                    handleError(err, res, this.log);
                  });

                this.tournamentService
                  .buildToInsertRound(roundArray)
                  .then((r) => {
                    if (r === 0) {
                      res.status(400).json({ message: "Save round failed" });
                    }
                  })
                  .catch((err) => {
                    handleError(err, res, this.log);
                  });

                this.tournamentService
                  .updateRoundTournament(tournamentResult[0], roundArray)
                  .then((r) => {
                    if (r === 0) {
                      res
                        .status(400)
                        .json({ message: "Update Tournament failed" });
                    }
                  })
                  .catch((err) => {
                    handleError(err, res, this.log);
                  });
              }
              res.status(200).json({
                message: "Generate succedded",
                // message: roundArray,
              });
            } else {
              res.status(400).json({
                message: "Rounds already exist",
                // message: roundArray,
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

  getAllTournament(req: Request, res: Response) {
    this.tournamentService
      .getAllTournament()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        handleError(err, res, this.log);
      });
  }

  createTournament(req: Request, res: Response) {
    // const tournament = req.body;
    // this.tournamentService
    //   .createTournament(tournament)
    //   .then((result) => {
    //     if (result !== 0) res.status(201).json({ message: "Create success" });
    //     else {
    //       res.status(400).json({ err: "False to create tournament" });
    //     }
    //   })
    //   .catch((err) => handleError(err, res, this.log));
    // if (tournament.id !== null) {
    //   this.tournamentService.createStandings(tournament);
    // }
  }

  // getTeamByTournament(req: Request, res: Response) {
  //   const { tournament } = req.params;
  //   this.tournamentService.getTeamByTournament(tournament).then((team) => {})
  // }

  // saveMatches(tournament: string): Promise<Match[]>
}
