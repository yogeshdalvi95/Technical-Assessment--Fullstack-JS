import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import styles from "../../assets/styles/components/navbar";

const useStyles = makeStyles(styles);

export default function Navbar(props) {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>Weatherly</Toolbar>
    </AppBar>
  );
}
