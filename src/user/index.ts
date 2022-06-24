import { Log, Manager, Search } from "onecore";
import { DB, postgres, SearchBuilder } from "query-core";
import { TemplateMap, useQuery } from "query-mappers";
import {
  User,
  UserFilter,
  userModel,
  UserRepository,
  UserService,
} from "./user";
import { UserController } from "./user-controller";
export * from "./user";
export { UserController };

import { SqlUserRepository } from "./sql-user-repository";

export class UserManager
  extends Manager<User, string, UserFilter>
  implements UserService
{
  constructor(search: Search<User, UserFilter>, repository: UserRepository) {
    super(search, repository);
  }
}
export function useUserService(db: DB, mapper?: TemplateMap): UserService {
  const query = useQuery("user", mapper, userModel, true);
  const builder = new SearchBuilder<User, UserFilter>(
    db.query,
    "users",
    userModel,
    postgres,
    query
  );
  const repository = new SqlUserRepository(db);
  return new UserManager(builder.search, repository);
}
export function useUserController(
  log: Log,
  db: DB,
  mapper?: TemplateMap
): UserController {
  return new UserController(log, useUserService(db, mapper));
}
