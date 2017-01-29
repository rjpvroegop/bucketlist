export class Service {
    sendError(err, res) {
        if (err) {
            if (err._databaseError) {
                res.status(500).send(err.message);
            } else {
                res.status(400).send(err.message);
            }
        } else {
            res.status(422).send("There has been an unknown error.");
        }
    }

    sendOk(res, object, status = 200){
        res.status(status).json(object);
    }

    urlBuilder(req) {
        const protocol = req.protocol + "://";
        const host = req.get('host');
        const path = req.originalUrl;

        return protocol + host + path;
    }
}