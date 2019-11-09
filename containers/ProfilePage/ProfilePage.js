import React from 'react';
import _ from 'lodash';
import { Container, Button, Content, Form, Item, Input, Text, Label, Spinner, Footer, FooterTab } from 'native-base';
import styles from './ProfilePage.style';
import UserStore from '../../stores/UserStore';
import AuthStore from '../../stores/AuthStore';
import {observer} from 'mobx-react';

class ProfilePage extends React.Component {
  static navigationOptions = {
    title: 'Profile'
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    UserStore.getUser();
  }

  logout = () => {
    AuthStore.logout().then(() => {
        this.props.navigation.navigate('Auth');
    })
  }

  render() {
    const {isGettingUser, user} = UserStore;

    return (
      <Container>
        <Content style={styles.content}>
          <Form style={styles.form}>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                placeholder='Email'
                value={_.get(user, 'email', '')}
                disabled/>
            </Item>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                placeholder='Username'
                value={_.get(user, 'username', '')}
                disabled/>
            </Item>
          </Form>
          {isGettingUser && (<Spinner />)}
        </Content>
        <Footer>
            <FooterTab>
                <Button danger full onPress={this.logout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default observer(ProfilePage);