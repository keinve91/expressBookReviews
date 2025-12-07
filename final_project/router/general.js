
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


// Register New User
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    
    const doesExist = users.some((user) => user.username === username);

    if (doesExist) {
      return res.status(404).json({message: "El usuario ya existe!"});
    } else {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "Usuario registrado exitosamente. Ahora puedes iniciar sesión."});
    }
  }
  
  return res.status(404).json({message: "Error al registrar: Verifica usuario y contraseña."});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  if (books[isbn]) {
      return res.status(200).json(books[isbn]);
  } else {
      return res.status(404).json({message: "Libro no encontrado"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  
  const bookKeys = Object.keys(books);
  
  const booksByAuthor = [];

  bookKeys.forEach(key => {
    if (books[key].author === author) {
      booksByAuthor.push(books[key]);
    }
  });

  if (booksByAuthor.length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({message: "Autor no encontrado"});
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  
  const bookKeys = Object.keys(books);
  
  const booksByTitle = [];

  bookKeys.forEach(key => {
    if (books[key].title === title) {
      booksByTitle.push(books[key]);
    }
  });

  if (booksByTitle.length > 0) {
    return res.status(200).json(booksByTitle);
  } else {
    return res.status(404).json({message: "Título no encontrado"});
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  if (books[isbn]) {
      return res.status(200).json(books[isbn].reviews);
  } else {
      return res.status(404).json({message: "Libro no encontrado"});
  }
});
const getBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
const getBookByISBN = (isbn) => {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error al buscar el ISBN:", error);
        });
}
getBookByISBN(1);
module.exports.general = public_users;

