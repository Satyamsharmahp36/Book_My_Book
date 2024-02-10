import React from "react";
import { Link } from "react-router-dom";
import Content from "./Content";
import { useState } from "react";

function NavBar() {

  // using useState hook for catching the input values so that in future we can send it as a prop to our content component

  const [search, setSearch] = useState("");

 //function for udapte values in input box

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  return (
    <div>

      {/* nav bar with search bar , logo and register button */}
      <nav className="flex justify-between p-3 items-start bg-gradient-to-r from-sky-500 to-indigo-500">
        <div className="flex justify-center flex-col items-center md:flex-row">
          <img
            src="https://kalvium.com/wp-content/uploads/2023/04/Kalvium-Logo-SVG.svg"
            alt="Kalvium Logo"
            className="p-1 w-28 md:w-40"
          />
          <h2 className="md:text-3xl pl-1 font-bold">Books</h2>
        </div>
        <div className="flex justify-center items-center md:relative md:right-16">
          <input
            type="text"
          // calling the fucntion when we write something
            onChange={(e) => handleSearch(e)}
            value={search}
            placeholder="Search Here"
            className="shadow appearance-none border text-center rounded  md:w-64 w-full py-1 mx-2 text-gray-700 leading-tight focus:outline-none mt-1 focus:shadow-outline"
          />
          <img
            src=".\src\assets\search.png"
            alt="Search Image"
            className="size-5 p-1"
          />
        </div>

        {/* using link tag so that when ever we click on button it will change url and we will go to register component */}

        <Link to="/register">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold  p-1.5 rounded">
            Register
          </button>
        </Link>
      </nav>

      {/* adding a quotes related to books */}

      <div className="w-full flex items-center justify-center my-8  text-center p-10 md:flex-row flex-col">
        <h1
          className="shadow appearance-none border rounded  text-gray-700 leading-tight p-2 font-serif font-thin
              focus:outline-none focus:shadow-outline hover:bg-blue-400 hover:text-white md:grid-cols-2"
        >
          "Reading is the sole means by which we slip means by which we slip ,
          involuntarily, often helplessly, into another's skin, another's voice,
          another's soul"{" "}
        </h1>
        <span className="ml-2 font-bold text-center">Joyce Carol</span>
      </div>

      {/* passing our state ie. search as propes to content componet so that it can show results based on that */}
      
      <div className="flex justify-center flex-col mb-11 items-center w-full h-3/4 ">
        <Content data={search} />
      </div>
    </div>
  );
}

export default NavBar;
