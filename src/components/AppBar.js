import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import img from "../img.png";

const useStyles = makeStyles((theme) => ({
  root: {
    // position: "fixed",
    zIndex: 999999999999,
    flexGrow: 1,
    width: "100%",
  },
  menu: {
    display: "flex",
    justifyContent: "center",
  },
  img: {
    width: 150,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.menu}>
          <img src={img} className={classes.img} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
