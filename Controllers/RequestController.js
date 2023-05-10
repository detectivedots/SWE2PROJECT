const dbController = require("./DatabaseController");
const Request = require("../Models/Request");

class RequestController {
    constructor() {
        if (RequestController.instance) {
            return RequestController.instance;
        }
        this.dbc = new dbController();
    }

    createRequest(user, book) {
        // Get next id from database
        const nxtId = this.dbc.getNextId("requests");

        // Create new Request object
        const request = new Request(nxtId, user.id, book.id, "pending");

        // Save request to database
        this.saveToDatabase(request);

        return request;
    }

    approveRequest(req) {
        req.status = "approved";
        this.updateRequest(req);
    }

    declineRequest(req) {
        req.status = "declined";
        this.updateRequest(req);
    }

    saveToDatabase(request) {
        // Save request to database
        this.dbc.save("requests", request);
    }

    updateRequest(request) {
        // Update request in the database
        this.dbc.update("requests", request);
    }

    deleteRequest(request) {
        // Delete the request from the database
        this.dbc.delete("requests", request);
    }

    findRequest(searchterm) {
        // Search for the request in the database
        const requests = this.dbc.findAll("requests", (request) => {
            return (
                request.user_id.includes(searchterm) ||
                request.book_id.includes(searchterm)
            );
        });

        return requests;
    }

    getAllRequests() {
        // Return an array of requests containing all the requests in the database
        const requests = this.dbc.findAll("requests");
        return requests;
    }

    retrieveFromDatabase(request_id) {
        // Get request from database by id
        const request = this.dbc.findById("requests", request_id);
        return request;
    }
}

const instance = new RequestController();
Object.freeze(instance);
module.exports = instance;
