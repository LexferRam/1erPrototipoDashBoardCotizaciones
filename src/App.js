import React from "react";
//GRID
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//Tabs
import Tabs from "./components/Tabs";
import "./css/Tabs.css";
import AppBar from "./components/AppBar";

//estilos grid
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // marginTop: 65,
  },
  borde: {
    borderRadius: "10px",
  },
  [theme.breakpoints.up("sm")]: {
    root: {
      flexGrow: 1,
      padding: theme.spacing(4),
    },
  },
  [theme.breakpoints.down("sm")]: {
    paper: {
      marginTop: 10,
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <AppBar />
      <div className={`${classes.root}`}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.borde}>
            <Paper elevation={20} className={classes.paper}>
              <Tabs />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
