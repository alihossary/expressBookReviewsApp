const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  
  //Write your code here
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let book = JSON.stringify(books)

  return res.status(300).json({book});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
 let id = req.params.isbn;
 console.log("id:",id)
 console.log("books[id]:",books[id])
 if(books[id])
    res.status(300).json(books[id])
    else 
    res.status(404).json({error : "book does not exist!"})
  //let jbooks = JSON.parse(books);
 //console.log("books[id]",jbooks.id);
 //filtered_book =JSON.stringify( books.id);

 //objbooks = Object.values(books);
  //filtered_book =JSON.stringify(objbooks.filter((book)=>{book.id === id})) 
  //console.log(filtered_book)
  //res.json(filtered_book)
   //if(book){return res.status(300).json(book);}
   //else res.status(404).json({error : "book is not exist"})
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  console.log("autor:", author);
  //Write your code here
  objBooks = Object.values(books)
  BooksKeys = Object.keys(books)
  console.log("obj books",objBooks)
  console.log("Books keys",BooksKeys)

  matched_books = [];
  

  BooksKeys.forEach(key => { if(books[key].author === author )
                                {let book = books[key]
                                  matched_books.push(book)
                                }
    
  });
  if (matched_books.length>0){
    res.status(200).json(matched_books)}
    else{res.status(404).json({error:"no books found for this author"})}
  }
  //const matched_books = objBooks.filter(book => {book.author === author.toString()});
 // console.log("matched books", matched_books)
  

 // return res.status(300).json({message: "Yet to be implemented"});
);

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
