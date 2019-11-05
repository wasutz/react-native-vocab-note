import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Root } from 'native-base';
import LoginPage from './containers/LoginPage/LoginPage';
import MainPage from './containers/MainPage/MainPage';
import LoadingPage from './containers/LoadingPage/LoadingPage';
import AddVocabPage from './containers/AddVocabPage/AddVocabPage';
import EditVocabPage from './containers/EditVocabPage/EditVocabPage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginPage
  }
});

const AppStack = createStackNavigator({
  Main: {
    screen: MainPage
  },
  AddVocab: {
    screen: AddVocabPage
  },
  EditVocab: {
    screen: EditVocabPage
  }
});

const AppNavigator = createSwitchNavigator({
  Loading: {
    screen: LoadingPage
  },
  Auth: {
    screen: AuthStack
  },
  App: {
    screen: AppStack
  }
});

const AppContainer = createAppContainer(AppNavigator);
