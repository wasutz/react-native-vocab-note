import React from 'react';
import {observer} from 'mobx-react';
import { Container, Content, List, Toast, Spinner, View} from 'native-base';
import VocabStore from '../../stores/VocabStore';
import Word from '../../components/Word/Word';
import HeaderIcon from '../../components/HeaderIcon/HeaderIcon';

class MainPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Vocab Note',
      headerRight: <View style={{flexDirection: 'row'}}>
        <HeaderIcon onPress={() => navigation.navigate('AddVocab')} type="Entypo" name="new-message" />
        <HeaderIcon onPress={() => navigation.navigate('Profile')} type="MaterialIcons" name="person" />
      </View>
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
    const {vocabs, isLoadingVocabs} = VocabStore;

    return (
      <Container>
        <Content>
          <List>
            {vocabs.map(vocab => (
              <Word key={vocab.id} vocab={vocab} navigation={this.props.navigation}/>
            ))}
          </List>

          {isLoadingVocabs && (<Spinner />)}
        </Content>
      </Container>
    );
  }
}

export default observer(MainPage);