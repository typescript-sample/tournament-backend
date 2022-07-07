import {
  HealthController,
  LogController,
  Logger,
  Middleware,
  MiddlewareController,
  resources,
} from "express-ext";
import { createChecker, DB } from "query-core";
import { TemplateMap } from "query-mappers";
import { TournamentController, useTournamentController } from "./tournament";
import { createValidator } from "xvalidators";
import { UserController, useUserController } from "./user";
import { LeagueController } from "league/league-controller";
import { useLeagueController } from "./league";

import { PlayerController, usePlayerController } from "./player";
import { MatchController, useMatchController } from "./match";
import { TeamController } from "./team/team-controller";
import { useTeamController } from "./team";
resources.createValidator = createValidator;

export interface ApplicationContext {
  health: HealthController;
  log: LogController;
  middleware: MiddlewareController;
  user: UserController;
  tournament: TournamentController;
  league: LeagueController;
  team: TeamController;
  player: PlayerController;
  match: MatchController;
}
export function useContext(
  db: DB,
  logger: Logger,
  midLogger: Middleware,
  mapper?: TemplateMap
): ApplicationContext {
  const log = new LogController(logger);
  const middleware = new MiddlewareController(midLogger);
  const sqlChecker = createChecker(db);
  const health = new HealthController([sqlChecker]);

  const user = useUserController(logger.error, db, mapper);
  const tournament = useTournamentController(logger.error, db, mapper);
  const league = useLeagueController(logger.error, db, mapper);
  const team = useTeamController(logger.error, db, mapper);
  const player = usePlayerController(logger.error, db);
  const match = useMatchController(logger.error, db);
  return {
    health,
    log,
    middleware,
    user,
    tournament,
    league,
    player,
    team,
    match,
  };
}
