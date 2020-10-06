
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

  



  const tools = {
    readFromLocalStorage,
    setToLocalStorage,
    removeFromLocalStorage,
  };

  export default tools;