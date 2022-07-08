import { Attributes, Filter } from "onecore";
import { Match } from "../match/match";

export interface Round {
  id: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
}

export const roundModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  tournamentId: {
    required: true,
  },
  matches: {},
  createdAt: { type: "datetime" },
};

export interface RoundFilter extends Filter {
  id: string;
  tournamentId: string;
  matches: Match[];
  createdAt: Date;
}
