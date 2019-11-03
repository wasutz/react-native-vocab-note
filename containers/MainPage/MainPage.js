import React from 'react';
import { Container, Text, Toast } from 'native-base';
import VocabStore from '../../stores/VocabStore';
import {observer} from 'mobx-react';

class MainPage extends React.Component {
  static navigationOptions = {
    title: 'Vocab Note'
  };

  componentDidMount() {
    VocabStore.getVocabs().catch(ex => {
      if (ex.response.status === 401) {
        this.props.navigation.navigate('Auth');
      } else {
        Toast.show({
          text: 'Something went wrong',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        });
      }
    });
  }

  render() {
    const {vocabs} = VocabStore;

    return (
      <Container>
        {vocabs.map(vocab => (
          <Text key={vocab.id}>{vocab.word}</Text>
        ))}
      </Container>
    );
  }
}

export default observer(MainPage);