import { Statement } from "query-core";
import { Match, TournamentFilter } from "./tournament";
import { Team } from "./tournament";
import { nanoid } from "nanoid";
import e from "express";

interface Matches {
  team: Team[];
}
[];

export const getAllTeams = `select * from teams where tournamentId = $1`;
export const getTournamentById = `select * from tournaments where id = $1`;
export const getRoundByTournamentId = `select * from rounds where tournamentId = $1`;

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
  team: Team[],
  competitor: string
): Matches[] | Team[] => {
  // let index = teamArray.length;
  let duplicate = false;
  // do {
  //   team = [...randomTeam(teamArray, competitor)];

  //   // console.log("team", team);
  //   // console.log("roundGenerated", roundGenerated);
  //   duplicate = checkDuplicateMatch(team, roundGenerated);
  //   // console.log(duplicate);
  // } while (duplicate);
  // const newTeam = team.map((value, index) => {
  //   if (index >= team.length / 2) return value;
  // });
  const result = [];

  for (let i = 0; i < team.length / 2; i++) {
    result.push(team[i], team[team.length - 1 - i]);
  }

  // console.log(result);
  let result1 = [];
  if (competitor === "double") result1 = [...result, ...result.reverse()];
  // console.log(round);
  const result2 = splitTheTeam(result1);

  return result2;
};

const splitTheTeam = (team: Team[]) => {
  let result = [];
  team.forEach((item, index) => {
    if (index % 2 === 0) {
      result.push(team.slice(index, index + 2));
    }
  });
  return result;
};

export const checkDuplicateMatch = (
  team: Team[] | any,
  roundGenerated: Team[]
): boolean => {
  const round1 = roundGenerated;
  const round2 = round1.map((e: any) => e.id);
  // console.log(round2);

  let duplicate = false;

  let indexRound = 0;
  while (indexRound < round1.length) {
    let index = 0;

    while (index < team.length) {
      if (
        round1[indexRound][0].id === team[index].id &&
        round1[indexRound][1].id === team[index + 1].id
      ) {
        duplicate = true;
        break;
      }
      index = index + 2;
    }
    if (duplicate) {
      break;
    }
    console.log("indexRound", indexRound);
    indexRound++;
  }

  return duplicate;
};

export const randomTeam = (teamArray: Team[], competitor: string): Team[] => {
  const flagArray: number[] = [];
  const round = [];
  let index = teamArray.length;

  if (teamArray.length % 2 === 1) {
    const ghostTeam = { id: 999, teamname: "ghostteam" };
    round.push(ghostTeam);
  }

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

  // if (competitor === "double") {
  //   result = [...round, ...round.reverse()];
  //   // console.log(round);
  // }

  return result;
};

export const randomNumber = (min: number, max: number) => {
  const maxNumber = Math.random() * (max - min + 1);

  return Math.floor(maxNumber) + min;
};

export const convertTeamsGeneratedToMatches = (
  teamGenerated: Matches[] | Team[],
  tournamentId: string,
  round?: string
): Match[] => {
  const matches = [];
  const team = teamGenerated.length;
  teamGenerated.forEach((teamDuo, index: number) => {
    matches.push({
      id: nanoid(),
      tournamentId: tournamentId,
      team1: teamDuo[0],
      team2: teamDuo[1],
      score1: "0",
      score2: "0",
      round: round,
      createdAt: new Date(Date.now()),
    });
  });
  return matches;
};

export const checkGhostTeamAndRemove = (matches: Match[]) => {
  // console.log(matches);
  const result = matches.filter((match) => {
    if (
      match.team1.teamname === "ghostteam" ||
      match.team2.teamname === "ghostteam"
    ) {
      return false;
    } else {
      return true;
    }
  });
  return result;
};
