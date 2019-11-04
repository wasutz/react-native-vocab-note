import React from 'react';
import {observer} from 'mobx-react';
import { Container, Content, Text, Form, Item, Button, Input, Toast, Spinner } from 'native-base';
import styles from './AddVocabPage.style';
import VocabStore from '../../stores/VocabStore';

class AddVocabPage extends React.Component {
  static navigationOptions = {
    title: 'Add new vocab',
  };

  constructor(props) {
    super(props);
    this.state = {
      word: '',
      meaning: ''
    };
  }

  addNewVocab = () => {
    const {word, meaning} = this.state;
    if (!word || !meaning) {
        Toast.show({
            text: 'Word and Meaning cannot be empty',
            buttonText: 'Okay',
            type: 'danger',
            duration: 3000
        });

        return;
    }

    VocabStore.addNewVocab(word, meaning).then(() => {
        this.props.navigation.goBack();
    }).catch(ex => {
        console.log(ex.response.status);
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

            <Button block onPress={this.addNewVocab} style={styles.addButton} disabled={isLoadingVocabs}>
                <Text>Add vocab</Text>
            </Button>

            {isLoadingVocabs && (<Spinner />)}
        </Content>
      </Container>
    );
  }
}

export default observer(AddVocabPage);