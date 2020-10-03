import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Book from "../book/book.js";
import "./bookList.css";
import tools from "./../../route/tools";

function BookList(props) {
  const [newListName, setNewListName] = useState("");

 

  const moveBook = (currentList, targetList, book) => {
    console.log(currentList + targetList + book);

    // 1.remove book from current list array
    let currentListArray = tools.readFromLocalStorage(currentList);
    currentListArray = currentListArray.filter((item) => {
      return item.id === book.id ? false : true;
    });
    
    tools.setToLocalStorage(currentList,currentListArray);

    //2. get target list array turn to js object push book convert string update local storage
    let targetListArray = tools.readFromLocalStorage(targetList);
    targetListArray = targetListArray ? targetListArray : [];
    targetListArray.push(book);
    tools.setToLocalStorage(targetList,targetListArray);
    props.onListChange();
  };
  const deleteBook = (bookArrayKey, book) => {
    //update list in local storage
    let arrayFromStorage = tools.readFromLocalStorage(bookArrayKey);
    arrayFromStorage = arrayFromStorage.filter((item) => {
      return item.id === book.id ? false : true;
    });

   tools.setToLocalStorage(bookArrayKey,arrayFromStorage);
    props.onListChange();
  };

  return (
    <div className="book-List">
      {
        <div>
          <div>
            <h1>{props.bookList.title}</h1>
            <button
              onClick={() =>
                props.onListRename(props.bookList.title, newListName)
              }
            >
              Rename
            </button>
            <input
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
                <Book
                  key={index}
                  bookData={book}
                  onBookDelete={deleteBook}
                  onBookMove={moveBook}
                  bookList={props.bookList}
                  allBookLists={props.allBookLists}
                  editMode="true"
                />
              );
            })}
          </div>
        </div>
      }
    </div>
  );
}

export default BookList;
