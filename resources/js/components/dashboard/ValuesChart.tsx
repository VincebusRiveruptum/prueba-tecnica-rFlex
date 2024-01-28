import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Chart() {  
  const dolarValues = useSelector(state => state.dolarValues);    
  const theme = useTheme();
  const dispatcher = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    //setAge(event.target.value as string);
  };

  let dolarData = dolarValues.map((item) => {
    return { value: item.value, date: item.date,};
  });

  
  return (
    <React.Fragment>
      <Title>Gráfico</Title>

      { dolarValues ?
      
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        
        <LineChart
          dataset={dolarData}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'date',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            },
          ]}
          yAxis={[
            {
              label: 'Valor ($)',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              max: 1000,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'value',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>

        :
        <Typography>
          No hay datos
        </Typography>
      
      }

    </React.Fragment>
  );
}
