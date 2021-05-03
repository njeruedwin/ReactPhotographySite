//Edwin Mugambi Njeru
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import "./navbar.css";
import InfoIcon from "@material-ui/icons/Info";
import ContactsIcon from "@material-ui/icons/Contacts";
import PhotoIcon from "@material-ui/icons/Photo";
import { green, blue } from "@material-ui/core/colors";
import { Button, Drawer, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

  appbar: {
    backgroundColor: "#87cefa",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0
    }
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButton: {
    fontFamily: "Unicorn",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    color: "white"
  },
  title: {
    flexGrow: 1
  },
  drawerContainer: {
    padding: "20px 90px",

    backgroundColor: "#F5F5F5"
  }
}));

const navbarData = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Services",
    href: "/services"
  },
  {
    label: "Contacts",
    href: "/contacts"
  }
];

//Creating the Navbar Component
const Navbar = () => {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false
  });

  const { mobileView } = state;
  const classes = useStyles();

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {photoGraphyLogo()}
        <div> {getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const photoGraphyLogo = () => {
    return (
      <Typography variant="h6" style={{ fontFamily: "Unicorn" }}>
        DiploVipe{" "}
      </Typography>
    );
  };

  const getMenuButtons = () => {
    return navbarData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "white",
            to: href,
            component: Link,
            className: classes.menuButton
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    const displayIcon = (index) => {
      if (index === 0) {
        return <HomeIcon style={{ color: blue[500] }} />;
      }
      if (index === 1) {
        return <InfoIcon style={{ color: blue[500] }} />;
      }
      if (index === 2) {
        return <PhotoIcon style={{ color: blue[500] }} />;
      }
      if (index === 3) {
        return <ContactsIcon style={{ color: blue[500] }} />;
      }
    };
    const getDrawerChoices = () => {
      return navbarData.map(({ label, href }, index) => {
        return (
          <Link
            {...{
              to: href,
              style: {
                textDecoration: "none",
                color: "#00BFFF",
                fontFamily: "Unicorn"
              },
              key: label,
              onClick: handleDrawerClose
            }}
          >
            <MenuItem>
              <ListItemIcon>{displayIcon(index)}</ListItemIcon> {label}
            </MenuItem>
          </Link>
        );
      });
    };

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "top",
            open: state.drawerOpen,
            onClose: handleDrawerClose,
            className: classes.drawer
          }}
        >
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <div>{photoGraphyLogo()}</div>
      </Toolbar>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </div>
  );
};

export default Navbar;
