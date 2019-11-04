import React from 'react';
import { Container, Content, Text} from 'native-base';

class AddVocabPage extends React.Component {
  static navigationOptions = {
    title: 'Add new vocab',
  };

  render() {
    return (
      <Container>
        <Content>
          <Text>Add New</Text>
        </Content>
      </Container>
    );
  }
}

export default AddVocabPage;