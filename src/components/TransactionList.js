import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
//import {red500, green500} from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import AvatarCategoryIcon from './AvatarCategoryIcon'
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
            {props.transactions.map((item, index) => {
                let categoryName, categoryIcon;
                categories.map(elem => {
                    if (elem.id === item.category) {
                        categoryName = elem.name;
                        categoryIcon = elem.icon;
                    }
                });

                return (
                    <ListItem
                        key={+item.date}
                        leftAvatar={<AvatarCategoryIcon iconName={categoryIcon} itemOperation={item.operation}/>}
                        rightIcon={<ActionDelete onClick={handleClickDeleteTransaction.bind(null, item)}/>}
                        secondaryText={formatDate(item.date)}
                    >
                        <Link to={'/detail/' + item.category}>
                            <div style={styles.categoryStyle}>
                                {categoryName}
                            </div>
                            <div className={item.operation === 'outcome' ? 'itemOutcome' : 'itemIncome'}
                                 style={styles.sumStyle}
                            >
                                {item.operation === 'outcome' ? '-' + item.entry : item.entry} $
                            </div>
                        </Link>
                    </ListItem>
                )
            })}
        </List>
    )
};

export default TransactionList;