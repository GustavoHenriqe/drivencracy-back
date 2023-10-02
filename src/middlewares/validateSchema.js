export default function validateSchema (schema, data) {
    return (req, res, next) => {
        const result = schema.validate(req[data]);
        if ( result.error ) {
            res.sendStatus(422);
            return
        }

        next();
    }
}