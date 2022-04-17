import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const state = {
    columnDefs: [
        {headerName: "NO", field: "NO"},
        {headerName: "DATE", field: "DATE"},
        {headerName: "NEWS SOURCE", field: "NEWSSOURCE"},
        {headerName: "SYMBOL", field: "SYMBOL"},
        {headerName: "TITLE", field: "TITLE", width: "1250px", cellStyle: {textAlign: 'left'}},
    ],
    rowData: [
        {NO: 10, DATE: "2022-04-15", NEWSSOURCE: "연합뉴스", SYMBOL: "SAMSUNG", TITLE:"삼성전자, 3년만에 인텔 제치고 반도체 세계 1위 탈환"},
        {NO: 9, DATE: "2022-04-14", NEWSSOURCE: "중앙일보", SYMBOL: "SAMSUNG", TITLE:"충격! 3년만에 반도체 1위 탈환한 곳은?"},
        {NO: 8, DATE: "2022-04-13", NEWSSOURCE: "조선일보", SYMBOL: "SK HYNIX", TITLE:"[단독] 삼성전자, SK하이닉스 이직 연구원에 전직금지 가처분 승소"},
        {NO: 7, DATE: "2022-04-13", NEWSSOURCE: "연합뉴스", SYMBOL: "SK HYNIX", TITLE:'"셋째 주 금요일 쉽니다"…SK하이닉스 직원들의 행복한 금요일'},
    ],
}

const onCellClicked = function(event){location.href="/news/" + event.data["NO"]};

export default () => ({
    displayName: 'newsGrid',
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