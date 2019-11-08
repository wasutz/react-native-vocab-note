import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import AuthStore from '../../stores/AuthStore';

class LoadingPage extends React.Component {
  componentDidMount() {
    this.props.navigation.navigate(AuthStore.isAuthenticated ? 'App' : 'Auth');
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