import React from 'react';
import {observer} from 'mobx-react';
import { Container, Content, List, Toast, Spinner} from 'native-base';
import VocabStore from '../../stores/VocabStore';
import Word from '../../components/Word/Word';
import AddVocabIcon from '../../components/AddVocabIcon/AddVocabIcon';

class MainPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Vocab Note',
      headerRight: <AddVocabIcon navigation={navigation} />
    };
  }

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
    const {vocabs, isFetchingVocabs} = VocabStore;

    return (
      <Container>
        <Content>
          <List>
            {vocabs.map(vocab => (
              <Word key={vocab.id} vocab={vocab} />
            ))}
          </List>

          {isFetchingVocabs && (<Spinner />)}
        </Content>
      </Container>
    );
  }
}

export default observer(MainPage);