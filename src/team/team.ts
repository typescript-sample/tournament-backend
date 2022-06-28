import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface Team {
  id: string;
  teamname: string;
  teamlogo: string;
  stadiumname: string;
  stadiumpic: string;
  description: string;
  status: string;
  tournamentId: string;
}

export interface TeamRepository extends Repository<Team, string> {}

export interface TeamService extends Service<Team, string, TeamFilter> {}

export const teamModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  teamname: {
    required: true,
  },
  teamlogo: {},
  stadiumname: {},
  stadiumpic: {},
  description: {},
  status: {},
  tournamentId: {},
};

export interface TeamFilter extends Filter {
  id: string;
  teamname: string;
  teamlogo: string;
  stadiumname: string;
  stadiumpic: string;
  description: string;
  status: string;
  tournamentId: string;
}
