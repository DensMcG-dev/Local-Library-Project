const findAccountById = require('./accounts.js').findAccountById;//imported function from accounts.js

function idSearch(array, idNumber) {
  return array.find((element) => element.id === idNumber);
}//helper function for finding specific element in array given an ID number

function findAuthorById(authors, id) {
  return idSearch(authors, id);
}

function findBookById(books, id) {
  return idSearch(books, id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedArray = [];
  let returnedArray = [];
  for(let book of books) {
    if(book.borrows[0].returned) {
      returnedArray.push(book);
    }
    else  {
      borrowedArray.push(book);
    }
  }
  let finalArray = [borrowedArray, returnedArray];
  return finalArray;
}

function getBorrowersForBook(book, accounts) {
  let cappedBorrows = book.borrows.slice(0, 10);
  let combinedBorrows = [];
  // for (let borrow of cappedBorrows) {
  //   const account = findAccountById(accounts, borrow.id);
  //     const combined = {
  //       ...borrow,
  //       ...account,
  //     }
  //     combinedBorrows.push(combined);
  //   };
  //   return combinedBorrows;
  combinedBorrows = cappedBorrows.map((borrow) => {
    let account = findAccountById(accounts, borrow.id);
    let combined = {
      ...borrow,
      ...account,
    };
    return combined;
  });
  return combinedBorrows;

  };




module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
