import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    purple500,
    purple700,
    //amber500,
    amber300,
} from 'material-ui/styles/colors';
import './App.css';
import Main from './components/Main';
//import MyAwesomeReactComponent from './MyAwesomeReactComponent';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: purple500,
        primary2Color: purple700,
        accent1Color: amber300,
    },
    appBar: {
        height: 50,
    },
    /*listItem: {
        rightIconColor: amber500,
    },*/
});

const App = () =>
    <MuiThemeProvider muiTheme={muiTheme}>
        <div>
            <Main />
            {/*<MyAwesomeReactComponent />*/}
        </div>
    </MuiThemeProvider>;

export default App;
