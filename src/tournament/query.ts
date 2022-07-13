import { Statement } from "query-core";
import { Match, TournamentFilter } from "./tournament";
import { Team } from "./tournament";
import { nanoid } from "nanoid";

interface Matches {
  team: Team[];
}
[];

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

export const generateRound = (
  teamArray: Team[],
  competitor: string,
  roundGenerated: Matches[] | Team[]
): Matches[] => {
  // let index = teamArray.length;
  let round = randomTeam(teamArray, competitor);
  // const ghostTeam = { id: "999", teamname: "ghost" };

  // if (teamArray.length % 2 === 1) round.push(null);

  // const round1 = round.concat(randomTeam(teamArray, competitor));

  // const result = [];

  // round1.forEach((item, index) => {
  //   if (index % 2 === 0) {
  //     result.push(round1.slice(index, index + 2));
  //   }
  // });

  let duplicate = false;

  do {
    if (duplicate) {
      round = randomTeam(teamArray, competitor);
      duplicate = false;
    }

    // console.log("round", round);

    round.forEach((element, index) => {
      if (index % 2 === 0) {
        const indexDuplicateRound1 = roundGenerated
          .flat()
          .findIndex((e: any) => e.id === round[index].id);
        const indexDuplicateRound2 = roundGenerated
          .flat()
          .findIndex((e: any) => e.id === round[index + 1].id);
        if (
          indexDuplicateRound1 === indexDuplicateRound2 - 1 &&
          indexDuplicateRound1 % 2 === 0
        ) {
          duplicate = true;

          console.log(duplicate);
        }
      }
    });
  } while (duplicate);

  let result = [];
  round.forEach((item, index) => {
    if (index % 2 === 0) {
      result.push(round.slice(index, index + 2));
    }
  });

  return result;
};

const randomTeam = (teamArray: Team[], competitor: string): Team[] => {
  const flagArray: number[] = [];
  const round = [];
  let index = teamArray.length;

  if (teamArray.length % 2 === 1) round.push(null);

  do {
    const team = randomNumber(0, teamArray.length - 1);

    if (flagArray.indexOf(team) === -1) {
      flagArray.push(team);
      round.push(teamArray[team]);
      index = index - 1;
    }
  } while (index > 0);

  let result = [...round];
  const result1 = [];

  if (competitor === "double") {
    result = [...round, ...round.reverse()];
    // console.log(round);
  }

  return result;
};

export const randomNumber = (min: number, max: number) => {
  const maxNumber = Math.random() * (max - min + 1);

  return Math.floor(maxNumber) + min;
};

export const convertTeamsGeneratedToMatches = (
  teamGenerated: Matches[],
  tournamentId: string,
  round?: string
): Match[] => {
  const matches = [];
  const team = teamGenerated.length;
  teamGenerated.forEach((teamDuo, index: number) => {
    matches.push({
      id: nanoid(),
      tournamentId: tournamentId,
      team1: teamDuo[0].id.toString(),
      team2: teamDuo[1].id.toString(),
      score1: "0",
      score2: "0",
      round: round,
    });
  });
  return matches;
};
