import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Book from "../book/book.js";
import "./bookList.css";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SmenuButton from "./../../components/SMenuButton/SMenuButton";

function BookList(props) {
  const [newListName, setNewListName] = useState("");
  const collectionNames = props.allBookLists.map((item) => item.title);
  return (
    <div className="book-List">
      {
        <div>
          <div>
            <h1>{props.bookList.title}</h1>
            <Button
              color="primary"
              onClick={() =>
                props.onListRename(props.bookList.title, newListName)
              }
            >
              Rename
            </Button>
            <Input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => props.onListDelete(props.bookList.title)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className="book-list">
            {props.bookList.list.map((book, index) => {
              return (
                <Book key={index} bookData={book}>
                  <div className="btn-group">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        props.onBookDelete(props.bookList.title, book)
                      }
                    >
                      Delete Book
                    </Button>
                    <SmenuButton
                      options={collectionNames}
                      onMenuSelect={(selected) => {
                        props.onMoveBook(props.bookList.title, selected, book);
                      }}
                    >
                      move book
                    </SmenuButton>
                  </div>
                </Book>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
}

export default BookList;