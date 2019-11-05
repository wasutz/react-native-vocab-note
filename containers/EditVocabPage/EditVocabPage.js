import React from 'react';
import {observer} from 'mobx-react';
import { Container, Content, Text, Form, Item, Button, Input, Toast, Spinner } from 'native-base';
import styles from './EditVocabPage.style';
import VocabStore from '../../stores/VocabStore';

class EditVocabPage extends React.Component {
  static navigationOptions = {
    title: 'Edit vocab',
  };

  constructor(props) {
    super(props);
    const vocab = props.navigation.getParam('vocab');
    this.state = {
      id: vocab.id,
      word: vocab.word,
      meaning: vocab.meaning
    };
  }

  updateVocab = () => {
    const {id, word, meaning} = this.state;
    if (!word || !meaning) {
        Toast.show({
            text: 'Word and Meaning cannot be empty',
            buttonText: 'Okay',
            type: 'danger',
            duration: 3000
        });

        return;
    }

    VocabStore.updateVocab(id, word, meaning).then(() => {
        this.props.navigation.goBack();
    }).catch(ex => {
        console.log(ex);
        Toast.show({
            text: 'Something went wrong',
            buttonText: 'Okay',
            type: 'danger',
            duration: 3000
          });
    });
  }

  render() {
    const {isLoadingVocabs} = VocabStore;

    return (
      <Container>
        <Content>
            <Form style={styles.form}>
                <Item>
                    <Input
                        placeholder='Word'
                        value={this.state.word}
                        onChangeText={value => this.setState({ word: value })}/>
                </Item>
                <Item last>
                    <Input 
                        placeholder='Meaning'
                        value={this.state.meaning}
                        onChangeText={value => this.setState({ meaning: value })} />
                </Item>
            </Form>

            <Button block onPress={this.updateVocab} style={styles.addButton} disabled={isLoadingVocabs}>
                <Text>Save</Text>
            </Button>

            {isLoadingVocabs && (<Spinner />)}
        </Content>
      </Container>
    );
  }
}

export default observer(EditVocabPage);