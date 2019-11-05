import React from 'react';
import { Alert } from 'react-native';
import { ListItem, Left, Body, Right, Text, Button, Icon, ActionSheet} from 'native-base';
import VocabConfig from '../../configs/VocabConfig';
import VocabStore from '../../stores/VocabStore';

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
                            Alert.alert(
                                'Delete vocab?',
                                `Are you sure you want to delete this vocab: ${vocab.word}?`,
                                [
                                  {
                                    text: 'Cancel',
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'Delete',
                                    onPress: () => VocabStore.deleteVocab(vocab)
                                  },
                                ],
                                {cancelable: false},
                            );
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