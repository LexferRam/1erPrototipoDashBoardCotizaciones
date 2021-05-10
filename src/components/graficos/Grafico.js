import React, { useState, useEffect } from "react";
import { Pie } from "@reactchartjs/react-chart.js";

const PieChart = ({ enviardataGraph, valor }) => {
  const [rows, setRows] = useState([]);
  const [areas, setAreas] = useState([]);
  const [total, seTotal] = useState(0);

  const data = {
    labels: areas,
    datasets: [
      {
        // label: "Productos",
        data: rows,
        backgroundColor: ["#FC4210", "#00B220", "#0028B2", "#9B0028"],
        borderColor: ["#FC4210", "#00B220", "#0028B2", "#9B0028"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    console.log("desde el graph values:  " + JSON.stringify(enviardataGraph));
    const nums = enviardataGraph.map((cot) => cot.COTIZACIONES);
    const Arrareas = enviardataGraph.map((cot) => cot.AREA.substring(14));

    setRows(nums);
    setAreas(Arrareas);
    let total = nums.reduce((a, b) => a + b, 0);
    seTotal(total);
  }, [enviardataGraph]);

  return (
    <div className="chartPie">
      {valor === "realizadas" ? (
        <>
          <b>Cotizaciones Realizadas:</b> {total}
        </>
      ) : (
        <>
          {" "}
          <b>Cotizaciones Emitidas:</b> {total}
        </>
      )}

      <Pie data={data} />
    </div>
  );
};

export default PieChart;

// canvas {
//   width: 116% !important;
//   height: 100% !important;
//   margin-left: -25px;
// }
