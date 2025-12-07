const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  // 1. Recuperamos el ISBN de los parámetros de la URL
  const isbn = req.params.isbn;
  
  // 2. Buscamos en nuestra base de datos local
  if (books[isbn]) {
      // Si existe, lo devolvemos
      return res.status(200).json(books[isbn]);
  } else {
      // Si no existe, devolvemos un error 404
      return res.status(404).json({message: "Libro no encontrado"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  
  // 1. Obtenemos todas las claves del objeto 'books' (1, 2, 3...)
  const bookKeys = Object.keys(books);
  
  const booksByAuthor = [];

  // 2. Iteramos a través de las claves y verificamos si el autor coincide
  bookKeys.forEach(key => {
    if (books[key].author === author) {
      booksByAuthor.push(books[key]);
    }
  });

  // 3. Devolvemos la lista de libros encontrados
  if (booksByAuthor.length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({message: "Autor no encontrado"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
