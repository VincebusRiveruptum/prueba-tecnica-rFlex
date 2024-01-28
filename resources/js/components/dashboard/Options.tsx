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
import { setDateRange } from '../../store/dateRange/dateRangeSlice';

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
    {  year:"2023" },
    {  year:"2024" }
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
    console.log(event.target.name);
    var dateArray;
    var modifiedDateString;

    switch(event.target.name){
      case 'monthStart':
          dateArray = dateRange.start.split('-');
          dateArray[1] = event.target.value;
          modifiedDateString = dateArray.join('-');
          console.log(modifiedDateString);
          //dispatcher(setDateRange(modifiedDateString));
        break;
      case 'yearStart':
        dateArray = dateRange.start.split('-');
        dateArray[0] = event.target.value;
        modifiedDateString = dateArray.join('-');
        console.log(modifiedDateString);
        break;
      case 'monthEnd':
        dateArray = dateRange.end.split('-');
        dateArray[1] = event.target.value;
        modifiedDateString = dateArray.join('-');
        console.log(modifiedDateString);
        break;
      case 'yearEnd':
        dateArray = dateRange.end.split('-');
        dateArray[0] = event.target.value;
        modifiedDateString = dateArray.join('-');
        console.log(modifiedDateString);
        break
    }
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
                            labelId="select-start-month-label"
                            id="select-start-month"
                            value={ 
                            
                              parseInt(dateRange.start.split('-')[1])
                            }
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
                  <InputLabel id="select-start-year">Año</InputLabel>
                      <Select
                          labelId="select-start-year-label"
                          id="select-start-year"
                          value={parseInt(dateRange.start.split('-')[0])}
                          label="Ano"
                          onChange={handleRangeChange}
                          name="yearStart"
                      >   
                      {
                          years.map(item => (
                              <MenuItem value={item.year}>{item.year}</MenuItem>    
                          ))
                      }                    
                      </Select>
                  </FormControl>        
                  
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-last-month">Mes</InputLabel>
                      <Select
                          labelId="select-last-month-label"
                          id="select-last-month"
                          value={parseInt(dateRange.end.split('-')[1])}
                          label="Mes"
                          onChange={handleRangeChange}
                          name="monthEnd"
                      >   
                      {
                          months.map(item => (
                              <MenuItem value={item.id}>{item.month}</MenuItem>    
                          ))
                      }                    
                      </Select>
                  </FormControl>
      
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="select-last-year">Año</InputLabel>
                      <Select
                          labelId="select-last-year-label"
                          id="select-last-year"
                          value={parseInt(dateRange.end.split('-')[0])}
                          label="Ano"
                          onChange={handleRangeChange}
                          name="yearEnd"
                      >   
                      {
                          years.map(item => (
                              <MenuItem value={item.year}>{item.year}</MenuItem>    
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