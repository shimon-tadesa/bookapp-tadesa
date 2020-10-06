
import axios from "axios";

const searchBooks = async (searchTerm = "", author, page = 1) => {
 
  const params = {
    page: page,
  };

  if (author) {
    params.title = searchTerm;
    params.author = author;
  } else {
    params.q = searchTerm;
  }

  const response = await axios.get(`http://openlibrary.org/search.json`, {
   params: params
  });

  const data = response.data;
  const totalDocs = data.numFound;

  let books = data.docs;

  books.forEach((item, index) => {
    if (item.cover_i) {
      item.coverImageUrl = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;
      item.id = item.cover_i;
    } else {
      item.coverImageUrl =
        "https://www.westernheights.k12.ok.us/wp-content/uploads/2020/01/No-Photo-Available.jpg";
      //TODO use uuid lib insted
      item.id = new Date() + index;
    }
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

