

/* Users table */
CREATE TABLE users (
   id INT AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone VARCHAR(20) NOT NULL,
   status ENUM('active', 'inactive') NOT NULL,
   type ENUM('librarian', 'normal') NOT NULL,
   PRIMARY KEY (id),
   UNIQUE KEY (email)
);

/* Books table */
CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  isbn VARCHAR(13) NOT NULL UNIQUE,
  photo VARCHAR(255),
  rack_number VARCHAR(10) NOT NULL,
  copies INT NOT NULL
);

/* Borrow requests table */
CREATE TABLE borrow_requests (
   id INT AUTO_INCREMENT,
   user_id INT NOT NULL,
   book_id INT NOT NULL,
   request_date DATE NOT NULL,
   due_date DATE NOT NULL,
   status ENUM('pending', 'approved', 'rejected', 'returned') NOT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE sessions (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  login_time DATETIME NOT NULL,
  last_activity DATETIME NOT NULL,
  session_expiration DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
