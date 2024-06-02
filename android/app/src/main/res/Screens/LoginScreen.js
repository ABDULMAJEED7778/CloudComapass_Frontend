import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Ensure axios is installed
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
      const navigation = useNavigation();



      const handleLogin = () => {
          if (!usernameOrEmail || !password) {
              Alert.alert("Please enter all fields");
              return;
          }

          axios.post('https://frozen-reaches-78866-065338a00b00.herokuapp.com/api/users/login', {
              usernameOrEmail,
              password
          })
          .then(async (response) => {
              console.log("Login successful:", response.data);
              await AsyncStorage.setItem('isLoggedIn', 'true');
              await AsyncStorage.setItem('isFirstLogin', response.data.navigateTo === 'ProviderPage' ? 'true' : 'false');
              await AsyncStorage.setItem('uid', response.data.uid); // Save the uid in AsyncStorage
              navigation.replace(response.data.navigateTo); // Assuming server response includes where to navigate
          })
          .catch(error => {
              console.error("Login error:", error.response ? error.response.data : error.message);
              Alert.alert("Login Failed", error.response ? error.response.data.message : "An error occurred");
          });

      };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logo}>
                <Image source={require('./../../../../../../assets/images/logo.png')} style={styles.avatar} />
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="Username OR Email" value={usernameOrEmail} onChangeText={setUsernameOrEmail}/>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}  value={password} onChangeText={setPassword}/>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text style={styles.loginPageReference}>Don’t have an account, Sign up...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'

  },
  avatar: {
      width: 150,
      height: 150,
      borderRadius: 20,
      resizeMode: 'contain',
    },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#021D46',
    borderRadius: 8,
    backgroundColor: '#F3F1F1',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#021D46',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  loginPageReference: {
    color:'#021D46',
    fontSize: 16,
    margin:20,
    alignSelf:'flex-start'
  }
});

export default LoginScreen;
