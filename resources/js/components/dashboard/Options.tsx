import * as React from 'react';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { setDolarData, addValue, removeValue } from "../../store/dolarValues/dolarSlice";
import { DolarValues } from '../../store/dolarValues/dolarSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

const months = [
    { id:"1", month:"Enero"},
    { id:"2", month:"Febrero"},
    { id:"3", month:"Marzo"},
    { id:"4", month:"Abril"},
    { id:"5", month:"Mayo"},
    { id:"6", month:"Junio"},
    { id:"7", month:"Julio"},
    { id:"8", month:"Agosto"},
    { id:"9", month:"Septiembre"},
    { id:"10", month:"Octubre"},
    { id:"11", month:"Noviembre"},
    { id:"12", month:"Diciembre"}
];

const years = [
    { id:"1", year:"2023" },
    { id:"2", year:"2024" }
];

export default function Options() {  
  const dolarValues = useSelector(state => state.dolarValues);    
  const dateRange = useSelector(state => state.dateRange);

  const dispatcher = useDispatch();

  // Data scrapping
  const fetchData = async ({start, end}) => {
    try {
      const request = "http://127.0.0.1:8000/api/valorDolar/" + start + "/" + end; 
      console.log(start + end);
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
       setData(jsonData);
    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Data loading
  const setData = (jsonData) => {
    const newDolarValues: DolarValues[] = jsonData.map((item) => {
      return { id: item.id, value: item.value, date: item.date,};
    });
    dispatcher(setDolarData(newDolarValues)); 
  } 

  // Range selection
  const handleRangeChange = (event: SelectChangeEvent) => {
    console.log(event.target);      
  };

  // Fetching at start
  useEffect(() => {

    fetchData(dateRange);
  }, []);

  return (
    <React.Fragment>
      <Title>Opciones</Title>
                  <Box
                    sx={{
                      p: 0,
                      display: 'flex',
                      flexDirection: 'row',
                      height: 100,
                    }}
                  > 
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="select-start-month">Mes</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={}
                            label="Mes"
                            onChange={handleRangeChange}
                            name="monthStart"
                        >   
                        {
                            months.map(item => (
                                <MenuItem value={item.id}>{item.month}</MenuItem>    
                            ))
                        }                    
                        </Select>
                  </FormControl>
      
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Año</InputLabel>
                      <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value="10"
                          label="Ano"
                          onChange={handleRangeChange}
                          name="yearStart"
                      >   
                      {
                          years.map(item => (
                              <MenuItem value={item.id}>{item.year}</MenuItem>    
                          ))
                      }                    
                      </Select>
                  </FormControl>        
                  
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Mes</InputLabel>
                      <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value="10"
                          label="Mes"
                          onChange={handleRangeChange}
                          name="monthEnd"
                      >   
                      {
                          years.map(item => (
                              <MenuItem value={item.id}>{item.month}</MenuItem>    
                          ))
                      }                    
                      </Select>
                  </FormControl>
      
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Año</InputLabel>
                      <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value="10"
                          label="Ano"
                          onChange={handleRangeChange}
                          name="yearEnd"
                      >   
                      {
                          years.map(item => (
                              <MenuItem value={item.id}>{item.year}</MenuItem>    
                          ))
                      }                    
                      </Select>
                  </FormControl>

                  </Box>

                  <Box sx={{    
                      p: 2,
                      display: 'flex',
                      flexDirection: 'row',
                    }}>                    
                    <Button variant="contained" onClick={ () => fetchData()}>
                        Carga manual de datos
                    </Button>
                  </Box>
     
   

    </React.Fragment>
  );
}