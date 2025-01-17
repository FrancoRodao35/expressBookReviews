const express = require('express');
let books = require("./booksdb.js");
let {isValid} = require("./auth_users.js");
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      console.log(users)
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."}); 
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({ books: books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  return res.status(200).json({books: books[isbn]});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  const booksres = []
  for (const i in books) {
    const book = books[i]
    if(author === book.author){
      booksres.push(book)
    }
  }

  return res.status(200).json({books: booksres});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  const booksres = []
  for (const i in books) {
    const book = books[i]
    if(title === book.title){
      booksres.push(book)
    }
  }

  return res.status(200).json({books: booksres});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  return res.status(200).json({books: books[isbn].review});});

module.exports.general = public_users;
