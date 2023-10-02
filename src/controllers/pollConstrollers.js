import db from "../database/db.js";

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export async function poll(req, res) {
    try {
        const { title, expireAt } = req.body;
        
        const currentDate = new Date();
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + 30);
        const formattedDate = formatDateTime(futureDate);

        const verificationExpireAt = expireAt ? expireAt : formattedDate;
        await db.collection("poll").insertOne({ title,  expireAt: verificationExpireAt});
        
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.send({ errors: error.message }).status(500);
    }
}

export async function getPoll(req, res) {
    try {
        const getPolls = await db.collection("poll").find({}).toArray()

        res.send(getPolls).status(200)

    } catch (error) {
        console.log(error);
        res.send({ errors: error.message }).status(500);
    }
}

export async function pollResult(req, res) {
    try {
        const poll = req.poll

        const getChoice = await db.collection("choice").find({ _id: poll._id }).toArray();

        const getBeastVote = getChoice.sort((a, b) => b.votes - a.votes)[0];

        const allPoll = {
            ...poll,
            result: {
                title: getBeastVote.title,
                votes: getBeastVote.votes
            }
        };

        
        res.send(allPoll).status(200)
    } catch (error) {
        console.log(error);
        res.send({ errors: error.message }).status(500);
    }
}