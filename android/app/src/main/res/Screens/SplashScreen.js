import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logo}>
                <Image source={require('./../../../../../../assets/images/logo.png')} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent:'center'
  },
  logo: {
    marginBottom: 40,
    width: 70,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
      width: 200,
      height: 200,
      borderRadius: 20,
      resizeMode: 'contain',
    },
});

export default SplashScreen;
