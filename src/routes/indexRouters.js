import { Router } from "express";
import routerPoll from "./pollRouters.js";
import routerChoice from "./choiceRouters.js";

const routers = Router();

routers.use(routerPoll);
routers.use(routerChoice);

export default routers;