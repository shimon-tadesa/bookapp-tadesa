import React, { useState, useEffect } from "react";
import apiData from "../../BooksApi/index";
import "./searchBook.css";
import Book from "../../components/book/book";
import tools from "./../../route/tools";
import Pagination from "react-js-pagination";
export const BooksSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [collectionNames, setCollectionNames] = useState([]);

  const [activePage, setActivetPage] = useState(1); // page 
  const [booksCount, setBookCount] = useState(0); // data length
  const bucketSize = 20; // page books size

  useEffect(() => {
    let colNames = tools.readFromLocalStorage("collectionNames");
    colNames = colNames ? colNames : [];
    setCollectionNames(colNames);
  }, []);

  const onSearchTermChange = (e) => {// input value
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => { // update and change the page 
    console.log(`active page is ${pageNumber}`);
    setActivetPage(pageNumber);

    searchBook(searchTerm, pageNumber); //call this function and get new data when page changes
  };

  const clearFiled = () => {
    document.getElementById("input-feld").value = "";
  };

  async function searchBook(searchTerm, page) {
    try {
      const data = await apiData.searchBooks(searchTerm, page);
      console.log(data);
      setBooks(data.books);
      setBookCount(data.numOfBooks);
    } catch (error) {
      console.log("error");
    }
    console.log(books);
  }

  async function search(e) {// get books from api 
    e.preventDefault();
    searchBook(searchTerm, 1); // first time 
  }

  const addBookToList = (bookObj, listName) => {
    let bookArray = tools.readFromLocalStorage(listName);
    if (!bookArray) {
      bookArray = [];
    }

    if (bookArray) {
      console.log(bookArray);
      let isBookExist = bookArray.find((theBook) => theBook.id === bookObj.id);
      if (isBookExist) {
        alert("book is already exist");
      } else {
        bookArray.push(bookObj);
      }
    }

    tools.setToLocalStorage(listName, bookArray);
  };

  const allCollectionNames = collectionNames.map((title) => {
    return { title };
  });

  return (
    <div className="search-page">
      <section>
        <h1>Search Your Book</h1>
        <div id="input-boxx">
          <input
            type="text"
            onChange={onSearchTermChange}
            id="input-feld"
            onFocus={clearFiled}
          />
          <button id="search-button" onClick={search}>Search</button>
        </div>
      </section>
      <div className="results">
        {books.map((book, index) => (
          <Book
            key={index}
            bookData={book}
            onAddBook={addBookToList}
            allBookLists={allCollectionNames}
          />
        ))}
      </div>

      {books.length > 0 && (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={bucketSize}
          totalItemsCount={booksCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};
