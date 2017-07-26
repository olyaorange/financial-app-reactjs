import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import AvatarCategoryIcon from './AvatarCategoryIcon';
import {formatDate} from '../utils/utils.js';
import categories from '../utils/categories.json';

const styles = {
    sumStyle: {
        display: 'inline-block',
        marginTop: 9,
        marginBottom: -9,
        marginRight: 20,
        float: 'right',
        verticalAlign: 'top',
    },
    categoryStyle: {
        display: 'inline-block',
    },
};

const TransactionFullList = (props) => (
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
                    rightIcon={<ActionDelete onClick={props.handleClickDeleteTransaction.bind(null, item)}/>}
                    secondaryText={formatDate(item.date)}
                >
                    <Link className="common-link" to={'/' + item.category}>
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
);

export default TransactionFullList;