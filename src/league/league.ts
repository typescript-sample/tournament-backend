import { Attributes, DateRange, Filter, Repository, Service } from "onecore";

export interface League {
  id: string;
  name: string;
  description: string;
  status: string;
}

export interface LeagueRepository extends Repository<League, string> {}

export interface LeagueService extends Service<League, string, LeagueFilter> {}

export const leagueModel: Attributes = {
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

export interface LeagueFilter extends Filter {
  id: string;
  name: string;
  description: string;
  status: string;
}
