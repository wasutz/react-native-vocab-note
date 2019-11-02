import React from 'react';
import { Container, Header, Button, Content, Form, Item, Input, Text } from 'native-base';
import styles from './LoginPage.style';

class LoginPage extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  login = () => {
    this.props.navigation.navigate('App')
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.title}>Vocab Note</Text>
          <Form>
            <Item>
              <Input placeholder="Email" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
          </Form>
          <Button block onPress={this.login}>
            <Text>Log In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default LoginPage;