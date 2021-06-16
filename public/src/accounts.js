function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}; //uses .find


function sortAccountsByLastName(accounts) {
  const tempAccounts = [...accounts];
  return tempAccounts.sort((name1,name2) => name1.name.last.toLowerCase() > name2.name.last.toLowerCase() ? 1:-1);
}//uses spread operator and .sort

function getBorrowedForAccount(accountId, borrows) {
  return borrows.filter((borrow) => borrow.id === accountId);
};//uses .filter

function getTotalNumberOfBorrows(account, books) {
  if(!account || !books || books.length === 0) {return 0};
  let totalBorrowCount = books.reduce((totalAcc, book) => {
  const borrows = book.borrows;
  const filteredBorrows = borrows.filter(
    (borrow) => borrow.id === account.id
  );
  totalAcc += filteredBorrows.length;
  return totalAcc;
  }, 0);
return totalBorrowCount;
};//uses .reduce and .filter

//arrow function structure used throughout

function getBooksPossessedByAccount(account, books, authors) {
  const filtered = books.filter((book) => book.borrows[0].returned === false && book.borrows[0].id === account.id);
  const combo = filtered.map((book) => {
    const authorValue = authors.find((author) => author.id === book.authorId);
    const combinedBook = {
...book, author: authorValue
    }
    return combinedBook;
  });
return combo;
};//uses .filter and .map

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
