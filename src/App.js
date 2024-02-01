import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/UI/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Create from "./components/Create/Create";
import SiteList from "./components/SiteList/SiteList";
import Result from "./components/Result/Result";
import Footer from "./components/UI/Footer";
import Error from "./components/UI/Error";

import "./App.css";
import "./components/UI/mode.css";

const App = () => {
  const [style, setStyle] = useState(() => {
    return localStorage.getItem("Theme") === "true" ? true : false;
  });
  const [status, setStatus] = useState();

  const onClickHandler = (event) => {
    event.preventDefault();
    setStyle(!style);
    localStorage.setItem("Theme", !style);
  };

  const retrieveStatus = (status) => {
    setStatus(status);
  };

  const logOutHandler = async () => {
    try {
      const response = await fetch("http://localhost:5001/auth/logout", {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });

      const statusMessage = await response.json();
    } catch (err) {
      console.error(err);
    }

    setStatus(false);
  };

  return (
    <BrowserRouter>
      <div
        className={localStorage.getItem("Theme") === "true" ? "light" : "dark"}
      >
        <Header
          onClick={onClickHandler}
          useStatus={status}
          logOutHandler={logOutHandler}
        />
        <Routes>
          <Route path="*" element={<Error />} />
          <Route
            index
            path="/"
            element={<Home useStatus={status} logOutHandler={logOutHandler} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={status ? <Navigate to="/" /> : <Login retrieveStatus={retrieveStatus} />}
          />
          <Route path="/create" element={<Create />} />
          <Route path="/sites" element={<SiteList />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer style={localStorage.getItem("Theme")} />
      </div>
    </BrowserRouter>
  );
};

export default App;
