import React from 'react';
import { ListItem, Left, Body, Right, Text, Button, Icon} from 'native-base';

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
                <Button transparent>
                    <Icon type="Feather" name='more-vertical' />
                </Button>
            </Right>
        </ListItem>
    );
};

export default Word;