import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setDolarData, addValue, removeValue } from "../../store/dolarValues/dolarSlice";
import { DolarValues } from '../../store/dolarValues/dolarSlice';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const dolarValues = useSelector(state => state.dolarValues);
  const dispatcher = useDispatch();

  const handleDelete = (id) =>{
    dispatcher(removeValue(id));
  }

  return (
    <React.Fragment>
      <Title>Valor Dolar</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Opción</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dolarValues ? dolarValues.map((row) => (
            <>
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right"> 
                <Button onClick={ () => handleDelete(row.id)}variant="outlined" color="error">
                  Eliminar
                </Button>
                </TableCell>
                <TableCell align="right">{`$${row.value}`}</TableCell>
              </TableRow>
            </>
          ))
            :
            <Box>
              <Typography>
                La API no ha cargado los datos aún.
              </Typography>
            </Box>
          }
        </TableBody>
      </Table>





    </React.Fragment>
  );

}
