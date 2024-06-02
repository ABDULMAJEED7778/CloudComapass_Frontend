import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Linking } from 'react-native';

const WaitingPage = ({ navigation }) => {
  useEffect(() => {
    const handleDeepLink = (event) => {
      const url = event.url;
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const status = urlParams.get('status');
      if (status === 'success') {
        navigation.navigate('Dashboard');
      }
    };

    Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    }).catch(err => console.error('An error occurred', err));

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Please wait while we process your request...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#000',
  },
});

export default WaitingPage;
