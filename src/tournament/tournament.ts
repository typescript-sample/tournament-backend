import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  kind: string;
  status: string;
  leagueId: string;
}

export interface TournamentRepository extends Repository<Tournament, string> {}

export interface TournamentService
  extends Service<Tournament, string, TournamentFilter> {}

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
  kind: {},
  status: {},
  leagueId: {},
};

export interface TournamentFilter extends Filter {
  id: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  kind: string;
  status: string;
  leagueId: string;
}
