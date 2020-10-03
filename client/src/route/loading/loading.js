import React, { useState } from "react";
import "./loading.css";

import axios from "axios";

let apiCalls = 0;
function Loading() {
  const [isLoading, setIsloading] = useState(false);

  axios.interceptors.request.use(function (config) {
    apiCalls++;
    console.log("loading data ...");
    setIsloading(true);
    return config;
  });
  axios.interceptors.response.use(
    function (response) {
      apiCalls--;
      if (apiCalls === 0) {
        setIsloading(false);
        console.log("loading finished");
      }
      return response;
    },
    function (error) {
      apiCalls--;
      if (apiCalls === 0) {
        setIsloading(false);
        console.log("loading finished");
      }
      return Promise.reject(error);
    }
  );

  return (
    <div className="loading">
      {isLoading ? (
        <div id="loadind-data-container">
          <div id="loading-data"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Loading;
