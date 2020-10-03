import React from "react";
import "./book.css";

function Book(props) {
  const book = props.bookData;
  // props.editMode

  function showHideDropDown(event) {
    let el = event.target.parentElement.parentElement.querySelector(
      ".myDropdown"
    );
    el.classList.toggle("show");
  }
  ///_____

  return (
    <div className="book">
      <img src={book.coverImageUrl} alt="someimg" />
      <ul id="book-ditel">
        <li>name:{book.title}</li>
        <li>Year: {book.first_publish_year}</li>
        <li>Author: {book.author_name}</li>
      </ul>

      {props.editMode ? (
        <div>
          <button
            onClick={() => props.onBookDelete(props.bookList.title, book)}
          >
            Delete Book
          </button>
          <button onClick={(event) => showHideDropDown(event)} className="">
            move book
          </button>
          <div className="myDropdown dropdown-content">
            {props.allBookLists.map((listBooksArray, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    props.onBookMove(
                      props.bookList.title,
                      listBooksArray.title,
                      book
                    );
                    showHideDropDown(e);
                  }}
                >
                  {listBooksArray.title}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // handle adding book to a list home search
        <div className="dropdown">
          <button
            onClick={(event) => showHideDropDown(event)}
            className="dropbtn"
          >
            add book
          </button>
          <div className=" myDropdown dropdown-content">
            {props.allBookLists.map((listBooksArray, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    props.onAddBook(book, listBooksArray.title);
                    showHideDropDown(e);
                  }}
                >
                  {listBooksArray.title}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Book;
