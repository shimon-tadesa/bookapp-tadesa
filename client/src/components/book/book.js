import React from "react";
import "./book.css";
import Checkbox from "@material-ui/core/Checkbox";

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
      <form>
        <Checkbox
          color="primary"
          name="vehicle1"
          onChange={props.selectFew}
          value={"books"}
        />
      </form>

      {props.children}
    </div>
  );
}

export default Book;
