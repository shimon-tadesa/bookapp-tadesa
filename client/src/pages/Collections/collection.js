import React, { useState, useEffect } from "react";

function Collections() {
  const [collectionName, setCollctionName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");

  const [userCollections, setUserCollections] = useState([]);

  function init() {
    let collectionNames = JSON.parse(localStorage.getItem("collectionNames"));

    let userCollections = [];

    for (let name of collectionNames) {
      try {
        let bookArry = JSON.parse(localStorage.getItem(name));
        userCollections.push({
          title: name,
          list: bookArry ? bookArry : [],
        });
      } catch (e) {
        console.log("list not defiend");
      }
    }
    setUserCollections(userCollections);
  }
  useEffect(() => {
    init();
  }, []);

  const deleteBook = (bookObj, bookArrayKey) => {
    console.log(bookObj.id);

    //update list in local storage
    let arrayFromStorage = localStorage.getItem(bookArrayKey);
    arrayFromStorage = JSON.parse(arrayFromStorage);

    arrayFromStorage = arrayFromStorage.filter((item) => {
      return item.id === bookObj.id ? false : true;
    });

    localStorage.setItem(bookArrayKey, JSON.stringify(arrayFromStorage));

    //    update state on ui to avoid screen refresh
    let tempUserCollection = [...userCollections];
    tempUserCollection.forEach((item) => {
      if (item.title === bookArrayKey) {
        item.list = arrayFromStorage;
      }
    });
    setUserCollections(tempUserCollection);
    // init();
    console.log(arrayFromStorage);
  };

  const createCollection = () => {
    console.log("click to create");
    let collectionsArray = JSON.parse(localStorage.getItem("collectionNames"));
    collectionsArray.push(collectionName);
    localStorage.setItem("collectionNames", JSON.stringify(collectionsArray));
    // reset input field
    setCollctionName("");
    init();
  };

  const deleteCollection = (bookKey) => {
    //1. remove list name from collectionNames in local storage
    let allCollection = JSON.parse(localStorage.getItem("collectionNames"));
    let index = allCollection.indexOf(bookKey);
    allCollection.splice(index, 1);
    let a = JSON.stringify(allCollection);
    localStorage.setItem("collectionNames", a);

    // 2. remove list array from local storage
    let dCollection = localStorage.removeItem(bookKey);

    init();
    console.log(dCollection);
  };

  const renameCollection = (bookKey) => {
    //1. update collection names
    let allCollection = JSON.parse(localStorage.getItem("collectionNames"));
    let arrIndex = allCollection.indexOf(bookKey);
    allCollection.splice(arrIndex, 1);
    allCollection.push(newCollectionName);
    let ncollectionNames = JSON.stringify(allCollection);
    localStorage.setItem("collectionNames", ncollectionNames);

    // create new array and remove old one
    let bookArrayString = localStorage.getItem(bookKey);
    localStorage.removeItem(bookKey);
    localStorage.setItem(newCollectionName, bookArrayString);

    init();
    setNewCollectionName("");
  };

  function showHideDropDown(event) {
    let el = event.target.parentElement.querySelector(".myDropdown");
    el.classList.toggle("show");
  }
  const onBookMove = (currentList, targetList, book) => {
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
    init();
  };

  return (
    <section>
      <button onClick={createCollection}>Create Collction</button>

      <input
        value={collectionName}
        type="text"
        onChange={(event) => {
          setCollctionName(event.target.value);
        }}
      />

      {userCollections.map((item, index) => {
        return (
          <div className="collection-container" key={index}>
            <div>
              <h1>{item.title}</h1>
              <button onClick={() => renameCollection(item.title)}>
                Rename
              </button>
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
              <button onClick={() => deleteCollection(item.title)}>
                delete list
              </button>
            </div>
            <div className="listNames">
              {item.list.map((book, index) => {
                return (
                  <div className="libraryBooks" key={index}>
                    <img src={book.coverImageUrl} alt="someimg" />
                    <p>
                      {book.title} {book.first_publish_year}
                    </p>
                    <button onClick={() => deleteBook(book, item.title)}>
                      Delete Book
                    </button>
                    <button
                      onClick={(event) => showHideDropDown(event)}
                      className=""
                    >
                      move book
                    </button>
                    <div className="myDropdown dropdown-content">
                      {userCollections.map((listObj, index) => {
                        return (
                          <div
                            key={index}
                            onClick={(e) =>
                              onBookMove(item.title, listObj.title, book)
                            }
                          >
                            {listObj.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Collections;
