import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TrendingFeed from "./pages/TrendingFeed/TrendingFeed";
import User from "./pages/User/User";
import TrendingSidebar from "./components/TrendingSidebar";

function App() {
  const [username, setUsername] = useState("Dave.xp");
  return (
    <Router>
      <div className="App_container">
        <Header />
        <div className="container">
          <TrendingSidebar />
          <Routes>
            <Route
              path="/"
              exact
              element={<TrendingFeed setUsername={setUsername} />}
            ></Route>
            <Route
              path="/user"
              exact
              element={<User username={username} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
