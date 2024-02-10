import NavBar from "./components/NavBar";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Link to="/"></Link>

      {/* using routes for changing the url and rendering the componet on basis of that*/}

      <Routes>
        <Route path="/" element={<NavBar />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
