import React from 'react';
import { Container, Button, Content, Form, Item, Input, Text, Toast, Spinner } from 'native-base';
import styles from './LoginPage.style';
import UserStore from '../../stores/UserStore';
import {observer} from 'mobx-react';

class LoginPage extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  login = () => {
      UserStore.login(this.state.email, this.state.password).then(() => {
        this.props.navigation.navigate('App')
      }).catch(ex => {
        const message = ex.response.status >= 500 ? 'Something went wrong.' : 'Invalid username or password';
        Toast.show({
          text: message,
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        });
      });
  };

  render() {
    const {isAuthenticating} = UserStore;

    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.title}>Vocab Note</Text>
          <Form style={styles.form}>
            <Item>
              <Input
                placeholder='Email'
                value={this.state.email}
                onChangeText={value => this.setState({ email: value })}/>
            </Item>
            <Item last>
              <Input 
                placeholder='Password'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={value => this.setState({ password: value })} />
            </Item>
          </Form>
          <Button block onPress={this.login} disabled={isAuthenticating}>
            <Text>Log In</Text>
          </Button>

          {isAuthenticating && (<Spinner />)}
        </Content>
      </Container>
    );
  }
}

export default observer(LoginPage);