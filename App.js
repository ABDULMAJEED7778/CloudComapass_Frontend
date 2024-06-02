import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
//import { View, StyleSheet } from 'react-native';
//import ProviderSelectionScreen from './android/app/src/main/res/Screens/ProviderSelectionScreen';
//import SignUpScreen from './android/app/src/main/res/Screens/SignUpScreen';
//import Dashboard from './android/app/src/main/res/Screens/Dashboard';
//import LoginScreen from './android/app/src/main/res/Screens/LoginScreen';
//import StartingScreen from './android/app/src/main/res/Screens/StartingScreen';
//import SplashScreen from './android/app/src/main/res/Screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './android/app/src/main/res/navigation/MainNavigator';


//import { createStackNavigator } from '@react-navigation/stack';
//import AWSLogin from './android/app/src/main/res/Screens/AWSLogin';
//import AzureLogin from './android/app/src/main/res/Screens/AzureLogin';
//import GoogleCloudLogin from './android/app/src/main/res/Screens/GoogleCloudLogin';
//import AlibabaLogin from './android/app/src/main/res/Screens/AlibabaLogin';
//import { Linking } from 'react-native';
//import WaitingPage from './android/app/src/main/res/Screens/WaitingPage';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { Icon } from 'react-native-elements';
//import CompassAI from './android/app/src/main/res/Screens/compassAI';
//import RecommendationPage from './android/app/src/main/res/Screens/RecommendationPage';
//import FutureAnalysis from './android/app/src/main/res/Screens/FutureAnalysis';



//const Tab = createBrottomTabNavigator();
//const Stack = createStackNavigator();
//
//const linking = {
//  prefixes: ['yourapp://'],
//  config: {
//    screens: {
//      Dashboard: 'callback',
//    },
//  },
//};

const loadFonts = () => {
  return Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Bayon-Regular': require('./assets/fonts/Bayon-Regular.ttf'),
  });
};

function App() {
      const [fontsLoaded, setFontsLoaded] = useState(false);
       useEffect(() => {
           async function loadResourcesAndDataAsync() {
             try {
               await loadFonts();
             } catch (e) {
               console.warn(e);
             } finally {
               setFontsLoaded(true);
               SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
             }
           }

           loadResourcesAndDataAsync();
         }, []);

         if (!fontsLoaded) {
           return null; // Render nothing while fonts are loading
         }

//    <NavigationContainer>
//              <Tab.Navigator
//                screenOptions={({ route }) => ({
//                  tabBarIcon: ({ color, size }) => {
//                    let iconName;
//                    if (route.name === 'Dashboard') {
//                      iconName = 'mdiViewDashboard';
//                    } else if (route.name === 'Recommendations') {
//                      iconName = 'mdiNotificationClearAll';
//                    } else if (route.name === 'Future Analytics') {
//                      iconName = 'mdiGoogleAnalytics';
//                    } else if (route.name === 'CompassAI') {
//                      iconName = 'mdiRobotHappy';
//                    }
//                    return <Icon name={iconName} type="material-community" color={color} size={size} />;
//                  },
//                })}
//                tabBarOptions={{
//                  activeTintColor: '#6200EE',
//                  inactiveTintColor: 'gray',
//                }}
//              >
//                <Tab.Screen name="Dashboard" component={Dashboard} />
//                <Tab.Screen name="Recommendations" component={RecommendationPage} />
//                <Tab.Screen name="Future Analytics" component={FutureAnalysis} />
//                <Tab.Screen name="CompassAI" component={CompassAI} />
//              </Tab.Navigator>
//            </NavigationContainer>
  return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
//    <NavigationContainer linking={linking}>
//      <Stack.Navigator initialRouteName="SignUp">
//        <Stack.Screen name="SignUp" component={SignUpScreen} />
//        <Stack.Screen name="Login" component={LoginScreen} />
//        <Stack.Screen name="Dashboard" component={Dashboard} />
//        <Stack.Screen name="ProviderSelection" component={ProviderSelectionScreen} />
//         <Stack.Screen name="AWSLogin" component={AWSLogin} />
//         <Stack.Screen name="WaitingPage" component={WaitingPage} />
//         <Stack.Screen name="AzureLogin" component={AzureLogin} />
//         <Stack.Screen name="GoogleCloudLogin" component={GoogleCloudLogin} />
//         <Stack.Screen name="AlibabaLogin" component={AlibabaLogin} />
//      </Stack.Navigator>
//    </NavigationContainer>
  );
}

export default App;

