"use client";

import { openModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Box, Button, IconButton } from "@mui/material";
import CreateSchedule from "./component/CreateSchedule";
import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import N_DataGrid from "@/components/dataGrid/DataGrid";
import { useGetSchedulesQuery } from "@/redux/api/schedulesApi";

const SchedulePage = () => {
    const dispatch = useAppDispatch();
    const {data:allSchedules} = useGetSchedulesQuery()

    const columns: GridColDef[] = [
      { field: 'sl', headerName: 'SL' },
      { field: 'startDate', headerName: 'Date', flex: 1 },
      { field: 'startTime', headerName: 'Start Time', flex: 1 },
      { field: 'endTime', headerName: 'End Time', flex: 1 },
      {
         field: 'action',
         headerName: 'Action',
         flex: 1,
         headerAlign: 'center',
         align: 'center',
         renderCell: ({ row }) => {
            return (
               <IconButton aria-label='delete'>
                  <DeleteIcon sx={{ color: 'red' }} />
               </IconButton>
            );
         },
      },
   ];

    return (
        <Box>
            <Button onClick={() => dispatch(openModal())}>Create Schedule</Button>
            <CreateSchedule />
            <N_DataGrid rows={allSchedules?.data} columns ={columns} />
        </Box>
    );
};

export default SchedulePage;
