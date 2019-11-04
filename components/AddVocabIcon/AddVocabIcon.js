import React from 'react';
import { Button, Icon} from 'native-base';
import styles from './AddVocabIcon.style';

const AddVocabIcon = ({navigation}) => {
    return (
        <Button transparent onPress={() => navigation.navigate('AddVocab')}>
            <Icon type="Entypo" name="new-message" style={styles.headerIcon} />
        </Button>
    );
};

export default AddVocabIcon;