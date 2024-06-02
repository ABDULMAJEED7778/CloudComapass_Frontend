import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import axios from 'axios';




const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();


    const handleSignUp = () => {
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (!email.includes('@')) {
        alert('Please enter a valid email address!');
        return;
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
      }


//        fetch('http://localhost:3000/api/users/signup', {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json',
//        },
//        body: JSON.stringify({
//          username: username,
//          email: email,
//          password: password,
//        }),
//      })
//      .then(response => {
//        if (response.ok) {
//          return response.json();
//        } else {
//          throw new Error('Something went wrong on server side!');
//        }
//      })
//      .then(data => {
//        console.log('Success:', data);
////        navigation.navigate('LoginScreen'); // Ensure this navigation logic is correct
////        // Optionally show success message or directly log the user in instead of navigating to login
////      })
////      .catch((error) => {
////        console.error('Error:', error);
////        alert('Failed to create account: ' + error.message); // Show user-friendly error message
////      });
//    };

         axios({
                   method: 'post',
                   url: 'https://frozen-reaches-78866-065338a00b00.herokuapp.com/api/users/signup',
                   headers: { 'Content-Type': 'application/json' },
                   data: { username, email, password }
               })
               .then(response => {
                   console.log('Success:', response.data);
                   navigation.replace('Login');
               })
               .catch(error => {
                   console.error('Error:', error);
                   let errorMessage = error.response ? error.response.data.error : error.message;
                   alert('Failed to create account: ' + errorMessage);
               });
           };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logo}>
                <Image source={require('./../../../../../../assets/images/logo.png')} style={styles.avatar} />
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword}/>
      <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginPageReference}>ALREADY HAVE AN ACCOUNT, LOG IN...</Text>
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
      width: 120,
      height: 120,
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

export default SignUpScreen;
