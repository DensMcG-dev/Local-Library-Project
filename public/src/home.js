const partitionBooksByBorrowedStatus = require("./books.js").partitionBooksByBorrowedStatus;
//imports function from books.js

function getElementCount(array) {
  return array.length;
}//helper function for number of elements in array

function getTotalBooksCount(books) {
  return getElementCount(books);
}//uses helper function

function getTotalAccountsCount(accounts) {
  return getElementCount(accounts);
}//uses helper function

function getBooksBorrowedCount(books) {
  let array = partitionBooksByBorrowedStatus(books);
  return array[0].length;
}//uses imported partition function to get array including books borrowed, then extracts length
//as number of elements in array of borrowed books

function getMostCommonGenres(books) {
  const genreCount = books.reduce((genres, book) => {
    if (book.genre in genres) {
      genres[book.genre] += 1;
    }
    else {genres[book.genre] = 1};
    return genres;
  }, {});

  const popularGenres = Object.keys(genreCount).map((key) => ({name: key, count: genreCount[key]}));
  popularGenres.sort((book1, book2) => book1.count > book2.count ? -1:1 );
  return popularGenres.slice(0, 5);

}

function getMostPopularBooks(books) {
  const mapsBooksToNameAndCount = books.map((book) => ({name: book.title, count: book.borrows.length}));
  mapsBooksToNameAndCount.sort((nameAndCount1, nameAndCount2) => nameAndCount1.count > nameAndCount2.count ? -1:1);
  return mapsBooksToNameAndCount.slice(0, 5);
}

function _sortObjectByValues(object) {
  const keys = Object.keys(object);
  return keys.sort((keyA, keyB) => {
    if(object[keyA] > object[keyB]) {
      return -1;
    } else if(object[keyB] > object[keyB]){
      return 1;
    }
    else{
      return 0;
    }
  });
};//helper function

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if(acc[authorId]){
      acc[authorId].push(borrows.length);
    } else{
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});

  for(let id in count){
    const sum = count[id].reduce((acc, idCount) => acc + idCount);
    count[id] = sum;
  }

  const sorted = _sortObjectByValues(count);
  let array = sorted.map((authorId) => {
    const {name: {first, last}} = authors.find(({id}) => id === Number(authorId));
    let name = `${first} ${last}`;
    return {name, count:count[authorId]};
  }).slice(0,5);
  return array;
}//uses for in lopp and destructuring



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
