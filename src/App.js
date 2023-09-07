import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/UI/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Create from "./components/Create/Create";
import SiteList from "./components/SiteList/SiteList";
import Footer from "./components/UI/Footer";
import Error from "./components/UI/Error";

import "./App.css";
import "./components/UI/mode.css";



const App = () => {
  const [style, setStyle] = useState(() => {
    return localStorage.getItem("Theme") === "true" ? true : false;
  });

  const onClickHandler = (event) => {
    event.preventDefault();
    setStyle(!style);
    localStorage.setItem("Theme", !style);
  };

  return (
    <BrowserRouter>
      <div
        className={localStorage.getItem("Theme") === "true" ? "light" : "dark"}
      >
        <Header onClick={onClickHandler} />
        <Routes>
          <Route path="*" element={<Error />} />
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/sites" element={<SiteList />} />
        </Routes>
        <Footer style={localStorage.getItem("Theme")} />
      </div>
    </BrowserRouter>
  );
};

export default App;
