import axios from "axios";

const searchBooks = async (searchTerm = "", page = 1) => {
  const response = await axios.get(
    `http://openlibrary.org/search.json?q=${searchTerm}&page=${page}&limit=20`
  );

  const data = response.data;
  const totalDocs = data.numFound;

  let books = data.docs;

  books.forEach((item, index) => {
    item.coverImageUrl = item.cover_i
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
      : "https://www.westernheights.k12.ok.us/wp-content/uploads/2020/01/No-Photo-Available.jpg";
    item.id = new Date() + index;
  });

  let temp = {
    books: books,
    numOfBooks: totalDocs,
  };
  return temp;
};

export default {
  searchBooks,
};
