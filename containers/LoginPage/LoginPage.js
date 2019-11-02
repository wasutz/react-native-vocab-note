import React from 'react';
import { Container, Button, Content, Form, Item, Input, Text, Toast } from 'native-base';
import {login} from '../../services/UserService';
import {AsyncStorage} from 'react-native';
import styles from './LoginPage.style';

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

  login = async () => {
    try {
      const response = await login(this.state.email, this.state.password);
      await AsyncStorage.setItem('ACCESS_TOKEN', response.data.token);

      this.props.navigation.navigate('App')
    } catch (ex) {
      Toast.show({
        text: 'Invalid username or password',
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000
      });
    }
  };

  render() {
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
          <Button block onPress={this.login}>
            <Text>Log In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default LoginPage;