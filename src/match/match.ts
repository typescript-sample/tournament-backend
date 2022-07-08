import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Match {
  id: string;
  tournamentId: string;
  round: string;
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  createdAt: Date;
}

export interface MatchRepository extends Repository<Match, string> {
  getMatches(tournamentId: string, round: string): Promise<Match[]>;
}

export interface MatchService extends Service<Match, string, MatchFilter> {
  getMatches(tournamentId: string, round: string): Promise<Match[]>;
}

export const matchModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  tournamentId: {
    required: true,
  },
  round: {
    required: true,
  },
  team1: {
    required: true,
  },
  team2: {
    required: true,
  },
  score1: {},
  score2: {},
  createdAt: {
    type: "datetime",
  },
};

export interface MatchFilter extends Filter {
  id: string;
  tournamentId: string;
  round: string;
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  createdAt: Date;
}
