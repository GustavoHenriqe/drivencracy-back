import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { choiceCreateSchema } from "../schemas/schemas.js";
import { 
    validateExpiredPoll, 
    validatePollIdParams, 
    validatePollIdBody, 
    validateTitle, 
    validateChoiceIdParams 
} from "../middlewares/choiceMiddlewares.js";
import { choice, choiceVote, getChoice } from "../controllers/choiceControllers.js";

const router = Router();

router.post("/choice", 
    validateSchema(choiceCreateSchema, "body"),
    validatePollIdBody,
    validateExpiredPoll,
    validateTitle,
    choice
);

router.get("/poll/:id/choice",
    validatePollIdParams,
    getChoice
);

router.post("/choice/:id/vote",
    validateChoiceIdParams,
    choiceVote
);

export default router;