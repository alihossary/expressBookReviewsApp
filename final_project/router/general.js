const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  let Fname = req.body.Fname
  let Lname = req.body.Lname
  
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password, "FirstName":Fname, "LastName":Lname});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
  
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
  const title = req.params.title;
  console.log("autor:", title);
  //Write your code here
  objBooks = Object.values(books)
  BooksKeys = Object.keys(books)
  console.log("obj books",objBooks)
  console.log("Books keys",BooksKeys)

  matched_books = [];
  

  BooksKeys.forEach(key => { if(books[key].title === title )
                                {let book = books[key]
                                  matched_books.push(book)
                                }
    
  });
  if (matched_books.length>0){
    res.status(200).json(matched_books)}
    else{res.status(404).json({error:"no books found with this title"})}


  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if(books[isbn]){
  console.log("the book :" , books[isbn])
  console.log("the book riview :" , books[isbn].reviews)
  res.json(books[isbn].reviews)}
  else{res.status(404).json({error:"no book with this isbn"})}
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
