import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Book from "../book/book.js";
import "./bookList.css";

function BookList(props) {
  const [newListName, setNewListName] = useState("");
  // prop.bookList
  //propd.allBookLists

  const moveBook = (currentList, targetList, book) => {
    console.log(currentList + targetList + book);

    // 1.remove book from current list array
    let currentListArray = JSON.parse(localStorage.getItem(currentList));
    currentListArray = currentListArray.filter((item) => {
      return item.id == book.id ? false : true;
    });
    localStorage.setItem(currentList, JSON.stringify(currentListArray));

    //2. get target list array turn to js object push book convert string update local storage
    let targetListArray = JSON.parse(localStorage.getItem(targetList));
    targetListArray = targetListArray ? targetListArray : [];
    targetListArray.push(book);
    localStorage.setItem(targetList, JSON.stringify(targetListArray));
    props.onListChange();
  };
  const deleteBook = (bookArrayKey, book) => {
    //update list in local storage
    let arrayFromStorage = localStorage.getItem(bookArrayKey);
    arrayFromStorage = JSON.parse(arrayFromStorage);

    arrayFromStorage = arrayFromStorage.filter((item) => {
      return item.id === book.id ? false : true;
    });

    localStorage.setItem(bookArrayKey, JSON.stringify(arrayFromStorage));

    props.onListChange();
  };

  return (
    <div className="book-List">
      {
        <div>
          <div>
            <h1>{props.bookList.title}</h1>
            {/* <CreateIcon /> */}
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
