import React from "react";

import "./footer.css";

const Footer = (props) => {
  return (
    <footer className={props.style === "true" ? "light" : "dark"}>
      <p> Jonathan Nanno & Sheldon Codling </p>
    </footer>
  );
};

export default Footer;
