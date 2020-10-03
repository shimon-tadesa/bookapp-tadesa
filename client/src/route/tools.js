
 function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function setToLocalStorage(key, value) {
    let valueAsTring =JSON.stringify(value) ;
    localStorage.setItem(key,valueAsTring);
  }

  function removeFromLocalStorage(key){
    localStorage.removeItem(key);
  }

  function initDefualtCollectionNames() {
    let collectionNames =localStorage.getItem("collectionNames");
    if (!collectionNames) {
      let defualtCollectionNames = ["finishedBooks", "booksToRead"];
      localStorage.setItem("collectionNames",JSON.stringify(defualtCollectionNames));
    }
  }



  const tools = {
    readFromLocalStorage,
    setToLocalStorage,
    removeFromLocalStorage,
    initDefualtCollectionNames
  };

  export default tools;