import { Attributes, Filter, Repository, Service } from "onecore";

export interface Players {
  id: string;
  name: string;
  dateOfBirth: Date;
  createdAt: Date;
}
export interface PlayerFilter extends Filter {
  id: string;
  name: string;
  dateOfBirth: Date;
}
export interface PlayerRepository extends Repository<Players, string> {}
export interface PlayerService extends Service<Players, string, PlayerFilter> {}
export const PlayerModel: Attributes = {
  id: {
    key: true,
    match: "equal",
  },
  name: {},
  dateOfBirth: {},
  createdAt: { type: "datetime" },
};
