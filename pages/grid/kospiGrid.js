import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const state = {
    columnDefs: [
        {headerName: "SYMBOL", field: "SYMBOL", width: "300px", cellStyle: {textAlign: 'left'}},
        {headerName: "LAST PRICE", field: "LASTPRICE"},
        {headerName: "CHANGE", field: "CHANGE"},
        {headerName: "% CHANGE", field: "CHANGEPERCENT"},
    ],
    rowData: [
        {SYMBOL: "Toyota", LASTPRICE: "Celica", CHANGE: 35000, CHANGEPERCENT:"5%"},
        {SYMBOL: "Ford", LASTPRICE: "Mondeo", CHANGE: 32000, CHANGEPERCENT:"5%"},
        {SYMBOL: "Porsche", LASTPRICE: "Boxster", CHANGE: 72000, CHANGEPERCENT:"5%"},
        {SYMBOL: "Porsche", LASTPRICE: "Boxster", CHANGE: 72000, CHANGEPERCENT:"5%"},
    ]
}

const onCellClicked = function(event){location.href="/stock/" + event.data["SYMBOL"]};

export default () => ({
    displayName: 'kospiGrid',
    render() {
        return (
			<div
				className="ag-theme-balham"
				style={{
					height: '350px',
					width: '100%'
				}}
			>
				<AgGridReact
					columnDefs={state.columnDefs}
					rowData={state.rowData}
                    onCellClicked={onCellClicked}>
				</AgGridReact>
			</div>
		);
    }
  });