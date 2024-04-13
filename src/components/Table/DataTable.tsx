import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "./DataTable.css";
import { Box } from "@mui/material";

interface DataTableProps {
  rows: any[];
  columnDefs: ColDef[];
}

const DataTable = (props: DataTableProps) => {
  const { rows, columnDefs } = props;
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      flex: 1,
    };
  }, []);

  const copyToClipboard = (data: any) => {
    navigator.clipboard
      .writeText(JSON.stringify(data.data))
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <Box
      className="ag-theme-material"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <AgGridReact
        onCellClicked={copyToClipboard}
        rowData={rows}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={40}
        gridOptions={{
          pagination: true,
          paginationPageSize: 10,
          paginationPageSizeSelector: [10, 20, 50, 100],
        }}
      />
    </Box>
  );
};

export default DataTable;
