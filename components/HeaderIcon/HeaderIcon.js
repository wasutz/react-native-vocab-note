import React from 'react';
import { Button, Icon} from 'native-base';
import styles from './HeaderIcon.style';

const HeaderIcon = ({onPress, name, type}) => {
    return (
        <Button transparent onPress={onPress}>
            <Icon name={name} type={type} style={styles.icon} />
        </Button>
    );
};

export default HeaderIcon;