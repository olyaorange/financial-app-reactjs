import React from 'react';
import Avatar from 'material-ui/Avatar';
import {red500, green500, white} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    avatar: {
        position: 'absolute',
        top: 16,
        left: 16
    }
};

const AvatarCategoryIcon = (props) => (
    <Avatar
        style={styles.avatar}
        backgroundColor={props.itemOperation === 'outcome' ? red500 : green500}
    >
        <FontIcon className="material-icons"
                  color={white}>{props.iconName}</FontIcon>
    </Avatar>
);

export default AvatarCategoryIcon;