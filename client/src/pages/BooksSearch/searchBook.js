import React, { useState, useEffect } from "react";
import apiData from "../../BooksApi/index";
import "./searchBook.css";
import Book from "../../components/book/book";

export const BooksSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [collectionNames, setCollectionNames] = useState([]);

  useEffect(() => {
    // get collection list from storage
    let colNames = localStorage.getItem("collectionNames");
    colNames = JSON.parse(colNames);
    colNames = colNames ? colNames : [];
    setCollectionNames(colNames);
  }, []);

  // get value from input search
  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // get books by searchTerms
  async function search(e) {
    e.preventDefault();
    try {
      const response = await apiData.searchBooks(searchTerm);
      let data = response.data.docs;
      // clean and format data and return data with pic
      data = data.filter((item) => {
        return item.cover_i ? true : false;
      });

      data.forEach((item, index) => {
        item.coverImageUrl = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;
        item.id = new Date() + index;
      });

      setBooks(data);
    } catch (error) {
      console.log("error");
    }
    console.log(books);
  }

  // save book to collection
  const addBookToList = (bookObj, listType) => {
    console.log(bookObj.title);
    // creat memory storage
    let bookStorage = window.localStorage;
    //  get array book from local storage
    let bookArray = bookStorage.getItem(listType);

    //if empty set empty array oterwise convert to js object
    if (bookArray) {
      bookArray = JSON.parse(bookArray);
    } else {
      bookArray = [];
    }

    bookArray.push(bookObj);

    //convert array to string and save to local storage
    bookStorage.setItem(listType, JSON.stringify(bookArray));
  };

  const allBookLists = collectionNames.map((title) => {
    return { title };
  });

  return (
    <div className="search-page">
      <section>
        <h1>Search books</h1>
        <form action="" onSubmit={search} id="input-boxx">
          <input type="text" onChange={onSearchTermChange} id="input-feld" />
        </form>
      </section>
      <div className="results">
        {books.map((book, index) => (
          <Book
            key={index}
            bookData={book}
            onAddBook={addBookToList}
            allBookLists={allBookLists}
          />
        ))}
      </div>
    </div>
  );
};
