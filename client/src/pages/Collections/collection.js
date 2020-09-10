import React, { useState, useEffect } from "react";

function Collections() {
  const [collectionName, setCollctionName] = useState("");

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
        item.list= arrayFromStorage;
      }
    });
    setUserCollections(tempUserCollection);

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

      {userCollections.map((item) => {
        return (
          <div class="collection-container">
            <div>
              <h1>{item.title}</h1>
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
