import DatabaseController from "./DatabaseController.js";
import Book from "../Models/Book.js";

class BookController {
    constructor() {
        if (BookController.instance){
            return BookController.instance;
        }
        this.dbc = new DatabaseController();
    }

    async createBook(title, author, subject, isbn, photo, rack_number, copies){
        // Get next id from database
        const result = await this.dbc.executeSQL("SELECT MAX(id) FROM books");
        const nxtId = result[0].max_id + 1;

        // Create book object
        const book = new Book(nxtId, title, author, subject, isbn, rack_number, copies, photo);

        // Save Book to database
        await this.saveToDatabase(book);

        return book;
    }

    async updateBook(book){
        // Update book in the database to match the argument
        const query = `UPDATE books SET
        title='${book.title}',
        author='${book.author}',
        subject='${book.subject}',
        isbn='${book.isbn}',
        photo='${book.photo}',
        rack_number='${book.rack_number}',
        copies='${book.copies}'
        WHERE id=${book.id}`;
        await this.dbc.executeSQL(query);
    }

    async deleteBook(book){
        // Delete the book from the database
        const query = `DELETE FROM books WHERE id=${book.id}`;
        await this.dbc.save(query);
    }

    async findBook(searchterm){
        // Search for the book in the database
        const query = `SELECT * FROM books WHERE title LIKE '%${searchterm}%' OR author LIKE '%${searchterm}%' OR subject LIKE '%${searchterm}%'`;
        const result = await this.dbc.get(query);

        const books = [];
        for (let row of result){
            const book = new Book(row.id, row.title, row.author, row.subject, row.isbn, row.rack_number, row.copies, row.photo);
            books.push(book);
        }
        return books;
    }

    async getAllBooks(){
        // Return an array of books containing all the books in the database
        const query = 'SELECT * FROM books';
        const result = await this.dbc.get(query);

        const books = [];
        for (let row of result){
            const book = new Book(row.id, row.title, row.author, row.subject, row.isbn, row.rack_number, row.copies, row.photo);
            books.push(book);
        }
        return books;
    }

    async saveToDatabase(book){
        // Save book in database
        const query = `INSERT INTO books (id, title, author, subject, isbn, photo, rack_number, copies)
        VALUES (${book.id}, '${book.title}', '${book.author}', '${book.subject}', '${book.isbn}', '${book.photo}', '${book.rack_number}', '${book.copies}')`;
        await this.dbc.save(query);
    }

    async retrieveFromDatabase(book_id){
        // Get book from database by id
        const query = `SELECT * FROM books WHERE id=${book_id}`;
        const result = await this.dbc.get(query);

        if (result.length === 0){
            return null;
        }
        const row = result[0];
        const book = new Book(row.id, row.title, row.author, row.subject, row.isbn, row.rack_number, row.copies, row.photo);
        return book;
    }
}

const instance = new BookController();
Object.freeze(instance);
export default BookController;
