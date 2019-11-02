import React from 'react';
import { Container, Text } from 'native-base';

class MainPage extends React.Component {
  static navigationOptions = {
    title: 'Vocab Note'
  };

  render() {
    return (
      <Container>
        <Text>Main Page</Text>
      </Container>
    );
  }
}

export default MainPage;