import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Avatar from 'material-ui/Avatar';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import {red500, green500} from 'material-ui/styles/colors';

import categories from '../utils/categories.json';

const styles = {
    sumStyle: {
        display: 'inline-block',
        marginTop: 9,
        marginBottom: -9,
        marginRight: 20,
        float: 'right',
        //marginLeft: '60%',
        verticalAlign: 'top',
    },
    categoryStyle: {
        display: 'inline-block',
    }
};

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
                            backgroundColor={item.operation === 'outcome' ? red500 : green500}
                            icon={item.operation === 'outcome'
                                ? <ContentRemoveCircleOutline/>
                                : <ContentAddCircleOutline/>}
                        />
                    }
                    rightIcon={<ActionDelete onClick={handleClickDeleteTransaction.bind(null, item)}/>}
                    secondaryText={formatDate(item.date)}
                >
                    <div style={styles.categoryStyle}>
                        {categories.map(elem => elem.id === item.category && elem.name)}
                    </div>
                    <div className={item.operation === 'outcome' ? 'itemOutcome' : 'itemIncome'}
                         style={styles.sumStyle}
                    >
                        {item.operation === 'outcome' ? '-' + item.entry : item.entry} $
                        </div>
                </ListItem>
            ))}
        </List>
    )
};

export default TransactionList;