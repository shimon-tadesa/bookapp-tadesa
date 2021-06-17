import React, { useState } from "react";
import apiData from "./../../services/BooksApi";
import "./searchBook.css";
import Book from "../../components/book/book";
import Input from "@material-ui/core/Input";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import SmenuButton from "./../../components/SMenuButton/SMenuButton";


export const BooksSearch = (props) => {
  const dataStore = props.dataStore;
  const ontDataStoreChange = props.ontDataStoreChange;
  let arrayItems = [];

  const [searchTerm, setSearchTerm] = useState("");
  const [authorName, setAuthorName] = useState(null);
  const [books, setBooks] = useState([]);

  const [activePage, setActivetPage] = useState(1);
  const [booksCount, setBookCount] = useState(0);
  const bucketSize = 20;

  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onAuthorNameChange = (e) => {
    setAuthorName(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setActivetPage(value);
    console.log(`active page is ${value}`);
    searchBook(searchTerm, authorName, value);
    setSearchTerm("");
    document.documentElement.scrollTop = 0;
  };

  const clearFiled = () => {
    document.getElementById("input-feld").value = "";
  };

  async function searchBook(searchTerm, authorName, page) {
    try {
      setBooks([]);
      const data = await apiData.searchBooks(searchTerm, authorName, page);
      console.log(data);
      setBooks(data.books);
      setBookCount(data.numOfBooks);
    } catch (error) {
      console.log("error");
    }
    console.log(books);
  }

  async function search(e) {
    searchBook(searchTerm, authorName, 1);
  }

  const addBookToList = (book, listName) => {
    if(arrayItems.length > 0){
      arrayItems.forEach((book) => {
        return book;
      });
      let bookArray = dataStore[listName];
      console.log(bookArray);
      let isBookExist = bookArray.find((theBook) => theBook.id === book.id);
      if (isBookExist) {
        alert("book is already exist");
      } else {
        bookArray.push(book);
      }
      ontDataStoreChange(dataStore);
    }
  };

  const onSelectFew = (item) => {
    console.log(`click on book`);
    if (item) {
      arrayItems.push(item);

      arrayItems.forEach((item) => {
        return item;
      });
    }
  };

  const collectionNames = dataStore.collectionNames.map((title) => {
    return title;
  });

  return (
    <div className="search-page">
        <h1 id="header">Book App</h1>
      <section className="input-button-container">
        <span id="inputSpace">
          <Input
            type="text"
            onChange={onSearchTermChange}
            id="input-feld"
            onFocus={clearFiled}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                search(e);
              }
            }}
            placeholder="Search Book"
          />
        </span>

        <Input
          type="text"
          placeholder="Author Name"
          onChange={onAuthorNameChange}
          id="auhor-input-feld"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              search(e);
            }
          }}
        />
        <Button variant="contained" id="search-button" onClick={search}>
          Search
        </Button>
      </section>

      <div className="results">
        {books.map((book, index) => (
          <Book key={index} bookData={book} selectFew={() => onSelectFew(book)}>
            <SmenuButton
              options={collectionNames}
              onMenuSelect={(selectedOption) => {
                addBookToList(book, selectedOption);
              }}
            >
              Add Book
            </SmenuButton>
          </Book>
        ))}
      </div>

      {books.length > 0 && (
        <Pagination
          page={activePage}
          count={Math.ceil(booksCount / bucketSize)}
          color="primary"
          onChange={handlePageChange}
          className="search-pagination"
        />
      )}
    </div>
  );
};
