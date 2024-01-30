import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Title from './Title';
import { useSelector, useDispatch } from 'react-redux';
import { removeValue, modifyValue } from '../../store/dollarValues/dollarSlice'; // Import the modifyValue action

// Import components for the modal
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const ITEMS_PER_PAGE = 10;

export default function Orders() {
  const dollarValues = useSelector((state) => state.dollarValues);
  const dispatcher = useDispatch();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDollarValue, setNewDollarValue] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Function to paginate the data
  const paginateData = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Paginate the data
  const paginatedDollarValues = paginateData(dollarValues, currentPage, ITEMS_PER_PAGE);

  // Delete action handler
  const handleDelete = (id) => {
    dispatcher(removeValue(id));
  };

  // Modify action handler
  const handleModify = (id) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };

  const handleUpdateValue = () => {
    // Validate the new value (you may add more validation as needed)
    if (!isNaN(newDollarValue) && newDollarValue !== '') {
      dispatcher(modifyValue({ id: selectedItemId, value: parseFloat(newDollarValue), date: '' }));
      setIsModalOpen(false);
      setNewDollarValue('');
      setSelectedItemId(null);
    }
  };

  return (
    <React.Fragment>
      <Title>Valor Dollar</Title>
      <Table size="small">
        <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Opción</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDollarValues.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDelete(row.id)} variant="outlined" color="error">
                    Eliminar
                  </Button>
                  <Button onClick={() => handleModify(row.id)} variant="outlined" color="primary">
                    Editar
                  </Button>
                </TableCell>
                <TableCell align="right">{`$${row.value}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
      {dollarValues.length > ITEMS_PER_PAGE && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Pagination
            count={Math.ceil(dollarValues.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="Editar Valor"
            variant="outlined"
            type="number"
            value={newDollarValue}
            
            onChange={(e) => setNewDollarValue(e.target.value)}
          />
          <Button variant="outlined" color="primary" onClick={handleUpdateValue}>
            Aceptar
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
