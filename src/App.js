import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import CategoryDetail from './components/CategoryDetail';
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
        <Router history="BrowserHistory">
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/detail/:id" component={CategoryDetail} />
                <Route render={() => <p>Not Found</p>} />
            </Switch>
        </Router>
    </MuiThemeProvider>;

export default App;
