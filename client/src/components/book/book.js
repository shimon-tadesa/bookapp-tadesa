import React from "react";
import "./book.css";

function Book(props) {
  const book = props.bookData;

  return (
    <div className="book">
      <img src={book.coverImageUrl} alt="someimg" />
      <ul className="book-details">
        <li>name:{book.title}</li>
        <li>Year: {book.first_publish_year}</li>
        <li>Author: {book.author_name}</li>
      </ul>
      {props.children}
    </div>
  );
}

export default Book;
