import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TabContent from "./TabContent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Cotizaciones emitidas vs no emitidas" {...a11yProps(0)} />
          <Tab label="Cotizaciones Oceánica" {...a11yProps(1)} />
          <Tab label="Cotizaciones por Productos" {...a11yProps(2)} />
          <Tab label="Cotizaciones por Perfil" {...a11yProps(3)} />
          <Tab label="Cotizaciones Emitidas por Productos" {...a11yProps(4)} />
          <Tab label="Cotizaciones Emitidas por Perfil" {...a11yProps(5)} />
          {/* <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TabContent
          titulo="Porcentajes Totales"
          url="http://localhost:5000/api/Ver_Totales"
          urlGraph="http://localhost:5000/api/Ver_Totales"
          urlGraph2="http://localhost:5000/api/Ver_CotizacionesOceaEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContent
          titulo="Cotizaciones Oceánica"
          url="http://localhost:5000/api/Ver_CotizacionesOcea"
          urlGraph="http://localhost:5000/api/Ver_Cotizaciones_Productos"
          urlGraph2="http://localhost:5000/api/Ver_CotizacionesOceaEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabContent
          titulo="Cotizaciones por Productos"
          url="http://localhost:5000/api/Ver_Cotizaciones_Productos"
          urlGraph="http://localhost:5000/api/Ver_Cotizaciones_Productos"
          urlGraph2="http://localhost:5000/api/Ver_CotizacionesOceaEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabContent
          titulo="Cotizaciones por Perfil"
          url="http://localhost:5000/api/Ver_CotizacionesOcea_Perfil"
          urlGraph="http://localhost:5000/api/Ver_CotizacionesOcea_Perfil"
          urlGraph2="http://localhost:5000/api/Ver_CotizacionesOceaEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TabContent
          titulo="Cotizaciones Emitidas por Productos"
          url="http://localhost:5000/api/Ver_CotizacionesOceaEmit"
          urlGraph="http://localhost:5000/api/Ver_CotizacionesOceaEmit"
          urlGraph2="http://localhost:5000/api/Ver_CotizacionesOceaEmit"
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TabContent
          titulo="Cotizaciones Emitidas por Perfil"
          url="http://localhost:5000/api/Ver_EmisionesOcea_Perfil"
          urlGraph="http://localhost:5000/api/Ver_EmisionesOcea_Perfil"
          urlGraph2="http://localhost:5000/api/Ver_EmisionesOcea_Perfil"
        />
      </TabPanel>
      {/* <TabPanel value={value} index={6}>
        <TabContent />
      </TabPanel> */}
    </div>
  );
}
