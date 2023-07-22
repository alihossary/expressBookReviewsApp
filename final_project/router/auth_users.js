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
    let reviewText = req.body.reviews;
    let sessionuserName= req.session.authorization.username;
    if(reviewText){
      console.log(sessionuserName)
      console.log("book.reviews",book.reviews)
      let existinReviews = book.reviews
      const userRevExistIndex = existinReviews.findIndex(element =>element.username === sessionuserName)
      console.log("user review exist log",userRevExistIndex)
      
      
      if (userRevExistIndex != -1)
      { console.log("user reviewd before, lets update the review") 
         existinReviews[userRevExistIndex].review = reviewText}
      else{
        console.log("user reviewed for first time on this book") 
        let newReview = {username:sessionuserName, review:reviewText}
        existinReviews.push(newReview)
        console.log(existinReviews)

      }
      //book.review.filter((r)=>{r.username===username? r.reviews= review : book.reviews.push({"review" :review, " username: ":req.session.authorization.username})})
       ;
      //books["reviews"]=reviewsArray;
    
    }
    //books[isbn] = book;
    res.status(200).send(`book with the ISBN  ${isbn}  review has been updated.`)
  }
 // return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let book = books[isbn]
  if(book){
  let existinReviews = book.reviews
  let sessionuserName =  req.session.authorization.username;
  const userRevExistIndex = existinReviews.findIndex(element =>element.username === sessionuserName)
  console.log("user review exist log",userRevExistIndex)
  if (userRevExistIndex != -1)
      { console.log("user review found, lets delete the review")
      
      existinReviews.splice(userRevExistIndex,1)
      book.reviews = existinReviews
      
      }

      res.status(200).send(`book with the ISBN  ${isbn}, all reviews from user ${sessionuserName} has been deleted.`)
      console.log("this log to make sure if review has been deleted !",book.reviews)
    }

  }


)

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
