import React, { useState, useEffect } from "react";
import ExportExcel from "react-export-excel";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Button from "@material-ui/core/Button";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

function Exportarexcel({ enviarjsonGrid }) {
  const [jsonCotizaciones, setJsoncotizaciones] = useState([]);
  useEffect(() => {
    setJsoncotizaciones(enviarjsonGrid);
    // alert('Array btnExcel' + JSON.stringify(jsonCotizaciones));
  }, [enviarjsonGrid]);

  return (
    <div className="btnExportarExcel">
      <ExcelFile
        element={
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<ArchiveOutlinedIcon />}
            style={{ marginRight: "30px" }}
          >
            Excel
          </Button>
        }
        filename="Cotizaciones Oceanica"
      >
        <ExcelSheet data={jsonCotizaciones} name="Cotizaciones_Oceanica">
          <ExcelColumn label="Fecha Creación" value="DATE_CREATION" />
          <ExcelColumn label="Nro Cotización" value="NRO_COTIZACION" />
          <ExcelColumn label="IdePol" value="IDEPOL" />
          <ExcelColumn label="Descripción Producto" value="AREA_DESCRIPTION" />
          <ExcelColumn label="Codigo Asesor" value="BUDGET_PARTNER_CODE" />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
}

export default Exportarexcel;
