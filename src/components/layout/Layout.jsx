import React from "react";
import Header from "../header/Header";
import { LayoutLimit } from "./styles";

const Layout = ({ children }) => {
  return (
    <LayoutLimit>
      <Header />
      {children}
    </LayoutLimit>
  );
};

export default Layout;
