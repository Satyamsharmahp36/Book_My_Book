import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Canvas from "./Canvas";

// getting props from navbar

function Content(props) {

  //using state so that we can put our api obj inside array so that , we can map through it in future

  const [state, setState] = useState([]);

//using random number between 3 to 5 upto 1 decimal places for rating the books which didn't have rating given in the api

  const rating=()=>{
    return ((
      Math.random() * (5 - 3) + 3).toFixed(1)
    )
  }

  // this useEfent prevents the redendering as it;s dependency is on empty array means , render only on first render .
  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: {
          Authorization: "whatever-you-want",
        },
      })
      // passing keys and geting the obj and put in our state array
      .then((res) => setState(res.data.books)
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-2 flex items-center justify-center w-full flex-wrap gap-10">
      {/* filtering the state obj on the bases of its title and searched word */}

      {state.filter((el) => {
        {/* and when we didnt search any thing then we are showing ecverything */}
          if (props.data == "") {
            return el;
          } else if (
            // comparing the search value
            el.title.toLowerCase().includes(props.data.toLowerCase())
          ) {
            return el;
          }
        })
        // now maping throught our filtered data , and showing the things whatever are needed 

        .map((e) => {
          return (
            // passing unique key to div so it render again and then displaying the needed content
            <div
              key={e.id}
              className="flex justify-center flex-col items-center text-center m-4
             shadow drop-shadow-md appearance-none border rounded w-48 sm:w-72 sm:h-72  py-1 mx-2 text-gray-700 leading-tight
              focus:outline-none focus:shadow-outline hover:bg-blue-400 hover:text-white md:grid-cols-2 "
            >
              <h2 className="p-3 font-mono">{e.title}</h2>
              <div id="mainSection">
                <img
                  src={e.imageLinks.thumbnail}
                  alt="images"
                  className="w-34 h-44"
                />
              </div>
              <div className="flex items-center justify-center text-center m-2">
               {e.averageRating?e.averageRating:rating()} <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 
        0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
              <h1 className="font-bold text-green-500 ml-1">Free</h1>

              </div>
              <h4 className="pb-3 font-serif text-xs font-semibold">
                {e.authors}
              </h4>
              <hr />
            </div>
          );
        })}
  
      {/* for creativity purpose when our api didn't came  , we display canves element but only for bigger sereen's */}
      <div
        className="sm:fixed top-0 h-screen sm:block hidden"
        style={{ zIndex: -9 }}
      >
        <Canvas />
      </div>

      {/* this is just to hide the ball which are rendered , in order to make it clean */}
      <div className="w-full h-10 bg-gray-200 fixed bottom-0 flex items-center justify-between text-center" >
        <span className="p-2 font-semibold text-xs md:text-xl">Made By :- Satyam Sharma</span> <span className="p-2 text-xs md:text-xl font-semibold ">Fetched From :- "Reactnd-books-api"</span>
      </div>
    </div>
  );
}

export default Content;
