import { Statement } from "query-core";
import { Match, TournamentFilter } from "./tournament";
import { Team } from "./tournament";
import { nanoid } from "nanoid";
import e from "express";

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
  roundGenerated: Team[]
): Matches[] | Team[] => {
  // let index = teamArray.length;
  let team = [];
  let duplicate = false;
  do {
    team = [...randomTeam(teamArray, competitor)];

    // console.log("team", team);
    // console.log("roundGenerated", roundGenerated);
    duplicate = checkDuplicateMatch1(team, roundGenerated);
    // console.log(duplicate);
  } while (duplicate);

  // const ghostTeam = { id: "999", teamname: "ghost" };

  // if (teamArray.length % 2 === 1) round.push(null);

  // const round1 = round.concat(randomTeam(teamArray, competitor));

  // const result = [];

  // round1.forEach((item, index) => {
  //   if (index % 2 === 0) {
  //     result.push(round1.slice(index, index + 2));
  //   }
  // });
  // if(teamArray.length )

  // let duplicate = false;
  // // console.log(roundGenerated.flat());
  // const newRound = roundGenerated.flat();
  // // console.log(newRound);

  // const newRound1 = newRound.map((e: any) => e.id);

  // console.log(newRound1);

  const result = splitTheTeam(team);

  // console.log(result);

  return result;
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

export const checkDuplicateMatch1 = (
  team: Team[] | any,
  roundGenerated: Team[]
): boolean => {
  const round1: any = roundGenerated;
  const team1 = splitTheTeam(team);
  // console.log(round2);
  let duplicate = false;
  for (let i = 0; i < round1.length; i++) {
    const round2 = round1[i].map((e: any) => e.id);
    for (let i = 0; i < team1.length / 2; i++) {
      const team2 = team1[i].map((e: any) => e.id);
      if (JSON.stringify(round2) === JSON.stringify(team2)) {
        // console.log(JSON.stringify(round2), JSON.stringify(team2));
        duplicate = true;
        break;
      }
    }
    if (duplicate) {
      break;
    }
  }

  return duplicate;
};

const randomTeam = (teamArray: Team[], competitor: string): Team[] => {
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

export const checkGhostMatchAndRemove = (matches: Team[]) => {
  matches.pop();
  matches.shift();
  // console.log("aa", indexGhostTeam);

  console.log("matches", matches);
  return matches;
};
