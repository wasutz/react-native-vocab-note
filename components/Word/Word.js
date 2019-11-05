import React from 'react';
import { ListItem, Left, Body, Right, Text, Button, Icon, ActionSheet} from 'native-base';
import VocabConfig from '../../configs/VocabConfig';

const Word = ({vocab, navigation}) => {
    return (
        <ListItem>
            <Left>
                <Body>
                <Text>{vocab.word}</Text>
                <Text note>{vocab.meaning}</Text>
                </Body>
            </Left>
            <Right>
                <Button transparent onPress={() =>
                    ActionSheet.show(
                    {
                        options: VocabConfig.OPTIONS,
                        title: `Word: ${vocab.word}`
                    },
                    buttonIndex => {
                        if (VocabConfig.OPTIONS[buttonIndex] === 'Edit') {
                            navigation.navigate('EditVocab', {vocab});
                        } else if (VocabConfig.OPTIONS[buttonIndex] === 'Delete') {
                            console.log("Show delete modal: " + vocab.id);
                        }
                    }
                )}>
                    <Icon type="Feather" name='more-vertical' />
                </Button>
            </Right>
        </ListItem>
    );
};

export default Word;