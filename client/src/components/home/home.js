import React from 'react';
import axios from 'axios';

function Home(){
const url = ('https://openlibrary.org/developers/api');

axios
.get(url)
.then((res)=>{
    let bookData = res.data
    console.log(bookData);
})

return(
    <div className="home">
        <h1>home page</h1>
        


        </div>
    )
}

export default Home;