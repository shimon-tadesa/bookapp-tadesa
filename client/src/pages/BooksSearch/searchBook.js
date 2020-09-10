import React, { useState } from "react";
import apiData from "../../BooksApi/index";
import "./searchBook.css";


// get collection list from storage
let colNames = localStorage.getItem("collectionNames");
colNames = JSON.parse(colNames);

export const BooksSearch = () => {
  const [searchTerm, onChangeTerm] = useState("");
  const [books, setBooks] = useState([]);

  const [collectionNames, setCollectionNames] = useState(colNames);


  // get value from input search
  function handelChange(e) {
    let a = e.target.value;
    onChangeTerm(a);
    console.log(a);
  }
  // get books by searchTerms
  async function handelSubmit(e) {
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
  const saveBook = (bookObj, listType) => {
    console.log("click");
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

  function onListSelect(book, listName, event) {
    console.log("on add to list :" + listName);
    saveBook(book, listName);
    let el = event.target.parentElement;
    el.classList.toggle("show");
  }

  function myFunction(event) {
    let el = event.target.parentElement.querySelector("div");
    el.classList.toggle("show");
  }

  let arrayBooks = books.map((book, index) => (
    <div key={index} className="book-card">
      <img src={book.coverImageUrl} alt="some img" />
      <div className="dropdown">
        <button onClick={(event) => myFunction(event)} className="dropbtn">
          add book
        </button>
        <div className="myDropdown" className="dropdown-content">
          {collectionNames.map((listName, index) => {
            return (
              <div key={index} onClick={(e) => onListSelect(book, listName, e)}>
                {listName}
              </div>
            );
          })}
        </div>
      </div>

      <p>
        {book.title},{book.first_publish_year}
      </p>
    </div>
  ));
  return (
    <div className="search-page">
      <section>
        <h1>Search books</h1>
        <form action="" onSubmit={handelSubmit} id="input-boxx">
          <input type="text" onChange={handelChange} id="input-feld" />
        </form>
      </section>
      <div className="results">{arrayBooks}</div>
    </div>
  );
};
