import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import UserStore from '../../stores/UserStore';

class LoadingPage extends React.Component {
  componentDidMount() {
    this.props.navigation.navigate(UserStore.isAuthenticated ? 'App' : 'Auth');
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default LoadingPage;