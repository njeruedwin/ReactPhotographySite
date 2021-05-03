import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//creating css styles
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20
  }
}));

//Declaring the Home Component
const Home = () => {
  const { state, setState } = useState({
    mobileView: false
  });
  const classes = useStyles();

  const mobileView = () => {
    return <div>Mobile View</div>;
  };

  return <div>{mobileView()}</div>;
};
export default Home;
