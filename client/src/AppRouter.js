import React from "react";
import Homepage from "./components/Homepage.jsx";
import Header from "./components/Header.jsx";
import LoginError from "./components/LoginError";
import Tac from "./components/Tacdb";
import { HashRouter, Route } from "react-router-dom";
import { config } from "./config"
import authGuard from "./HOCs/authGuard.js";

export const AppRouter = () => {
  return (
    <HashRouter  >
      <Header basename={config.baseLOCATION} />
      <Route exact path={config.baseLOCATION + "/error"} component={LoginError} />
      <Route exact path={config.baseLOCATION + "/"} component={Homepage} />
    <Route exact path={config.baseLOCATION + "/tac"} component={authGuard(Tac)} />
    </HashRouter>
  );
};
