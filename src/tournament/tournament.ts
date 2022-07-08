import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  type: string;
  status: string;
  createdAt: Date;
}
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

export interface Team {
  id: string;
  teamname: string;
  teamlogo: string;
  stadiumname: string;
  stadiumpic: string;
  description: string;
  status: string;
  tournamentId: string;
  eliminated: boolean;
  createdAt: Date;
}

export interface Round {
  id: string;
  tournamentId: string;
  matches: Match[];
}
export interface TournamentRepository extends Repository<Tournament, string> {
  // saveMatches(
  //   tournament: string,
  //   round: string,
  //   team1: string,
  //   team2: string
  // ): Promise<Match[]> | string;
  // getRoundByTournament(tournament: string): Promise<Round[]>;
}
export interface MatchRepository extends Repository<Match, string> {
  buildToInsertMatches(matches: Match[], ctx?: any): Promise<number>;
}

export interface RoundRepository extends Repository<Match, string> {
  getRoundByTournament(tournament: string): Promise<Round[]>;
}
export interface TeamRepository extends Repository<Match, string> {
  getTeamByTournament(tournament: string): Promise<Team[]>;
}
export interface TournamentService
  extends Service<Tournament, string, TournamentFilter> {
  buildToInsertMatches(matches: Match[], ctx?: any): Promise<number>;

  getRoundByTournament(tournament: string): Promise<Round[]>;

  getTeamByTournament(tournament: string): Promise<Team[]>;
}

export const tournamentModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  name: {
    required: true,
  },
  description: {},
  startDate: {},
  endDate: {},
  type: {},
  status: {},
  createdAt: { type: "datetime" },
};

export interface TournamentFilter extends Filter {
  id: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  type: string;
  status: string;
  createdAt: Date;
}
