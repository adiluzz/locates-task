import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from "react";
import { TableWrapper } from './components';
import { EnrichedAllocation } from "./interface";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'symbol', headerName: 'Symbol', width: 130 },
    { field: 'requested', headerName: 'Requested', width: 130 },
    { field: 'received', headerName: 'Received', width: 130 },
];

const MachineTable: FC<{ allocations: EnrichedAllocation[] }> = ({ allocations }) => {

    const getTotalAllocation = (allocations: EnrichedAllocation[], received?: boolean): number => {
        return allocations.reduce((prev, cur) => {
            return prev + (received ? cur.received : cur.requested);
        }, 0);
    };
    return <TableWrapper>
        <div>
            <DataGrid
                rows={allocations}
                columns={columns}
                getRowId={(row: EnrichedAllocation) => `${row.symbol}`}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id: false,
                        },
                    },
                }}
                sx={{
                    '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiDataGrid-footerContainer': {
                        backgroundColor: "white",
                    },
                }}
                autoHeight
            />

        </div>
        <div>
            <h5>Total allocations: {getTotalAllocation(allocations)}</h5>
            <h5>Recieved allocations: {getTotalAllocation(allocations, true)}</h5>
        </div>
    </TableWrapper>
};

export default MachineTable;