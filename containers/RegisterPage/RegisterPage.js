import React from 'react';
import { Container, Button, Content, Form, Item, Input, Text, Toast, Spinner, View } from 'native-base';
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
    AuthStore.register(email, username, password).then(() => {
      this.props.navigation.goBack();
    }).catch(ex => {
      if (ex.response.status >= 500) {
        Toast.show({
          text: 'Something went wrong',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        });
      }
    });
  }

  onChangeInput = (key, value) => {
    this.setState({ [key]: value });
    AuthStore.removeErrorDescriptionItem(key);
  };

  render() {
    const {isAuthenticating, errorDescription} = AuthStore;

    return (
      <Container style={styles.container}>
        <Content>
          <Form style={styles.form}>
            <Item error={Boolean(errorDescription.email)}>
              <Input
                placeholder='Email'
                value={this.state.email}
                onChangeText={value => this.onChangeInput('email', value)}/>
            </Item>
            <View style={errorDescription.email ? styles.errorMessageItem : styles.hidden}>
              <Text style={styles.errorMessageText}>{errorDescription.email}</Text>
            </View>

            <Item error={Boolean(errorDescription.username)}>
              <Input
                placeholder='Username'
                value={this.state.username}
                onChangeText={value =>  this.onChangeInput('username', value)}/>
            </Item>
            <View style={errorDescription.username ? styles.errorMessageItem : styles.hidden}>
              <Text style={styles.errorMessageText}>{errorDescription.username}</Text>
            </View>

            <Item error={Boolean(errorDescription.password)} last>
              <Input
                placeholder='Password'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={value => this.onChangeInput('password', value)} />
            </Item>
            <View style={errorDescription.password ? styles.errorMessageItem : styles.hidden}>
              <Text style={styles.errorMessageText}>{errorDescription.password}</Text>
            </View>
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