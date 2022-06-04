import { FilterProvider } from 'context/FilterContext';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Call make Server

ReactDOM.render(
	<React.StrictMode>
		<FilterProvider>
			<App />
		</FilterProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
