import React from "react";
import Homepage from "./components/Homepage.jsx";
import Header from "./components/Header";
import LoginError from "./components/LoginError";
// import TAC from "./components/TAC/TAC";
// import {PIP} from "./components/PIP/PIP";
import ErrorBoundary from "./HOCs/ErrorBoundary.tsx";
const TAC = process.env.NODE_ENV == "development" ? React.lazy(() => import(/* webpackChunkName: "tacdbchunk" */ './components/TAC/TAC')) : React.lazy(() => import(/* webpackChunkName: "/tacdbchunk" */ './components/TAC/TAC'));
const PIP = process.env.NODE_ENV == "development" ? React.lazy(() => import(/* webpackChunkName: "pip" */ './components/PIP/PIP')) : React.lazy(() => import(/* webpackChunkName: "/pip" */ './components/PIP/PIP'));
// const PIP = React.lazy(() => import(/* webpackChunkName: "APage" */ './components/PIP/PIP'));
import { HashRouter, Route, Switch } from "react-router-dom";
import { config } from "./config"
import authGuard from "./HOCs/authGuard.js";
import { useSelector } from "react-redux";

export const AppRouter = () => {
  const user = useSelector((state) => ({ auth: state.auth }));
  return (
    /* ErrorBoundary is to render fallback ui incase of errors */
    <ErrorBoundary>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <HashRouter  >
          <Header basename={config.baseLOCATION} />
          <Route exact path={"/"} component={Homepage} />
          <Route exact path={"/error"} component={LoginError} />
          <Route exact path={"/tac"} component={authGuard(TAC)} />
          {/* {user.auth.role === 'L3' || user.auth.role === 'login' ? <Route exact path={"/tac"} component={authGuard(TAC)} /> : null} */}
          {user.auth.role === 'L3' || user.auth.role === 'PIP' ? <Route exact path={"/prod-indus-planning"} component={authGuard(PIP)} /> : null}
        </HashRouter>
      </React.Suspense>
    </ErrorBoundary>
  );
};
