import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import TransactionList from './TransactionList';

const style = {
    float: 'right',
    marginRight: 20,
    marginTop: -20,
    position: 'relative',
    zIndex: 10000,
};

function countTransactionSum(array, fieldName, operation) {
    return array.reduce(function (total, current) {
        if (current[operation] === 1) {
            return +total - +current[fieldName];
        } else {
            return +total + +current[fieldName];
        }
    }, 0);
}

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
            category: 1,
            entry: 0,
            transactions: [],
            lt: []
        };
    }

    componentDidMount() {
        let localTransactions = JSON.parse(localStorage.getItem('transactions'));
        if (localTransactions) {
            this.setState({
                transactions: localTransactions,
                total: countTransactionSum(localTransactions, 'entry', 'category')
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

    handleChangeTransaction = (event, index, value) => this.setState({category: value});

    handleChangeAddEntry = (event, newValue) => {
        this.setState({entry: newValue});
    };

    handleDeleteTransaction = (deletedItem) => {
        let array = this.state.transactions.filter(item => item !== deletedItem);
        this.setState({
            transactions: array,
            total: countTransactionSum(array, 'entry', 'category')
        });
    };

    handleSubmitAddTransactionDialog = () => {
        let array = this.state.transactions;
        array.push({
            'category': this.state.category,
            'entry': this.state.entry,
            'date': Date.now()
        });

        this.setState({
            transactions: array,
            total: countTransactionSum(array, 'entry', 'category'),
            openDialog: false
        });
        updateLocalStorage(this);
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
                    style={style}
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
                    <SelectField
                        floatingLabelText="Choose the category"
                        value={this.state.category}
                        onChange={this.handleChangeTransaction}
                    >
                        <MenuItem value={1} primaryText="Outcome"/>
                        <MenuItem value={2} primaryText="Income"/>
                    </SelectField>
                    <br/>
                    <TextField
                        hintText="0"
                        floatingLabelText="Enter Sum"
                        type="number"
                        onChange={this.handleChangeAddEntry}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Main;
