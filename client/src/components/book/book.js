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

  return (
    <div className="book">
      <img src={book.coverImageUrl} alt="someimg" />
      <p>
        {book.title} {book.first_publish_year}
      </p>

      {/* handle delete and handle book move to another list */}
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
            {props.allBookLists.map((listObj, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    props.onBookMove(props.bookList.title, listObj.title, book);
                    showHideDropDown(e);
                  }}
                >
                  {listObj.title}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // handle adding book to a list
        <div className="dropdown">
          <button
            onClick={(event) => showHideDropDown(event)}
            className="dropbtn"
          >
            add book
          </button>
          <div className=" myDropdown dropdown-content">
            {props.allBookLists.map((listObj, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    props.onAddBook(book, listObj.title);
                    showHideDropDown(e);
                  }}
                >
                  {listObj.title}
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
