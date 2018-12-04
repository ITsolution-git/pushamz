import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import WelcomeScreen from './src/components/WelcomeScreen';
import userReducer from './src/reducers';

import Login from './src/components/login';
import SignInPassword from './src/components/login/SignInPassword';



import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

import OneSignal from 'react-native-onesignal';

const store = createStore(userReducer, compose(applyMiddleware(thunk)));

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#ddd'}}>
          <AppNavigator />
        </SafeAreaView>
      </Provider>
    );
  }
}

////  SIGN IN STACK / START --------------------------------------------------------------

const SignInStack = StackNavigator(
  {
    Login: { screen: Login },
    SignInPassword: { screen: SignInPassword },
  },
  {
    headerMode: 'none',
  }
);

////  ROOT STACK / START------------------------------------>


const AppNavigator = StackNavigator({
  SignInStack: { screen: SignInStack },
  WelcomeScreen: { screen: WelcomeScreen },

}, {
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});


////  ROOT STACK / END ------------------------------------>

const styles = StyleSheet.create({
  container: {

  },
});

var storage = new Storage({
  // maximum capacity, default 1000 
  size: 1000,

  // Use AsyncStorage for RN, or window.localStorage for web.
  // If not set, data would be lost after reload.
  storageBackend: AsyncStorage,
  
  // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,
  
  // cache data in the memory. default is true.
  enableCache: true,
  
  // if data was not found in storage or expired,
  // the corresponding sync method will be invoked and return 
  // the latest data.
  sync : {
    // we'll talk about the details later.
  }
});
global.storage = storage;