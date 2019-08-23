import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './store';

const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	overrides: {
		MuiButton: {
			text: {
				background: '#2e58ff',
				borderRadius: 3,
				border: 0,
				color: '#f5f5f5',
				height: 36,
				padding: '0 30px',
				letterSpacing: 1.1,
				fontWeight: 400,
				textTransform: 'capitalize',
				'&:hover': {
					backgroundColor: '#8bbaff'
				}
			}
		}
	},
	palette: {
		primary: {
			light: '#8bceff',
			dark: '#8bbaff',
			main: '#2e58ff',
			contrastText: '#fff'
		},
		secondary: {
			dark: '#10ac84',
			main: '#1dd1a1',
			contrastText: '#fff'
		}
	}
});

ReactDOM.render(
	<Router>
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>
	</Router>,
	document.getElementById('root')
);
