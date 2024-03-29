/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import ReactDOM from 'react-dom/client';    
import Dashboard from './components/dashboard/Dashboard';
import { Provider } from 'react-redux';
import { store } from "./store/store"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.createRoot(document.getElementById('app')).render(     
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
            <Dashboard/>        
        </Provider>
    </LocalizationProvider>
);
