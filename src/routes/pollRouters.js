import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { pollCreateSchema } from "../schemas/schemas.js";
import { getPoll, poll, pollResult } from "../controllers/pollConstrollers.js";
import { validatePollIdParams } from "../middlewares/pollMiddlewares.js";

const router = Router()

router.post("/poll", 
    validateSchema(pollCreateSchema, "body"), 
    poll
);

router.get("/poll", 
    getPoll
);

router.get("/poll/:id/result",
    validatePollIdParams,
    pollResult
)

export default router;