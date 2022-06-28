import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Match {
    id: string;
    touramentid: string;
    round: string;
    team1: string;
    team2: string;
    score1: string;
    score2: string;
    time: string;
}

export interface MatchRepository extends Repository<Match, string> {}

export interface MatchService
  extends Service<Match, string, MatchFilter> {
    getMatches(tournamentId: string, round: string): Promise<Match>
  }

export const matchModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  touramentid: {},
  round: {},
  team1: {},
  team2: {},
  score1: {},
  score2: {},
  time: {},
};

export interface MatchFilter extends Filter {
    id: string;
    touramentid: string;
    round: string;
    team1: string;
    team2: string;
    score1: string;
    score2: string;
    time: Date;
}
