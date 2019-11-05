import React from 'react';
import { ListItem, Left, Body, Right, Text, Button, Icon, ActionSheet} from 'native-base';
import VocabConfig from '../../configs/VocabConfig';

const Word = props => {
    return (
        <ListItem>
            <Left>
                <Body>
                <Text>{props.vocab.word}</Text>
                <Text note>{props.vocab.meaning}</Text>
                </Body>
            </Left>
            <Right>
                <Button transparent onPress={() =>
                    ActionSheet.show(
                    {
                        options: VocabConfig.OPTIONS,
                        title: `Word: ${props.vocab.word}`
                    },
                    buttonIndex => {
                        if (VocabConfig.OPTIONS[buttonIndex] === 'Edit') {
                            console.log("Go to edit page: " + props.vocab.id);
                        } else if (VocabConfig.OPTIONS[buttonIndex] === 'Delete') {
                            console.log("Show delete modal: " + props.vocab.id);
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