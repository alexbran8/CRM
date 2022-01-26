import React from "react";
import Homepage from "./components/Homepage.jsx";
import Header from "./components/Header";
import LoginError from "./components/LoginError";
import Tac from "./components/Tacdb";
// import {PIP} from "./components/PIP/PIP";
const PIP = React.lazy(() => import(/* webpackChunkName: "APage" */ './components/PIP/PIP'));
import { HashRouter, Route, Switch } from "react-router-dom";
import { config } from "./config"
import authGuard from "./HOCs/authGuard.js";
import { useSelector } from "react-redux";


export const AppRouter = () => {
  const user = useSelector((state) => ({ auth: state.auth }));
  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
    <HashRouter  >
      <Header basename={config.baseLOCATION} />
        <Route exact path={"/"} component={Homepage} />
        <Route exact path={"/error"} component={LoginError} />
        <Route exact path={ "/tac"} component={authGuard(Tac)} />
        {user.auth.role === 'L3' || user.auth.role === 'PIP'  ?  <Route exact path={ "/prod-indus-planning"} component={authGuard(PIP)} /> : null}
    </HashRouter>
    </React.Suspense>
  );
};
