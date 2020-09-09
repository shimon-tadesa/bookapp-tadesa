import axios from "axios";
const getBookCoverByIsbn = (isbn, size = "M") => {
  return `http://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
};

const searchBooks = async (searchTerm = "") => {
  return await axios.get(`http://openlibrary.org/search.json?q=${searchTerm}&printType=books`);
  
};

export default {
  searchBooks,
  getBookCoverByIsbn,
};
