import React, { useState, useEffect } from "react";
import { Pie } from "@reactchartjs/react-chart.js";

const PieChart = ({ enviardataGraph }) => {
  const [rows, setRows] = useState([]);
  const [areas, setAreas] = useState([]);
  const [realizadas, setRealizadas] = useState(0);

  const data = {
    labels: areas,

    datasets: [
      {
        // label: 'Cotizaciones Productos',
        data: rows,
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: "red",
              fontSize: "20px",
            },
          },
        },

        backgroundColor: ["#2980B9", "#2E8B57", "#F9D120", "red", "#8FBC8F"],
        borderColor: ["#2980B9", "#2E8B57", "#F9D120", "red", "#8FBC8F"],
        borderWidth: 1,
      },
    ],
    options: {
      title: {
        display: true,
        text: "Título del gráfico",
      },
    },
  };

  useEffect(() => {
    // console.log('desde el graph values:  ' + JSON.stringify(enviardataGraph));
    const nums = enviardataGraph.map((cot) => cot.COTIZACIONES);
    const Arrperfiles = enviardataGraph.map((cot) => cot.PERFIL);
    console.log("Perfiles " + Arrperfiles);
    setRows(nums);
    setAreas(Arrperfiles);
    let totalRealizadas = nums.reduce((a, b) => a + b, 0);
    setRealizadas(totalRealizadas);
  }, [enviardataGraph]);

  return (
    <div className="chartPie">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
