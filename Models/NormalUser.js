import User from './User.js';

export default class NormalUser extends User {
    constructor(id, name, email, password, phone, approved, borrowLimit) {
        super(id, name, email, password, phone);
        this.approved = approved;
        this.borrowLimit = borrowLimit;
    }

    makeRequest(book) {

        if (this.#canMakeRequests()) {
            throw new Error("Not Implemented");
            // TODO: call request controller to request a book
        } else {
            console.log("You have reached your borrowing limit");
        }

    }

    #canMakeRequests() {
        // TODO: Get number of borrowed books
        let borrowedBooks = 0;
        throw new Error("Not Implemented");
        return this.borrowLimit > borrowedBooks;

    }

    returnBook(book) {
        throw new Error("Not Implemented");
        // TODO: Call books controller
    }
}