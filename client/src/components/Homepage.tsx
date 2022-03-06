// import Header from "./Header.jsx";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { config } from "../config"

import { AlertComponent } from "./common/Alert/Alert"

import "./Homepage.scss"


export const HomePage = () => {
  return (
    <div className="homeContainer">
      <AlertComponent
        messages={[{ message: 'Options in form are now alphabetically sorted.', type: 'success' }, { message: 'File Export is now working for admins...', type: 'success' }, { message: 'Filter by site is now active', type: 'success' }, { message: 'Filter by week is now active', type: 'success' }, { message: 'Filter by ITV is active', type: 'success' }, { message: 'Modal is now responsive', type: 'success' }, { message: 'updated filter fields', type: 'success' }, { message: '[planned update] review form options', type: 'info' }]} />

      <div>
        {/* add user to redux */}
        {!sessionStorage.getItem('userEmail') ? (
          <h1>Welcome! Please login in order to continue...</h1>

        ) : (
          <div>


            <h1>You have been logged in succcessfully!</h1>
            <h2>Welcome {sessionStorage.getItem('userEmail')}!</h2>
          </div>
        )}
        <div className="notification-container">
          <h3 style={{ color: "orange" }}>Working on refactoring the authentification check once token expires so that it will refresh automatically... </h3>
          <h3 style={{ color: "red" }}>Please refresh page / login logout if filter does not work... Token lifetime has been extended until refresh will be implemented. :)</h3>
        </div>
      </div>
    </div>
  );
}
