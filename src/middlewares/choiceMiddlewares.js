import { ObjectId } from "mongodb";
import db from "../database/db.js";

export async function validateChoiceIdParams(req, res, next) {
    try {
        const { id } = req.params; 

        const searchChoiceId = await db.collection("choice").findOne({ _id: new ObjectId(id) });
        
        if ( !searchChoiceId ) {
            res.sendStatus(404);
            return;
        }

        req.choice = searchChoiceId;
        
        next();
    } catch (error) {
        console.log(error);
        res.send({ errors: "Invalid Id" }).status(500);
    };
}

export async function validatePollIdBody(req, res, next) {
    try {
        const { pollId } = req.body;

        const searchPollId = await db.collection("poll").findOne({ _id: new ObjectId(pollId)});

        if ( !searchPollId ) {
            res.sendStatus(404);
            return;
        };

        req.poll = searchPollId;

        next();
    } catch (error) {
        console.log(error);
        res.send({ errors: "Invalid Id" }).status(500);
    };
};

export async function validatePollIdParams(req, res, next) {
    try {
        const { id } = req.params;

        const searchPollId = await db.collection("poll").findOne({ _id: new ObjectId(id) });

        if ( !searchPollId ) {
            res.sendStatus(404);
            return;
        };

        req.poll = searchPollId;

        next();
    } catch (error) {
        console.log(error);
        res.send({ errors: "Invalid Id" }).status(500);
    };
}

export async function validateTitle(req, res, next) {
    try {   
        const { title } = req.body;

        const searchTitle = await db.collection("choice").findOne({ title: title });

        if ( searchTitle ) {
            res.sendStatus(409);
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.send({ errors: error.message }).status(500);
    }
}

export async function validateExpiredPoll(req, res, next) {
    try { 
        const poll = req.poll;

        const expirationDate = new Date(poll.expireAt);
        const now = new Date();

        if ( now > expirationDate ) {
            res.sendStatus(404);
            return;
        }
        
        next();
    } catch (error) {
        console.log(error);
        res.send({ errors: error.message }).status(500);
    }
}