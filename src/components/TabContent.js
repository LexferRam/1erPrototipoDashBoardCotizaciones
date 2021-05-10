import React, { useEffect, useState } from "react";
//GRID
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Fechas from "./Fechas";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import GridCotOcea from "./tablas/GridCotOcea";
import Grafico from "./graficos/Grafico";
import GridPorcTotal from "./tablas/GridPorcTotal";
import GrafCotVsEm from "./graficos/GrafCotVsEm";

import GridCotProdOcea from "./tablas/GridCotProdOcea";
import Graficoproductos from "./graficos/Graficoproductos";
import ExportarExcel from "./Exportarexcel";

import GridCotOceaPerfil from "./tablas/GridCotOceaPerfil";
import Graficoprodperfil from "./graficos/Graficoprodperfil";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  chart: {
    marginBottom: 20,
  },
  //*************stilos FECHAS*************** */
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: " #47c0b6",
    color: "white",
    fontSize: 10,
    borderRadius: 50,
    marginTop: 15,
    marginRight: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  [theme.breakpoints.down("sm")]: {
    textField: {
      width: 140,
    },
    paper: {
      padding: theme.spacing(1),
    },
  },
}));

function TabContent({ titulo, url, urlGraph, urlGraph2 }) {
  const classes = useStyles();
  var fecha_hasta = new Date();
  var strfechahasta =
    fecha_hasta.getDate() +
    "/" +
    (fecha_hasta.getMonth() + 1) +
    "/" +
    fecha_hasta.getFullYear();
  const [value, setValue] = useState({
    fecha_desde: "01/12/2020",
    fecha_hasta: strfechahasta,
  });
  const [cotizaciones, setCotizaciones] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [graphdataCot, setGraphdataCot] = useState([]);
  const [graphdataCot2, setGraphdataCot2] = useState([]);

  const onChangeVal = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };
  const onSubmit = (e) => {
    // e.preventDefault();
    setIsLoad(false);
    /* if(!value.fecha_desde || !value.fecha_hasta){
          return alert("Debe ingresar las fechas")
      }*/
    const arrDesde = value.fecha_desde.split("-");
    const arrHasta = value.fecha_hasta.split("-");
    const fechDesde = arrDesde[2] + "/" + arrDesde[1] + "/" + arrDesde[0];
    const fechHasta = arrHasta[2] + "/" + arrHasta[1] + "/" + arrHasta[0];
    const fechas = { fecha_desde: fechDesde, fecha_hasta: fechHasta };
    //--------------------------------------------------------------------
    async function fetchData() {
      const res = await axios.post(url, fechas);
      setCotizaciones(res.data);

      const resGraph = await axios.post(urlGraph, fechas);
      setGraphdataCot(resGraph.data);
      const resGraph2 = await axios.post(urlGraph2, fechas);
      setGraphdataCot2(resGraph2.data);
      setIsLoad(true);
      await console.log(cotizaciones);
    }
    fetchData();
  };

  useEffect(() => {
    var fec_hasta_Ini_DT =
      fecha_hasta.getFullYear() +
      "-" +
      (fecha_hasta.getMonth() + 1) +
      "-" +
      fecha_hasta.getDate();
    var lmes = (fecha_hasta.getMonth() + 1).toString();
    var ldia = fecha_hasta.getDate();
    if (lmes < 9) {
      var mes = "0" + (fecha_hasta.getMonth() + 1);

      if (ldia < 9) {
        var dia = "0" + fecha_hasta.getDate();
        fec_hasta_Ini_DT = fecha_hasta.getFullYear() + "-" + mes + "-" + dia;
      } else {
        fec_hasta_Ini_DT =
          fecha_hasta.getFullYear() + "-" + mes + "-" + fecha_hasta.getDate();
      }
    }
    // setValue({
    //   fecha_desde: "2020-12-01",
    //   fecha_hasta: fec_hasta_Ini_DT,
    // });
    async function fetchData() {
      const res = await axios.post(url, value);

      setCotizaciones(res.data);
      const resGraph = await axios.post(urlGraph, value);
      setGraphdataCot(resGraph.data);
      const resGraph2 = await axios.post(urlGraph2, value);
      setGraphdataCot2(resGraph2.data);

      await setValue({
        fecha_desde: "2020-12-01",
        fecha_hasta: fec_hasta_Ini_DT,
      });
      await setIsLoad(true);
      await console.log(cotizaciones);
    }
    fetchData();
    //    onSubmit()
  }, []);

  return (
    <>
      {!isLoad ? (
        <>
          <LinearProgress />
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* *******************FECHAS************************ */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper elevation={3} className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4} md={3} lg={2}>
                        <TextField
                          name="fecha_desde"
                          label="Fecha Inicio"
                          type="date"
                          value={value.fecha_desde}
                          //defaultValue="2017-05-24"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={onChangeVal}
                        />
                      </Grid>
                      <Grid item xs={6} sm={4} md={3} lg={2}>
                        <TextField
                          label="Fecha Culminación"
                          type="date"
                          defaultValue="2017-05-24"
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="fecha_hasta"
                          value={value.fecha_hasta}
                          onChange={onChangeVal}
                        />
                      </Grid>
                      <Grid
                        item
                        style={{ display: "flex" }}
                        xs={12}
                        sm={4}
                        md={3}
                        lg={4}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<SearchIcon fontSize="small" />}
                          onClick={onSubmit}
                          size="small"
                        >
                          Buscar
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<ArrowDownwardIcon fontSize="small" />}
                        >
                          Excel
                        </Button>
                        <ExportarExcel enviarjsonGrid={cotizaciones} />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
              {/* ************************************************ */}
            </Grid>

            <>
              {titulo == "Porcentajes Totales" ? (
                <>
                  <Grid item xs={12} sm={12} md={12} md={8}>
                    <Paper elevation={8} className={classes.paper}>
                      <GridPorcTotal enviardataGrid={cotizaciones} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} md={4}>
                    <Paper
                      elevation={8}
                      className={`${classes.paper} ${classes.chart}`}
                    >
                      <GrafCotVsEm enviardataGraph={graphdataCot} />
                    </Paper>
                  </Grid>
                </>
              ) : titulo == "Cotizaciones Oceánica" ? (
                <>
                  <Grid item xs={12} sm={12} md={12} md={8}>
                    <Paper elevation={8} className={classes.paper}>
                      <GridCotOcea enviardataGrid={cotizaciones} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} md={4}>
                    <Paper
                      elevation={8}
                      className={`${classes.paper} ${classes.chart}`}
                    >
                      <Grafico
                        enviardataGraph={graphdataCot}
                        valor="realizadas"
                      />
                    </Paper>
                    <Paper elevation={8} className={classes.paper}>
                      <Grafico
                        enviardataGraph={graphdataCot2}
                        valor="emitidas"
                      />
                    </Paper>
                  </Grid>
                </>
              ) : titulo == "Cotizaciones por Productos" ? (
                <>
                  <Grid item xs={12} sm={12} md={12} md={8}>
                    <Paper elevation={8} className={classes.paper}>
                      <GridCotProdOcea enviardataGrid={cotizaciones} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} md={4}>
                    <Paper
                      elevation={8}
                      className={`${classes.paper} ${classes.chart}`}
                    >
                      <Graficoproductos enviardataGraph={graphdataCot} />
                    </Paper>
                  </Grid>
                </>
              ) : titulo == "Cotizaciones por Perfil" ? (
                <>
                  <Grid item xs={12} sm={12} md={12} md={8}>
                    <Paper elevation={8} className={classes.paper}>
                      <GridCotOceaPerfil enviardataGrid={cotizaciones} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} md={4}>
                    <Paper
                      elevation={8}
                      className={`${classes.paper} ${classes.chart}`}
                      style={{ height: 300 }}
                    >
                      <Graficoprodperfil enviardataGraph={graphdataCot} />
                    </Paper>
                  </Grid>
                </>
              ) : titulo == "Cotizaciones Emitidas por Productos" ? (
                <>
                  <Grid item xs={12} sm={12} md={12} md={8}>
                    <Paper elevation={8} className={classes.paper}>
                      <GridCotProdOcea enviardataGrid={cotizaciones} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} md={4}>
                    <Paper
                      elevation={8}
                      className={`${classes.paper} ${classes.chart}`}
                    >
                      <Graficoproductos enviardataGraph={graphdataCot} />
                    </Paper>
                  </Grid>
                </>
              ) : titulo == "Cotizaciones Emitidas por Perfil" ? (
                <>
                  <Grid item xs={12} sm={12} md={12} md={8}>
                    <Paper elevation={8} className={classes.paper}>
                      <GridCotOceaPerfil enviardataGrid={cotizaciones} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} md={4}>
                    <Paper
                      elevation={8}
                      className={`${classes.paper} ${classes.chart}`}
                    >
                      <Graficoprodperfil enviardataGraph={graphdataCot} />
                    </Paper>
                  </Grid>
                </>
              ) : (
                "Otra Opcion"
              )}
            </>
          </Grid>
        </>
      )}
    </>
  );
}

export default TabContent;

{
  /* <Grid item xs={12} sm={12} md={12} md={8}>
<Paper elevation={8} className={classes.paper}>
  <XGrid />
</Paper>
</Grid>
<Grid item xs={12} sm={12} md={12} md={4}>
<Paper
  elevation={8}
  className={`${classes.paper} ${classes.chart}`}
>
  <Chart />
</Paper>
<Paper elevation={8} className={classes.paper}>
  <Chart />
</Paper>
</Grid> */
}
