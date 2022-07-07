import { randomNumber } from "./randomNumber";
import { Team } from "../team/team";
import { QueryResult } from "pg";

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

  return round;
};

// export const createMath = (team)
