import React from "react";
import * as style from "./App.module.scss";
import { Switch, Route } from "react-router-dom";
import Collections from "./pages/Collections/collection";
import { BooksSearch } from "./pages/BooksSearch/searchBook";
import { Header } from "./components/Header";
// import Home from './components/home/home';

// defulualte collcetion even if deleted evrey collections
function initDefualtCollectionNames() {
  let collectionNames = localStorage.getItem("collectionNames");
  if (!collectionNames) {
    let defualtCollectionNames = ["finishedBooks", "booksToRead"];
    localStorage.setItem(
      "collectionNames",
      JSON.stringify(defualtCollectionNames)
    );
  }
}
const App = () => {
  initDefualtCollectionNames();
  return (
    <div className={style.app}>
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path="/search"
            render={(props) => <BooksSearch {...props} />}
          />
          <Route
            exact
            path="/collections"
            render={(props) => <Collections {...props} />}
          />
          <Route path="/" render={(props) => <BooksSearch {...props} />} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
