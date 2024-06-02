import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator , Linking} from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';

const AWSLogin = ({ navigation }) => {
  const [loginUrl, setLoginUrl] = React.useState(null);

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const response = await axios.get('https://frozen-reaches-78866-065338a00b00.herokuapp.com/api/cloudAuth/awsLoginUrl');
        setLoginUrl(response.data.url);
      } catch (error) {
        console.error('Error fetching login URL:', error);
      }
    };

    fetchLoginUrl();

      const handleDeepLink = (event) => {
          const url = event.url;
          console.log(event.url); // Log to see if the event is captured
          const urlParams = new URLSearchParams(url.split('?')[1]);
          const status = urlParams.get('status');
          if (status === 'success') {
            navigation.navigate('Dashboard');
          }
        };

       // Add the deep link listener
         const deepLinkSubscription = Linking.addEventListener('url', handleDeepLink);

        // Handle the initial URL
            Linking.getInitialURL().then((url) => {
                if (url) handleDeepLink({ url });
            }).catch(err => console.error('An error occurred', err));

        return () => {
           deepLinkSubscription.remove();
        };
  }, [navigation]);

  if (!loginUrl) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

   return(
             <View style={{ flex: 1 }}>
               <WebView
                 source={{ uri: loginUrl }}
                 onNavigationStateChange={(event) => {
                   if (event.url.includes('yourapp://callback?status=success')) {
                     navigation.navigate('Dashboard');
                   }
                 }}
               />
             </View>
           );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AWSLogin;
