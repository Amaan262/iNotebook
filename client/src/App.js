import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";



function App() {
 


  return (
    <>
      {/* <Home /> */}
      <NoteState>

      <Router>
      <Navbar />
      <Alert  alert={alert}/>
      <div className="container">

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
