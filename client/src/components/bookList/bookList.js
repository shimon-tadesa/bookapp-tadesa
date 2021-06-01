import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Book from "../book/book.js";
import "./bookList.css";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SmenuButton from "./../../components/SMenuButton/SMenuButton";
import BorderColorIcon from '@material-ui/icons/BorderColor';

function BookList(props) {
  const [newListName, setNewListName] = useState("");
  const collectionNames = props.allBookLists.map((item) => item.title);
  return (
    <div className="book-List">
      {
        <div>
          <div>
            <h1>{props.bookList.title}</h1>
            <BorderColorIcon
              color="primary"
              onClick={() =>
                props.onListRename(props.bookList.title, newListName)
              }
            >
              Rename
            </BorderColorIcon>
            <Input
              type="text"
              id="inputFiled"
              value={newListName}
              placeholder="Change Name"
              onChange={(e) => setNewListName(e.target.value)}
            />

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => props.onListDelete(props.bookList.title)}
            >
              <DeleteIcon  id="delete-button"/>
            </IconButton>
          </div>
          <div className="book-list">
            {props.bookList.list.map((book, index) => {
              return (
                <Book key={index} bookData={book}>
                  <div className="btn-group">
                    <Button
                    id="listButtonDelete"
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        props.onBookDelete(props.bookList.title, book)
                      }
                    >
                      Delete 
                    </Button>
                    <SmenuButton
                      options={collectionNames}
                      onMenuSelect={(selected) => {
                        props.onMoveBook(props.bookList.title, selected, book);
                      }}
                    >
                      Move 
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
