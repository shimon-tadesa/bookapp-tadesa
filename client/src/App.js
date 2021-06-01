import React, { useState, useEffect } from "react";
import * as style from "./App.module.scss";
import { Switch, Route } from "react-router-dom";
import Collections from "./pages/Collections/collection";
import { BooksSearch } from "./pages/BooksSearch/searchBook";
import { Header } from "./components/Header";
import Loading from "./components/loading/loading";

const App = () => {
  const [dataStore, _setDataStore] = useState({ collectionNames: [] });

  const setDataStore = (dataStore) => {
    //1.update localstorage data
    localStorage.clear();

    Object.keys(dataStore).forEach((key) => {
      localStorage[key] = JSON.stringify(dataStore[key]);
    });

    // 2.update dataStorage state in app.js
    _setDataStore({ ...dataStore });
    console.log("updated");
    
  };

  function initDefualtCollectionNames() {
    let collectionNames = localStorage.getItem("collectionNames");
    if (!collectionNames) {
      let defualtCollectionNames = ["finishedBooks", "booksToRead"];
      localStorage.setItem(
        "collectionNames",
        JSON.stringify(defualtCollectionNames)
      );
      localStorage.setItem("finishedBooks", "[]");
      localStorage.setItem("booksToRead", "[]");
    }
  }
  useEffect(() => {
    
    let storage = {};
    Object.keys(localStorage).forEach((key) => {
      storage[key] = JSON.parse(localStorage.getItem(key));
      console.log(storage[key]);
    });
    _setDataStore(storage);
  }, []);

  // create default collection
  initDefualtCollectionNames();

  return (
    <div className={style.app}>
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path="/collections"
            render={(props) => (
              <Collections
                {...props}
                dataStore={dataStore}
                ontDataStoreChange={setDataStore}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <BooksSearch
                {...props}
                dataStore={dataStore}
                ontDataStoreChange={setDataStore}
              />
            )}
          />
        </Switch>
      </main>

      <Loading />
    </div>
  );
};

export default App;
