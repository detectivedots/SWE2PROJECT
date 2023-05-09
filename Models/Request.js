export default class Request{
    constructor(id, user, book, returnDate) {
        this.id = id;
        this.user = user;
        this.book = book;
        this.requestDate = new Date();
        this.returnDate = returnDate;
        this.approved = false;
    }
}