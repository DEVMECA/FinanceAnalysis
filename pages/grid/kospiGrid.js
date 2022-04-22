import {AgGridReact} from 'ag-grid-react';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
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
const syncDataHandler = function(gridRef, addIndex) {
    fetch(`/api/index/kospi`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            state.rowData = data;
            const res = gridRef.current.api.applyTransaction({
                add: state.rowData,
                addIndex: addIndex,
            });
        }
    );
}

const addDataHandler = function(gridRef) {
    fetch(`/api/index/kospi`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.length == 0) return false;
            var addItem = [data[0]];
            const res = gridRef.current.api.applyTransaction({
                add: addItem
            });
        }
    );
}


const updateDataHandler = function(gridRef) {
    fetch(`/api/index/kospi`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            state.rowData = data;
            const res = gridRef.current.api.applyTransaction({
                update: state.rowData,
            });
        }
    );
}

const clearDataHandler = function(gridRef) {
    const res = gridRef.current.api.applyTransaction({
        remove: state.rowData
    });
}

const KospiGrid = () => {
    const gridRef = useRef();
    const syncItems = useCallback((addIndex) => {
        syncDataHandler(gridRef, addIndex);
      }, []);

    const addItems = useCallback((addIndex) => {
        addDataHandler(gridRef, addIndex);
    }, []);
      
    const updateItems = useCallback((addIndex) => {
        updateDataHandler(gridRef, addIndex);
    }, []);

    const refreshData = useCallback((addIndex) => {
        clearDataHandler(gridRef);
        syncDataHandler(gridRef, addIndex);
    }, []);

    useEffect(() => {
        const timerId = setInterval(refreshData, 5000);
        //return () => clearInterval(timerId);
      }, []);
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
                ref={gridRef}
                onCellClicked={onCellClicked}
                animateRows={true}
                >
            </AgGridReact>
        </div>
    );
};

export default KospiGrid;