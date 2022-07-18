import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  type: string;
  status: string;
  competitor: string;
  rounds: Round[];
  createdAt: Date;
}
export interface Match {
  id: string;
  tournamentId: string;
  round: string;
  team1: Team;
  team2: Team;
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
  roundname: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
}
export interface TournamentRepository extends Repository<Tournament, string> {
  getTournamentById(id: string): Promise<Tournament[]>;
  updateRoundTournament(
    tournament: Tournament,
    newRound: Round[],
    ctx?: any
  ): Promise<number>;
}
export interface MatchRepository extends Repository<Match, string> {
  buildToInsertMatches(matches: Match[], ctx?: any): Promise<number>;
}

export interface RoundRepository extends Repository<Round, string> {
  getRoundByTournament(tournament: string): Promise<Round[]>;
  saveRound(roud: Round): Promise<number>;
  buildToInsertRound(rounds: Round[], ctx?: any): Promise<number>;
}
export interface TeamRepository extends Repository<Team, string> {
  getTeamByTournament(tournament: string): Promise<Team[]>;
}
export interface TournamentService
  extends Service<Tournament, string, TournamentFilter> {
  buildToInsertMatches(matches: Match[], ctx?: any): Promise<number>;
  buildToInsertRound(rounds: Round[], ctx?: any): Promise<number>;

  getRoundByTournament(tournament: string): Promise<Round[]>;

  getTeamByTournament(tournament: string): Promise<Team[]>;
  getTournamentById(id: string): Promise<Tournament[]>;

  updateRoundTournament(
    tournament: Tournament,
    newRound: Round[],
    ctx?: any
  ): Promise<number>;
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
  competitor: {},
  rounds: {},
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
  competitor: string;
  rounds: Round[];
  createdAt: Date;
}
