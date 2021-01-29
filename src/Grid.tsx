import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
import { fetchData, fetchLargeData, Athlete } from "./api";

const columnDefs: ColDef[] = [
  {
    headerName: "ID",
    field: "id",
    width: 70,
    filter: "agNumberColumnFilter"
  },
  {
    headerName: "Athlete",
    field: "athlete",
    width: 150,
    editable: true,
    filter: "agTextColumnFilter"
  },
  {
    headerName: "Age",
    field: "age",
    width: 90,
    minWidth: 50,
    maxWidth: 100,
    editable: true,
    filter: "agNumberColumnFilter"
  },
  {
    headerName: "Country",
    field: "country",
    width: 120
  },
  {
    headerName: "Year",
    field: "year",
    width: 90
  },
  {
    headerName: "Date",
    field: "date",
    width: 110
  },
  {
    headerName: "Sport",
    field: "sport",
    width: 110
  },
  {
    headerName: "Gold",
    field: "gold",
    width: 100
  },
  {
    headerName: "Silver",
    field: "silver",
    width: 100
  },
  {
    headerName: "Bronze",
    field: "bronze",
    width: 100
  },
  {
    headerName: "Total",
    field: "total",
    width: 100
  }
];

type AgGridApi = {
  grid?: GridApi;
  column?: ColumnApi;
};

// https://www.ag-grid.com/javascript-grid-filter-text/
function Grid() {
  const [rowData, setRowData] = React.useState<Athlete[]>([]);
  const apiRef = React.useRef<AgGridApi>({
    grid: undefined,
    column: undefined
  });
  const onGridReady = (params: GridReadyEvent) => {
    apiRef.current.grid = params.api;
    apiRef.current.column = params.columnApi;
  };

  React.useEffect(() => {
    fetchData().then((d) => setRowData(d));
    // fetchLargeData().then((d) => setRowData(d));
  }, []);

  const showFilter = () => {
    apiRef.current.grid?.setFilterModel({
      athlete: {
        filterType: "contains",
        type: "text",
        filter: "Michael"
      }
    });
    apiRef.current.grid?.onFilterChanged();
  };
  const removeFilter = () => {
    apiRef.current.grid?.setFilterModel(null);
    apiRef.current.grid?.onFilterChanged();
  };
  const showGroup = item => {
    apiRef.current.column?.setRowGroupColumns(item);
  };
  const removeGroup = () => {
    apiRef.current.column?.setRowGroupColumns([]);
  };

  return (
    <>
      <button onClick={showFilter}>Show Filter</button>
      <button onClick={removeFilter}>Remove Filter</button>
      <button onClick={()=>showGroup(["age"])}>Group Age</button>
      <button onClick={()=>showGroup(["athlete"])}>Group Athlete</button>
      <button onClick={removeGroup}>Remove Group</button>
      <div style={{ height: "60vh" }}>
        <div
          style={{ height: "100%", width: "100%" }}
          className="ag-theme-balham"
        >
          <AgGridReact
            rowSelection="multiple"
            suppressRowClickSelection
            defaultColDef={{
              filter: true,
              floatingFilter: true
            }}
            columnDefs={columnDefs}
            enableColResize
            onGridReady={onGridReady}
            rowData={rowData}
            enableFilter
          />
        </div>
      </div>
    </>
  );
}

export default Grid;
