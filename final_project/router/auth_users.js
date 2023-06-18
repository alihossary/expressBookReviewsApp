const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}


//only registered users can login
regd_users.post("/login", (req,res) => {


  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  if (!username || !password) {
    console.log("problem in retriev user name and password from body")
      return res.status(404).json({message: "Error logging in"});
  }
 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  };console.log(req.session.authorization)  ;
  return res.status(200).send("User successfully logged in");
      
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }

});

// Add a book review
//reviewsArray = [];
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let book = books[isbn]
  if(book){
    let review = req.body.reviews;
    let sessionuser= req.session.authorization.username;
    if(review){
      console.log(sessionuser)
      console.log("book.reviews",book.reviews)
      const userRevExist = book.reviews.find(element =>element.username === sessionuser)
      console.log("user review exist log",userRevExist)
      console.log("books reviews user names",book.reviews.sessionuser)
      
      if (userRevExist)
      { console.log("user reviewd before") 
         userRevExist.review = review}
      else{
        console.log("user reviewed for first time on this book") 
        book.reviews.push({sessionuser,review })

      }
      //book.review.filter((r)=>{r.username===username? r.reviews= review : book.reviews.push({"review" :review, " username: ":req.session.authorization.username})})
       ;
      //books["reviews"]=reviewsArray;
    
    }
    books[isbn] = book;
    res.status(200).send(`book with the ISBN  ${isbn}  review has been updated.`)
  }
 // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
