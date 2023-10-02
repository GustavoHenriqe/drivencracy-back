import { ObjectId } from "mongodb";
import db from "../database/db.js";

export async function choice(req, res) {
    try {
        const { pollId, title } = req.body
        await db.collection("choice").insertOne({ pollId, title, votes: 0 })

        res.sendStatus(201)

    } catch (error) {
        console.log(error);
        res.send({ errors: error.message }).status(500);
    }
}   

export async function getChoice(req, res) {
    try {
        const { id } = req.params

        const getChoice = await db.collection("choice").find({ pollId: id }).toArray()

        res.send(getChoice).status(200)

    } catch (error) {
        console.log(error);
        res.send({ errors: error.message }).status(500);
    }
}

export async function choiceVote(req, res) {
    try {
        const choice = req.choice;

        await db.collection("choice").updateOne(
            { _id: new ObjectId(choice._id)},
            { $set: { votes: choice.votes + 1 } }
        );

        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.send({ errors: error.message }).status(500);
    }
}