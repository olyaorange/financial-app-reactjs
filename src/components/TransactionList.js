import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';

import TransactionFullList from './TransactionFullList';
import TransactionCategoryList from './TransactionCategoryList';


const TransactionList = (props) => {
    let handleClickDeleteTransaction = (item) => {
        props.onHandleDeleteClick(item);
    };
    let localTransactions = props.transactions;

    // Wrapper for TransactionCategoryList component
    // for passing all the parent's component props and Route props
    const TransactionCategoryListWrapper = (props) => {
        return (
            <TransactionCategoryList
                handleClickDeleteTransaction={handleClickDeleteTransaction}
                transactions={localTransactions}
                {...props}
            />
        );
    };

    return (
        <Router history="BrowserHistory">
            <Switch>
                <Route exact path={"/"}
                       component={() => <TransactionFullList transactions={props.transactions}
                                                             handleClickDeleteTransaction={handleClickDeleteTransaction}/>}/>
                <Route path="/:id" component={TransactionCategoryListWrapper}/>
                <Route render={() => <p>Not Found</p>}/>
            </Switch>
        </Router>
    )
};

export default TransactionList;