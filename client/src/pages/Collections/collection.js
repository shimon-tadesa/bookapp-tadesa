import React, { useState, useEffect } from "react";
import BookList from "../../components/bookList/bookList";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

function Collections(props) {
  const dataStore = props.dataStore;
  const ontDataStoreChange = props.ontDataStoreChange;
  const [newCollectionName, setNewCollctionName] = useState("");
  const [userCollections, setUserCollections] = useState([]);

  function init() {
    let collectionNames = dataStore.collectionNames;
    let userCollections = [];

    for (let collectionName of collectionNames) {
      let bookArry = dataStore[collectionName];
      userCollections.push({
        title: collectionName,
        list: bookArry,
      });
    }
    setUserCollections(userCollections);
  }

  useEffect(() => {
    init();
  }, [props.dataStore]);

  const createCollection = () => {
    if (!newCollectionName) return;
    console.log("click to create");
    let collectionsArray = dataStore.collectionNames;
    collectionsArray.push(newCollectionName);
    dataStore[newCollectionName] = [];
    ontDataStoreChange(dataStore);
  };

  const deleteCollection = (collectionName) => {
    let allCollection = dataStore.collectionNames;
    let index = allCollection.indexOf(collectionName);
    allCollection.splice(index, 1);
    console.log(allCollection);

    delete dataStore[collectionName];
    ontDataStoreChange(dataStore);
  };

  const renameCollection = (collectionName, newName) => {
    if (!newName) return;
    let allCollection = dataStore.collectionNames;
    let arrIndex = allCollection.indexOf(collectionName);
    allCollection.splice(arrIndex, 1);
    allCollection.push(newName);

    let booksArray = dataStore[collectionName];
    delete dataStore[collectionName];
    dataStore[newName] = booksArray;

    ontDataStoreChange(dataStore);
  };

  const moveBook = (currentList, targetList, book) => {
    let currentListArray = dataStore[currentList];
    dataStore[currentList] = currentListArray.filter((item) => {
      return item.id === book.id ? false : true;
    });
    let targetListArray = dataStore[targetList];
    targetListArray.push(book);
    ontDataStoreChange(dataStore);
  };

  const deleteBook = (bookArrayKey, book) => {
    let arrayFromStorage = dataStore[bookArrayKey];
    dataStore[bookArrayKey] = arrayFromStorage.filter((item) => {
      return item.id === book.id ? false : true;
    });

    ontDataStoreChange(dataStore);
  };

  return (
    <div className="collection-page">
      <Button color="primary" onClick={createCollection}>
        Create Collction
      </Button>

      <Input
        value={newCollectionName}
        type="text"
        onChange={(event) => {
          setNewCollctionName(event.target.value);
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
              onBookDelete={deleteBook}
              onMoveBook={moveBook}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Collections;
