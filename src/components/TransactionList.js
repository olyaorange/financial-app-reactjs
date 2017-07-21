import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Avatar from 'material-ui/Avatar';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import {red500, green500} from 'material-ui/styles/colors';

const TransactionList = (props) => {
    let handleClickDeleteTransaction = (item) => {
        props.onHandleDeleteClick(item);
    };

    let formatDate = dateMs => {
        let date = new Date(dateMs);
        let d = date.getDate(),
            m = date.getMonth() + 1,
            y = date.getFullYear();

        return d + '/' + m + '/' + y;
    };

    return (
        <List>
            {props.transactions.map((item, index) => (
                <ListItem
                    key={+item.date}
                    leftAvatar={
                        <Avatar
                            backgroundColor={item.category === 1 ? red500 : green500}
                            icon={item.category === 1
                                ? <ContentRemoveCircleOutline/>
                                : <ContentAddCircleOutline/>}
                        />
                    }
                    rightIcon={<ActionDelete onClick={handleClickDeleteTransaction.bind(null, item)}/>}
                    primaryText={item.category === 1 ? '-' + item.entry : item.entry}
                    secondaryText={formatDate(item.date)}
                    //secondaryText={item.date}
                    className={item.category === 1 ? 'itemOutcome' : 'itemIncome'}
                />
            ))}
        </List>
    )
};

export default TransactionList;