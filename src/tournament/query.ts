import { Statement } from "query-core";
import { Match, TournamentFilter } from "./tournament";
import { Team } from "./tournament";

export function buildQuery(s: TournamentFilter): Statement {
  let query = `select * from tournaments`;
  const where = [];
  const params = [];
  let i = 1;

  if (where.length > 0) {
    query = query + ` where ` + where.join(" and ");
  }

  if (s.id && s.id.length > 0) {
    where.push(`id = $${i++}`);
    params.push(s.id);
  }

  return { query, params };
}

export const generateRound = (teamArray: Team[]) => {
  let index = teamArray.length;
  console.log(teamArray.length);
  const round = [];
  const flagArray: number[] = [];
  do {
    const team = randomNumber(0, teamArray.length - 1);

    if (flagArray.indexOf(team) === -1) {
      flagArray.push(team);
      round.push(teamArray[team]);
      index = index - 1;
    }
  } while (index > 0);
  const result = [];

  round.forEach((item, index) => {
    if (index % 2 === 0) {
      result.push(round.slice(index, index + 2));
    }
  });

  //   console.log("result->28", result);
  return result;
};

export const randomNumber = (min: number, max: number) => {
  const maxNumber = Math.random() * (max - min + 1);

  return Math.floor(maxNumber) + min;
};

export const convertTeamsGeneratedToMatches = (
  teamGenerated: Team[],
  tournamentId: string
): Match[] => {
  const matches = [];
  teamGenerated.forEach((teamDuo, index: number) => {
    matches.push({
      id: index + 1,
      tournamentId: tournamentId,
      team1: teamDuo[0].id.toString(),
      team2: teamDuo[1].id.toString(),
      score1: "0",
      score2: "0",
    });
  });
  return matches;
};
