import React, { useState, useEffect } from "react";

function Collections() {
  const [collectionName, setCollctionName] = useState("");

  const [userCollections, setUserCollections] = useState([]);

  useEffect(() => {
    let collectionNames = JSON.parse(localStorage.getItem("collectionNames"));

    let userCollections = [];

    for (let name of collectionNames) {
      try {
        let bookArry = JSON.parse(localStorage.getItem(name));
        userCollections.push({
          title: name,
          list: bookArry,
        });
      } catch (e) {
        console.log("list not defiend");
      }
    }
    setUserCollections(userCollections);

  }, []);

  const deleteBook = (bookObj, listType) => {
    console.log(bookObj.id);

    //update list in local storage
    let bookArrayKey = listType;
    let arrayFromStorage = localStorage.getItem(bookArrayKey);
    arrayFromStorage = JSON.parse(arrayFromStorage);

    arrayFromStorage = arrayFromStorage.filter((item) => {
      return item.id == bookObj.id ? false : true;
    });

    let a = JSON.stringify(arrayFromStorage);
    localStorage.setItem(bookArrayKey, a);

    //update state on ui to avoid screen refresh
    let tempUserCollection = [...userCollections];
    tempUserCollection.forEach((item) => {
      if (item.title == listType) {
        item.list = item.list.filter((item) => {
          return item.id == bookObj.id ? false : true;
        });
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
    setCollctionName("");
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
              <button>delete list</button>
            </div>
            <div>
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
