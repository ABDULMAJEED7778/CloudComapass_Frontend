import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const StartingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logo}>
                <Image source={require('./../../../../../../assets/images/logo.png')} style={styles.avatar} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.login_button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.login_buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sign_up_button} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.sign_up_buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 40,
    width: 70,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
      width: 150,
      height: 150,
      borderRadius: 20,
      resizeMode: 'contain',
    },
  login_button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#021D46',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 50,
  },
  sign_up_button: {
      width: '80%',
      padding: 15,
      backgroundColor: '#F3F1F1',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 20,
      borderWidth: 1,
      borderColor: '#021D46'
    },
  login_buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  sign_up_buttonText: {
      color: '#021D46',
      fontSize: 16,
    },
});

export default StartingScreen;
