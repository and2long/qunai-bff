import bodyParser from "body-parser";
import express, { Express, Request, Response, Router } from 'express';
import session from 'express-session';
import { userRoute } from "./routes/user-route";
import { keycloak, memoryStore } from "./utils/keycloak-setup";
import { httpRequestLogger, httpResponseLogger } from './utils/loggers';

export const app: Express = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(httpRequestLogger);
app.use(httpResponseLogger);

app.use(session({
  secret: 'MBPdYr0LHW1cn24T2kxoq9HpuKGKPjSc',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
app.use(keycloak.middleware());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript');
});

const apiV1Router = Router();
app.use("/api/users", apiV1Router);
apiV1Router.use("/", userRoute);
