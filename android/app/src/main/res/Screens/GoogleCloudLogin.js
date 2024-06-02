import React, { useEffect }  from 'react';
import { useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import { WebView } from 'react-native-webview';

const GoogleCloudLogin = () => {
 const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('https://frozen-reaches-78866-065338a00b00.herokuapp.com/api/cloudAuth/google-cloud-costs');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      );
    }

    if (!data) {
      return (
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Google Cloud Cost Report</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.preformattedText}>{JSON.stringify(data, null, 2)}</Text>
        </ScrollView>
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

export default GoogleCloudLogin;
