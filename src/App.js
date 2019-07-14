import React from "react";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Homepage />
    </div>
  );
};

export default App;
