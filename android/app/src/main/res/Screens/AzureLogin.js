import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TextInput, Button, ScrollView, Alert, Linking  } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AzureLogin = ({ navigation }) => {
  const [loginUrl, setLoginUrl] = useState(null);
  const [tenantId, setTenantId] = useState('');
  const [clientId, setClientId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
//  const [uid, setUid] = useState('');
  const redirectUri = "https://frozen-reaches-78866-065338a00b00.herokuapp.com/api/cloudAuth/azure-callback"


//  useEffect(() => {
//    const fetchLoginUrl = async () => {
//      try {
//        const response = await axios.get('https://frozen-reaches-78866-065338a00b00.herokuapp.com/api/cloudAuth/azureLoginUrl');
//        setLoginUrl(response.data.url);
//      } catch (error) {
//        console.error('Error fetching login URL:', error);
//      }
//    };
//    const getUserUid = async () => {
//          const storedUid = await AsyncStorage.getItem('uid');
//          setUid(storedUid);
//          console.log(uid);
//        };
//
//    fetchLoginUrl();
//    getUserUid();
//  }, []);

  const fetchLoginUrl = async () => {
             try {
               url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=openid%20profile%20User.Read&state=12345`
               setLoginUrl(url);
             } catch (error) {
               console.error('Error fetching login URL:', error);
             }
           };
  const handleLogin = () => {
        if (loginUrl) {
          Linking.openURL(loginUrl);
        }
  };

  const handleSubmit = async () => {
    const uid = await AsyncStorage.getItem('uid');
    let data = JSON.stringify({
      "tenantId": tenantId,
      "clientId": clientId,
      "subscriptionId": subscriptionId,
      "redirectUri": redirectUri,
      "uid": uid
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://frozen-reaches-78866-065338a00b00.herokuapp.com/api/cloudAuth/azureFields',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    try {
       const response = await axios.request(config);
      if (response.data.status === 'success') {
        Alert.alert('Success', 'Cost report retrieved successfully');
        fetchLoginUrl();
      } else {
        Alert.alert('Error', 'Failed to retrieve cost report');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Failed to submit data');
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Azure Integration Instructions</Text>
      <Text style={styles.instructions}>
        Follow these steps to register your app in Microsoft Azure and provide the required details:
      </Text>
      <Text style={styles.step}>1. Go to the Azure portal and navigate to Azure Active Directory.</Text>
      <Text style={styles.step}>2. Click on "App registrations" and then "New registration".</Text>
      <Text style={styles.step}>3. Enter the name as "CloudCompass" and add the redirect URL as "https://frozen-reaches-78866-065338a00b00.herokuapp.com/api/cloudAuth/azure-callback"</Text>
      <Text style={styles.step}>4. After registration, note down the Application (client) ID and Directory (tenant) ID.</Text>
      <Text style={styles.step}>5. Navigate to your subscription and copy the Subscription ID.</Text>

      <Text style={styles.inputLabel}>Tenant ID:</Text>
      <TextInput
        style={styles.input}
        value={tenantId}
        onChangeText={setTenantId}
        placeholder="Enter Tenant ID"
      />
      <Text style={styles.inputLabel}>Client ID:</Text>
      <TextInput
        style={styles.input}
        value={clientId}
        onChangeText={setClientId}
        placeholder="Enter Client ID"
      />
      <Text style={styles.inputLabel}>Subscription ID:</Text>
      <TextInput
        style={styles.input}
        value={subscriptionId}
        onChangeText={setSubscriptionId}
        placeholder="Enter Subscription ID"
      />

      <Button title="Submit" onPress={handleSubmit} />
      {loginUrl && (
        <Button style={styles.loginButton} title="Login with Azure" onPress={handleLogin} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButton: {
  backgroundColor: "#"}
});

export default AzureLogin;
