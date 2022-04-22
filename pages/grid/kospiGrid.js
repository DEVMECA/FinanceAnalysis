import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const state = {
    defaultColDef: {
        sortable: true,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
    },
    columnDefs: [
        {headerName: "RULE DATE", field: "stk_date", width: "300px", cellStyle: {textAlign: 'left'}},
        {headerName: "LAST PRICE", field: "stk_end_amt"},
        {headerName: "CHANGE", field: "stk_cpr_bef_amt"},
        {headerName: "% CHANGE", field: "stk_ratio"},
    ],
    rowData: []
}

const onCellClicked = function(event){location.href="/stock/" + event.data["SYMBOL"]};
const loadDataHandler = function() {
    fetch(`/api/index/kospi`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('====================================')
            state.rowData = data;
            console.log(state.rowData)
            console.log('====================================')
        }
    );
}
loadDataHandler();

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
                    defaultColDef={state.defaultColDef}
					columnDefs={state.columnDefs}
					rowData={state.rowData}
                    onCellClicked={onCellClicked}
                    animateRows={true}
                    >
				</AgGridReact>
			</div>
		);
    }
  });