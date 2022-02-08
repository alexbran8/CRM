import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.scss"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { config } from "../config"
import { UPDATE_PROFILE, AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_ERROR } from '../redux/reducers/types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  UncontrolledPopover, PopoverHeader, PopoverBody
} from 'reactstrap'

import { ExitToApp, ThreeDRotation } from '@material-ui/icons';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PagesItems from "./Header/interfaces";
import history from './history';
import authGuard from "../HOCs/authGuard.js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


const PopoverContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PopoverHeader>NOKIA {config.AppName} WEB APPLICATION {config.appVersion}</PopoverHeader>
      <PopoverBody>
        LATEST UPDATES:
      </PopoverBody>
    </>
  );
}
// var modal = <IModal>{};


export const Header = () => {
  const user = useSelector((state) => ({ auth: state.auth }));
  const [state, setState] = useState([]);
  const classes = useStyles();
  const [pic, setPic] = useState();
  const dispatch = useDispatch();

  interface pageItems {
    items: Array<PagesItems>
  }

  const pages = [
    { link: 'tac', title: 'TAC', roles: 'tacdb-user' },
    { link: 'prod-indus-planning', title: 'PIP', roles: 'PIP' }
  ] as pageItems;



  const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement > (null);
  const open = Boolean(anchorEl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const MINUTE_MS = sessionStorage.getItem('token_refresh');


  // check if token has expired and redirect to token expired page
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(new Date() > new Date(1000*(sessionStorage.getItem('token_refresh'))))
      console.log(new Date(1000*(sessionStorage.getItem('token_refresh'))))
      if ( new Date() > new Date(1000*(sessionStorage.getItem('token_refresh')))) {
        console.log('check login');
        sessionStorage.clear()
        _handleLogoutClick()
      }
    }, 25000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  useEffect(() => {
    login();
  }, [])

  //   useEffect(()=>{
  //  getIcon(user.auth.token)
  //   },[state.authenticated])

  // gets login details
  function login() {
    fetch(config.baseURL + config.baseLOCATION + "/auth/login/success/", {
      method: "GET",
      // body: JSON.stringify({ title: 'Fetch POST Request Example' }),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        // "Access-Control-Allow-Origin":true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        sessionStorage.setItem('exp', responseJson.user.exp);
        sessionStorage.setItem('token_refresh', responseJson.user.token_refresh);
        sessionStorage.setItem('userEmail', responseJson.user.email);
        sessionStorage.setItem('upalu', responseJson.user.upalu);
        sessionStorage.setItem('userName', responseJson.user.userName);
        sessionStorage.setItem('name', responseJson.user.first_name);
        sessionStorage.setItem('token', responseJson.user.token);
        sessionStorage.setItem('roles', responseJson.user.roles);

        dispatch({
          type: UPDATE_PROFILE,
          payload: {
            role: responseJson.user.roles,
            userName: responseJson.user.userName,
            name: responseJson.user.first_name,
            email: responseJson.user.email,
            upalu: responseJson.user.upalu,
            token: responseJson.user.token
          },

        });
        setState({
          authenticated: true,
          user: responseJson.user
        });

        // get profile picture
        getIcon(responseJson.user.token)


      }
      )
      .catch(error => {
        setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
        console.log(error);
        _handleLogoutClick();
      });
  }


  const getIcon = (token) => {
    fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
      method: "GET",
      // credentials: "include",
      headers: {
        Authorization: token,
      }
    })
      .then(response => {
        if (response.status === 200) return response;
        throw new Error("failed to authenticate user");
      })
      .then(response => response.blob())
      .then(blob => setPic(URL.createObjectURL(blob)))
      .catch(error => {
        setPic(null);
        // setState({
        //   // authenticated: false,
        //   // error: "Failed to authenticate user"
        // });
        console.log(error)
      });
  }


  const _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open(config.baseURL + config.baseLOCATION + "/auth/azure", "_self");
  };

  const _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open(config.baseURL + config.baseLOCATION + "/auth/logout", "_self");
    sessionStorage.removeItem('exp')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('roles')
    _handleNotAuthenticated();
  };
  const _handleNotAuthenticated = () => {
    setState({ authenticated: false });
  };


  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
            >
              <Link className="navbar-brand text-white" to={"/"}>
                <b>NOKIA</b> {config.AppName} {user.auth.type === 'student' ? <div className="header-title"> {t("navbar.students")} </div> : null}
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {(state && state.authenticated) ?
                <>
                  {pages.map((item, index) => (
                    // check if user has the defined role to view current item
                    user && (user.auth.role == 'L3' || user.auth.role === item.roles) ?
                      <Link
                        key={index + item.title}
                        className="nav-link text-white"
                        to={item.link}
                      >
                        {state.role} {item.title.toUpperCase()}
                      </Link>
                      : null
                  ))}
                </>
                : null}
            </Box>


            {(state && state.authenticated) ? (
              <div className="avatar">
                {/* {pic ? */}
                <div className='icon'>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    className="icon"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar alt="avatar Sharp"
                      // className={classes.small}
                      src={pic} /> <div className='avatar-name'>{state.user.first_name}</div>
                  </IconButton>
                </div>
                {/* : null} */}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={_handleLogoutClick}><span title="log out"><ExitToApp /> Log out</span></MenuItem>
                </Menu>

              </div>

            ) : (<div><Button variant="contained" color="primary" onClick={_handleSignInClick}><span title="log in">Login</span></Button></div>)}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header