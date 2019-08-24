import React, { Component } from 'react'
import { ActivityIndicator, AsyncStorage, Button, StatusBar, StyleSheet, View } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import Members from './components/Members'
import { DataProvider } from "./data/DataContext";

// for NOT authenticated user
class SignInScreen extends Component {
    static navigationOptions = {
    title: 'Please sign in',
  }

  render() {
    return (
        <View style={styles.container}>
          <Button title="Sign in!" onPress={this._signInAsync} />
        </View>
    )
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

// for authenticated user
// Functional component does not have 'Component' or 'Class' in it.
const HomeScreen = ({ navigation }) => {

    const _showMoreApp = () => {
        navigation.navigate('Other')
    }

    const _signOutAsync = async () => {
        await AsyncStorage.clear() // clear data stored in AsyncStorage
        navigation.navigate('Auth')
    }

    return (
        <View style={styles.container}>
          <Button title="Show me more of the app" onPress={_showMoreApp} />
          <Button title="RSVP Members" onPress={() => navigation.navigate('Members')} />
          <Button title="Actually, sign me out :)" onPress={_signOutAsync} />
        </View>
    )
}

HomeScreen.navigationOptions = () => {
    return {
        title: 'Welcome to the app!',
    }
}

// for authenticated user
class OtherScreen extends Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
        <View style={styles.container}>
          <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
          <StatusBar barStyle="default" />
        </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear(); // clear data stored in AsyncStorage
    this.props.navigation.navigate('Auth');
  };
}

// This is the first screen that loads when the app is opened.
// If user is authenticated then open 'App' screen.  Otherwise open 'Auth'.
class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen, Members: Members });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppContainer = createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack, // is a list of screen when user is authenticated.
      Auth: AuthStack, // shown when user is NOT authenticated.
    },
    {
      initialRouteName: 'AuthLoading',
    }
));

export default function App() {
    return (
        <DataProvider>
            <AppContainer/>
        </DataProvider>
    )
}
