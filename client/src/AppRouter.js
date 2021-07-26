import React from "react";
import Homepage from "./components/Homepage.jsx";
import Header from "./components/Header.jsx";
import { HashRouter, Route } from "react-router-dom";
import { config } from "./config"
import authGuard from "./HOCs/authGuard.js";

export const AppRouter = () => {
  return (
    <HashRouter  >
      <Header basename={config.baseLOCATION} />
      <Route exact path={"/"} component={Homepage} />
      {/* <Route path={config.baseLOCATION + "/signup"} component={authGuard(signUpForm)} /> */}
    </HashRouter>
  );
};
