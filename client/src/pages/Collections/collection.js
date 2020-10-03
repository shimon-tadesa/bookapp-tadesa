import React, { useState, useEffect } from "react";
import BookList from "../../components/bookList/bookList";
import tools from "./../../route/tools";

function Collections() {
  const [collectionName, setCollctionName] = useState("");
  const [userCollections, setUserCollections] = useState([]);

  function init() {
    let collectionNames = tools.readFromLocalStorage("collectionNames");

    let userCollections = [];

    for (let name of collectionNames) {
      try {
        let bookArry = tools.readFromLocalStorage(name);
        userCollections.push({
          title: name,
          list: bookArry ? bookArry  : [],
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

  const createCollection = () => {
    console.log("click to create");
    let collectionsArray = tools.readFromLocalStorage("collectionNames");
    collectionsArray.push(collectionName);
    tools.setToLocalStorage("collectionNames", collectionsArray);
    // tools.setToLocalStorage(collectionName, "[]");
    setCollctionName("");
    init();
  };

  const deleteCollection = (listName) => {
    //1. remove list name from collectionNames in local storage
    let allCollection = tools.readFromLocalStorage("collectionNames");
    let index = allCollection.indexOf(listName);
    allCollection.splice(index, 1);
    console.log(allCollection);
    tools.setToLocalStorage("collectionNames", allCollection);

    // 2. remove list array from local storage
    tools.removeFromLocalStorage(listName);

    init();
  };

  const renameCollection = (bookKey, newName) => {
    //1. update collection names
    let allCollection = tools.readFromLocalStorage("collectionNames");
    let arrIndex = allCollection.indexOf(bookKey);
    allCollection.splice(arrIndex, 1);
    allCollection.push(newName);
    tools.setToLocalStorage("collectionNames", allCollection);

    // create new array and remove old one
    let bookArrayObj =tools.readFromLocalStorage(bookKey);
    tools.removeFromLocalStorage(bookKey);
    tools.setToLocalStorage(newName,bookArrayObj);

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
            <BookList
              bookList={item}
              allBookLists={userCollections}
              onListRename={renameCollection}
              onListDelete={deleteCollection}
              onListChange={init}
            />
          </div>
        );
      })}
    </section>
  );
}

export default Collections;
