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
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


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


export const Header = () => {
  const user = useSelector((state) => ({ auth: state.auth }));
  const [state, setState] = useState([]);
  const classes = useStyles();
  const [pic, setPic] = useState();
  const dispatch = useDispatch();

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




  useEffect(() => {
    fetch(config.baseURL + config.baseLOCATION + "/auth/login/success/",  {
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
        console.log(error)
      });

      // myPromise.then(
      //   function(value) { /* code if successful */ },
      //   function(error) { /* code if some error */ }
      // );
    //  getIcon(user.auth.token);


  }, [])

  let myPromise = new Promise(function(myResolve, myReject) {
    // "Producing Code" (May take some time)
    // getIcon(user.auth.token)
      myResolve(); // when successful
      myReject();  // when error
    });

//   useEffect(()=>{
//  getIcon(user.auth.token)
//   },[state.authenticated])


  const  getIcon = (token) =>  {
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
    handleNotAuthenticated();
  };
  const _handleNotAuthenticated = () => {
    setState({ authenticated: false });
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className="navbar-brand text-white" to={"/"}>
              <b>NOKIA</b> {config.AppName} {user.auth.type === 'student' ? <div className="header-title"> {t("navbar.students")} </div> : null}
            </Link>
            <Link className="navbar-brand text-white" to={"/tac"}>TAC</Link>
            <Link className="navbar-brand text-white" to={"/prod-indus-planning"}>PIP</Link>
          </Typography>
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
      </AppBar>
    </div>

    // <Navbar className="navbar sticky-nav" expand="sm"  fixed="top">
    //   <Link className="navbar-brand text-white" id="navbar-brand" to={config.baseLOCATION + "/"}>
    //     <b>NOKIA</b> {config.AppName} {config.appVersion}
    //     <UncontrolledPopover trigger="hover" placement="top" target="navbar-brand">
    //     <PopoverContent  />
    // </UncontrolledPopover>
    //   </Link>
    //   <Collapse 
    //   // isOpen={this.state.isOpen} 
    //   navbar>
    //     {state.authenticated ?
    //     <Nav navbar>
    //       <ul className="navbar-nav text-center">
    //         <li className="nav-item">
    //           <Link
    //             className="nav-link text-white"
    //             to={"/tac"}
    //           >
    //             TAC
    //                 </Link>
    //         </li>
    //       </ul>
    //     </Nav>
    //     : null}
    //   </Collapse>
    //   <div className="navbar-text">
    //     <Nav navbar>
    //     <li className="nav-item">
    //       {/* <Link
    //         className="nav-link text-white"
    //         to={config.baseLOCATION + "/signup"}
    //       >
    //         Reports
    //       </Link> */}
    //     </li>
    //     <ul className="menu">
    //         {state.authenticated ? (
    //           <Button color="danger" onClick={_handleLogoutClick}>Logout {state.user.first_name}</Button>
    //         ) : (
    //           <Button color="primary" onClick={_handleSignInClick}>Login</Button>
    //         )}
    //       </ul>
    //     </Nav>
    //   </div>
    // </Navbar>

  );
}

export default Header