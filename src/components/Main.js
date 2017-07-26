import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';

import TransactionList from './TransactionList';
import {countTransactionSum} from '../utils/utils.js';
import categories from '../utils/categories.json';

const styles = {
    floatingButton: {
        float: 'right',
        marginRight: 20,
        marginTop: -20,
        position: 'relative',
        zIndex: 10000,
    },
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

let updateLocalStorage = (_this) => {
    let transactions = JSON.stringify(_this.state.transactions);
    localStorage.setItem('transactions', transactions);
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            openDialog: false,
            operation: 'outcome',
            category: '0001',
            entry: '',
            transactions: [],
            errorText: ''
        };
    }

    //componentWillMount() {}
    componentDidMount() {
        let localTransactions = JSON.parse(localStorage.getItem('transactions'));
        if (localTransactions) {
            this.setState({
                transactions: localTransactions,
                total: countTransactionSum(localTransactions)
            });
        }
    }

    componentDidUpdate() {
        updateLocalStorage(this);
    }

    handleOpenDialog = () => {
        this.setState({openDialog: true});
    };

    handleCloseDialog = () => {
        this.setState({openDialog: false});
    };

    handleChangeOperation = (value) => {
        this.setState({
            operation: value,
        });

        if (value === 'outcome' && this.state.category.charAt(0) !== '0' ) {
            this.setState({
                category: '0001',
            });
        } else if (value === 'income' && this.state.category.charAt(0) !== '1'){
            this.setState({
                category: '1001',
            });
        }
    };

    handleChangeCategory = (event, index, value) => this.setState({category: value});

    handleChangeAddEntry = (event, newValue) => {
        this.setState({entry: newValue});
    };

    handleDeleteTransaction = (deletedItem) => {
        let array = this.state.transactions.filter(item => item !== deletedItem);
        this.setState({
            transactions: array,
            total: countTransactionSum(array)
        });
    };

    handleSubmitAddTransactionDialog = () => {
        if (this.state.entry !== '0' && this.state.entry !== '') {
            let array = this.state.transactions;
            array.push({
                'operation': this.state.operation,
                'entry': this.state.entry,
                'date': Date.now(),
                'category': this.state.category,
            });

            this.setState({
                transactions: array,
                entry: '',
                total: countTransactionSum(array),
                openDialog: false,
                errorText: ''
            });
            updateLocalStorage(this);
        } else {
            this.setState({
                errorText: 'Enter a value'
            });
        }
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseDialog}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSubmitAddTransactionDialog}
            />,
        ];

        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title={'Balance: ' + this.state.total.toFixed(2)}
                />
                <FloatingActionButton
                    mini={true}
                    secondary={true}
                    style={styles.floatingButton}
                    onClick={this.handleOpenDialog}
                >
                    <ContentAdd/>
                </FloatingActionButton>
                <TransactionList
                    transactions={this.state.transactions}
                    onHandleDeleteClick={this.handleDeleteTransaction}
                />
                <Dialog
                    title="Add a transaction"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleCloseDialog}
                >
                    <Tabs
                        value={this.state.operation}
                        onChange={this.handleChangeOperation}
                    >
                        <Tab label="Outcome" value="outcome">
                            <div>
                                <SelectField
                                    floatingLabelText="Choose the category"
                                    value={this.state.category}
                                    onChange={this.handleChangeCategory}
                                >
                                    {categories.map((item, index) => (
                                        item.operation === 'outcome' &&
                                        <MenuItem value={item.id}
                                                  primaryText={item.name}
                                                  key={item.id}
                                        />
                                    ))}
                                </SelectField>
                            </div>
                        </Tab>
                        <Tab label="Income" value="income">
                            <div>
                                <SelectField
                                    floatingLabelText="Choose the category"
                                    value={this.state.category}
                                    onChange={this.handleChangeCategory}
                                >
                                    {categories.map((item, index) => (
                                        item.operation === 'income' &&
                                        <MenuItem value={item.id}
                                                  primaryText={item.name}
                                                  key={item.id}
                                        />
                                    ))}
                                </SelectField>
                            </div>
                        </Tab>
                    </Tabs>
                    <TextField
                        hintText="0"
                        floatingLabelText="Enter Sum"
                        type="number"
                        onChange={this.handleChangeAddEntry}
                        errorText={this.state.errorText}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Main;
