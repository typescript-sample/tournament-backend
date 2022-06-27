export const config = {
  port: 8082,
  template: true,
  allow: {
    origin: "http://localhost:3000",
    credentials: "true",
    methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH",
    headers:
      "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  },
  log: {
    level: "debug",
    map: {
      time: "@timestamp",
      msg: "message",
    },
    db: true,
  },
  middleware: {
    log: true,
    skips: "health,log,middleware",
    request: "request",
    response: "response",
    status: "status",
    size: "size",
  },
  db: {
    user: "postgres",
    host: "localhost",
    password: "123456",
    database: "datademo",
    port: 5432,
  },
};

export const env = {
  sit: {
    port: 8082,
    db: {
      database: "masterdata_sit",
    },
  },
  prod: {
    middleware: {
      log: false,
    },
  },
};
