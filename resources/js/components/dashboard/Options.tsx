import * as React from 'react';
import dayjs from 'dayjs';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { setDollarData, addValue, removeValue } from "../../store/dollarValues/dollarSlice";
import { dollarValues } from '../../store/dollarValues/dollarSlice';
import { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { setStartDate,setEndDate } from '../../store/dateRange/dateRangeSlice';



export default function Options() {  
  const dollarValues = useSelector(state => state.dollarValues);    
  const dateRange = useSelector(state => state.dateRange);

  const dispatcher = useDispatch();

  // Data scrapping
  const fetchData = async ({start, end}) => {
    try {
      const request = "http://127.0.0.1:8000/api/dollarValue/" + start + "/" + end; 
      //console.log(start + end);
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
    const newDollarValues: dollarValues[] = jsonData.map((item) => {
      return { id: item.id, value: item.value, date: item.date,};
    });
    dispatcher(setDollarData(newDollarValues)); 
  } 
  // Fetching at start
  useEffect(() => {

    fetchData(dateRange);
  }, []);

  function handleSetStartDate(newValue) {
    const selectedDate = newValue.format('YYYY-MM-DD');
    const endDate = dateRange.end;

    if (dayjs(selectedDate).isBefore(endDate)) {
      dispatcher(setStartDate(selectedDate));
      fetchData(dateRange);
    } else {
      // If the initial date is after the final date
      alert("Fecha inválida. La fecha inicial debe ser igual o previa a la fecha final.");
    }
  }

  function handleSetEndDate(newValue) {
    const selectedDate = newValue.format('YYYY-MM-DD');
    const startDate = dateRange.start;
    if (dayjs(selectedDate).isAfter(startDate) || dayjs(selectedDate).isSame(startDate)) {
      dispatcher(setEndDate(selectedDate));
      fetchData(dateRange);
    } else {
      // If fianl date is before the initial date an alert shows up
      alert("Fecha inválida. La fecha final debe ser igual o posterior a la fecha inicial.");
    }
  }

  return (
    <React.Fragment>
      <Title>Rango de fechas</Title>
        <Grid justifyContent="center" container spacing={2}>
            <Grid item xs={3}>
             <DatePicker defaultValue={dayjs().subtract(30, 'day')} onChange={(newValue) => handleSetStartDate(newValue)}/>
            </Grid>
            <Grid item xs={3}>
              <DatePicker defaultValue={dayjs()} onChange={(newValue) => handleSetEndDate(newValue)}/>
            </Grid>
        </Grid>  
    </React.Fragment>
  );
}