import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import { StyledView } from '../components/Views';
import LauncherMainScreen from '../screens/LauncherMainScreen';
import {
  isDevMenuAvailable,
  isLoggedInAsync,
  addUserLoginListener,
  addUserLogoutListener,
} from './../DevMenu';

function LauncherApp(props) {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  React.useEffect(() => {
    let onLogin;
    let onLogout;

    if (isDevMenuAvailable) {
      onLogin = addUserLoginListener(() => setIsUserLoggedIn(true));
      onLogout = addUserLogoutListener(() => setIsUserLoggedIn(false));
      isLoggedInAsync().then(isUserLogin => {
        setIsUserLoggedIn(isUserLogin);
      });
    }

    return () => {
      onLogin?.remove();
      onLogout?.remove();
    };
  });

  return (
    <SafeAreaView style={styles.rootView}>
      <StyledView style={styles.rootView}>
        <StatusBar barStyle="dark-content" />
        <LauncherMainScreen {...props} isUserLoggedIn={isUserLoggedIn} />
      </StyledView>
    </SafeAreaView>
  );
}

export default class LauncherRootApp extends React.PureComponent<any, any> {
  render() {
    return <LauncherApp {...this.props} />;
  }
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
