import React, { useState, useEffect } from "react";
import BookList from "../../components/bookList/bookList";

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

  const renameCollection = (bookKey, newName) => {
    //1. update collection names
    let allCollection = JSON.parse(localStorage.getItem("collectionNames"));
    let arrIndex = allCollection.indexOf(bookKey);
    allCollection.splice(arrIndex, 1);
    allCollection.push(newName);
    let ncollectionNames = JSON.stringify(allCollection);
    localStorage.setItem("collectionNames", ncollectionNames);

    // create new array and remove old one
    let bookArrayString = localStorage.getItem(bookKey);
    localStorage.removeItem(bookKey);
    localStorage.setItem(newName, bookArrayString);

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
