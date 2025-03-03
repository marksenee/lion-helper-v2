import React from "react";
import { LayoutLimit } from "./styles";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <LayoutLimit>
      <Header />
      {children}
    </LayoutLimit>
  );
};

export default Layout;
