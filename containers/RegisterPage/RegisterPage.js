import React from 'react';
import { Container, Button, Content, Form, Item, Input, Text, Toast, Spinner } from 'native-base';
import styles from './RegisterPage.style';
import AuthStore from '../../stores/AuthStore';
import {observer} from 'mobx-react';

class RegisterPage extends React.Component {
  static navigationOptions = {
    title: 'Register'
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
  }

  register = () => {
    const {email, username, password} = this.state;
    console.log(email + " D " + username);
    AuthStore.register(email, username, password).then(() => {
      this.props.navigation.goBack();
    }).catch(() => {
        Toast.show({
          text: 'Something went wrong',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        });
    });
  }

  render() {
    const {isAuthenticating} = AuthStore;

    return (
      <Container style={styles.container}>
        <Content>
          <Form style={styles.form}>
            <Item>
              <Input
                placeholder='Email'
                value={this.state.email}
                onChangeText={value => this.setState({ email: value })}/>
            </Item>
            <Item>
              <Input
                placeholder='Username'
                value={this.state.username}
                onChangeText={value => this.setState({ username: value })}/>
            </Item>
            <Item last>
              <Input 
                placeholder='Password'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={value => this.setState({ password: value })} />
            </Item>
          </Form>
          <Button block onPress={this.register} disabled={isAuthenticating}>
            <Text>Register</Text>
          </Button>

          {isAuthenticating && (<Spinner />)}
        </Content>
      </Container>
    );
  }
}

export default observer(RegisterPage);