import React from "react";
import * as style from "./App.module.scss";
import { Switch, Route } from "react-router-dom";
import Collections from "./pages/Collections/collection";
import { BooksSearch } from "./pages/BooksSearch/searchBook";
import { Header } from "./components/Header";
import tools from "./route/tools";
import Loading from "./route/loading/loading";


const App = () => {
  
  // defulualte collcetion even if deleted evrey collections
  tools.initDefualtCollectionNames();
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
      <Loading />
      
    </div>
  );
};

export default App;
