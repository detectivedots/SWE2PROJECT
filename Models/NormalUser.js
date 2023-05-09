import User from "./User";
import Book from "./Book";

class NormalUser extends User{
    constructor(id, name, email, password, phone, approved, borrowLimit) {
        super(id, name, email, password, phone);
        this.approved = approved;
        this.borrowLimit = borrowLimit;
    }
    makeRequest(book){

        if (this.canMakeRequests()){
            throw new Error("Not Implemented");
            // TODO: call request controller to request a book
        } else {
            console.log("You have reached your borrowing limit");
        }

    }
    canMakeRequests(){
        if (this.constructor === NormalUser){
            // TODO: Get number of borrowed books
            let borrowedBooks = 0;
            throw new Error("Not Implemented");
            return this.borrowLimit > borrowedBooks;
        } else {
            throw new Error("canMakeRequests is a private method");
        }
    }

    returnBook(book){
        throw new Error("Not Implemented");
        // TODO: Call books controller
    }
}