import express from "express";
import expressIP from "express-ip";
import { publicRouter } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();
web.use(expressIP().getIpInfoMiddleware);
web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);
