import { ObjectId } from "mongodb";
import db from "../database/db.js";

export async function validatePollIdParams(req, res, next) {
    try {
        const { id } = req.params;

        const searchPoll = await db.collection("poll").findOne({ _id: new ObjectId(id) });
        
        if ( !searchPoll ) {
            res.sendStatus(404);
            return;
        }

        req.poll = searchPoll;

        next();
    }  catch (error) {
        console.log(error);
        res.send({ errors: "Invalid Id" }).status(500);
    }
}