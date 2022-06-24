import { Application } from "express";
import { ApplicationContext } from "./context";

export function route(app: Application, ctx: ApplicationContext): void {
  app.get("/health", ctx.health.check);
  app.patch("/log", ctx.log.config);
  app.patch("/middleware", ctx.middleware.config);

  app.post("/users/search", ctx.user.search);
  app.get("/users/search", ctx.user.search);
  app.get("/users/:id", ctx.user.load);
  app.post("/users", ctx.user.create);
  app.put("/users/:id", ctx.user.update);
  app.patch("/users/:id", ctx.user.patch);
  app.delete("/users/:id", ctx.user.delete);

  app.post("/touraments/search", ctx.tourament.search);
  app.get("/touraments/search", ctx.tourament.search);
  app.get("/touraments/:id", ctx.tourament.load);
  app.post("/touraments", ctx.tourament.create);
  app.put("/touraments/:id", ctx.tourament.update);
  app.patch("/touraments/:id", ctx.tourament.patch);
  app.delete("/touraments/:id", ctx.tourament.delete);

  app.post("/leagues/search", ctx.league.search);
  app.get("/leagues/search", ctx.league.search);
  app.get("/leagues/:id", ctx.league.load);
  app.post("/leagues", ctx.league.create);
  app.put("/leagues/:id", ctx.league.update);
  app.patch("/leagues/:id", ctx.league.patch);
  app.delete("/leagues/:id", ctx.league.delete);
}
