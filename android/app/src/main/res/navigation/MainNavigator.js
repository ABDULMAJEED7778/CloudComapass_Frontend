import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProviderPage from './../Screens/ProviderSelectionScreen';
import SignUpScreen from './../Screens/SignUpScreen';
import Dashboard from './../Screens/Dashboard';
import LoginScreen from './../Screens/LoginScreen';
import SplashScreen from './../Screens/SplashScreen';
import AWSLogin from './../Screens/AWSLogin';
import AzureLogin from './../Screens/AzureLogin';
import GoogleCloudLogin from './../Screens/GoogleCloudLogin';
import AlibabaLogin from './../Screens/AlibabaLogin';
import WaitingPage from './../Screens/WaitingPage';
import CompassAI from './../Screens/compassAI';
import RecommendationPage from './../Screens/RecommendationPage';
import FutureAnalysis from './../Screens/FutureAnalysis';
import ProfilePage from './../Screens/ProfilePage';
import SettingsPage from './../Screens/SettingsPage';
import FAQPage from './../Screens/FAQPage';
import AboutApp from './../Screens/AboutApp';
import StartingPage from './../Screens/StartingScreen';
import { View , StyleSheet, Image , Text} from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Starting" component={StartingPage} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProviderPage" component={ProviderPage} options={{ headerShown: false }} />
    <Stack.Screen name="MainTabs" component={DrawerNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const MainTabs = ({ navigation }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') {
          iconName = 'view-dashboard';
        } else if (route.name === 'Tips') {
          iconName = 'format-list-checkbox';
        } else if (route.name === 'Forecast') {
          iconName = 'google-analytics';
        } else if (route.name === 'CompassAI') {
          iconName = 'robot-excited';
        }
        return <Icon name={iconName} type="material-community" color={color} size={size} />;
      },
      headerStyle: {
              backgroundColor: '#F5FCFF',// Change this to your desired color
      },
      headerTintColor: "#021D46",
      headerTitleAlign: "center",
      headerTitleStyle: {fontFamily:"Bayon-Regular", fontSize:20},
      headerLeft: () => (
        <Button
          icon={<Icon name="list" size={30} color="black" />}
          onPress={() => navigation.toggleDrawer()}
          type="clear"
        />
      ),
      headerRight: () => (
              <Button
                icon={<Icon name="account-circle" type={"material"} size={30} color="black" style={{marginRight:6}} />}
                onPress={() => navigation.navigate("ProfilePage")}
                type="clear"
              />
            ),
    })}
    tabBarOptions={{
      activeTintColor: 'rgb(2,29,70)',
      inactiveTintColor: 'gray',
      labelStyle: {
          fontSize: 12,
          fontFamily: "Bayon-Regular"
        },
      tabStyle: {
        backgroundColor:"#f0f1f5",
        border: "none"
      },
      tabBarHeight: 100,
      numOfTabs: 5,
    }}
  >
    <Tab.Screen name="Dashboard" component={Dashboard}/>
    <Tab.Screen name="Tips" component={RecommendationPage} />
    <Tab.Screen
      name="AddProvider"
      component={ProviderPage}
      options={{
        tabBarIcon: () => (
          <Icon name="add-circle" type="material" color="rgb(2,29,70)" size={50} />
        ),
        tabBarLabel: () => null,
        headerShown: false,
      }}

    />
    <Tab.Screen name="Forecast" component={FutureAnalysis} />
    <Tab.Screen name="CompassAI" component={CompassAI} />
  </Tab.Navigator>
);

const DrawerContent = ({ navigation , state}) => (
  <View style={styles.drawerContainer}>
        <View style={styles.logoContainer}>
        <Image source={require('./../../../../../../assets/images/only-logo.png')} style={styles.drawerLogo}/>
        <Text style={styles.appName}>CLOUD COMPASS</Text>
      </View>
      <Button
        title="Home"
        icon={{ name: 'home', type: 'material-community', color: '#5F6368', size: 20 }}
        onPress={() => navigation.navigate('Dashboard')}
        buttonStyle={[
          styles.buttons,
          state.routeNames[state.index] === 'Dashboard' && styles.activeButton,
        ]}
        titleStyle={styles.titleStyle}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Profile"
        icon={{ name: 'account', type: 'material-community', color: '#5F6368', size: 20 }}
        onPress={() => navigation.navigate('ProfilePage')}
        buttonStyle={[
          styles.buttons,
          state.routeNames[state.index] === 'ProfilePage' && styles.activeButton,
        ]}
        titleStyle={styles.titleStyle}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Settings"
        icon={{ name: 'settings', type: 'material', color: '#5F6368', size: 20 }}
        onPress={() => navigation.navigate('Settings')}
        buttonStyle={[
          styles.buttons,
          state.routeNames[state.index] === 'Settings' && styles.activeButton,
        ]}
        titleStyle={styles.titleStyle}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="FAQ"
        icon={{ name: 'help-circle', type: 'material-community', color: '#5F6368', size: 20 }}
        onPress={() => navigation.navigate('FAQ')}
        buttonStyle={[
          styles.buttons,
          state.routeNames[state.index] === 'FAQ' && styles.activeButton,
        ]}
        titleStyle={styles.titleStyle}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="About CloudCompass"
        icon={{ name: 'information', type: 'material-community', color: '#5F6368', size: 20 }}
        onPress={() => navigation.navigate('AboutApp')}
        buttonStyle={[
          styles.buttons,
          state.routeNames[state.index] === 'AboutApp' && styles.activeButton,
        ]}
        titleStyle={styles.titleStyle}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Logout"
        icon={{ name: 'logout', type: 'material-community', color: '#5F6368', size: 20 }}
        buttonStyle={styles.buttons}
        titleStyle={styles.titleStyle}
        containerStyle={styles.buttonContainer}
        onPress={() => {
          AsyncStorage.removeItem('isLoggedIn');
          AsyncStorage.removeItem('uid');
          navigation.replace('Login');
        }}
      />
    </View>

);

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Dashboard" component={MainTabs} options={{ headerShown: false }} />
    <Drawer.Screen name="ProfilePage" component={ProfilePage} />
    <Drawer.Screen name="Settings" component={SettingsPage} />
    <Drawer.Screen name="FAQ" component={FAQPage} />
    <Drawer.Screen name="AboutApp" component={AboutApp} />
  </Drawer.Navigator>
);

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);


  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const firstLogin = await AsyncStorage.getItem('isFirstLogin');
      setIsLoggedIn(loggedIn === 'true');
      setIsFirstLogin(firstLogin === 'true');
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
      <Stack.Group screenOptions={{presentation: 'main'}}>
        <Stack.Screen name="MainTabs" component={DrawerNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                      </Stack.Group>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="AWSLogin" component={AWSLogin} />
                    <Stack.Screen name="WaitingPage" component={WaitingPage} />
                    <Stack.Screen name="AzureLogin" component={AzureLogin} />
                    <Stack.Screen name="GoogleCloudLogin" component={GoogleCloudLogin} />
                    <Stack.Screen name="AlibabaLogin" component={AlibabaLogin} />
              </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: 'wight',
    justifyContent: 'top',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    width: "100%",
    backgroundColor:"#F5FCFF"
  },
  buttons : {
    backgroundColor: 'none',
    color: '#E0F7FA',
    alignSelf: "Start",
    marginVertical: 1,
    borderRadius: 8,
    width: "100%",
    justifyContent: "flex-start",
    paddingLeft:10,

  },
  titleStyle: {
    color: "rgb(2,29,70)",
    fontSize: 18,
    fontFamily: "Bayon-Regular"
  },
  activeButton: {
      backgroundColor: "#dce2fa",
      width: "100%",

    },
    drawerLogo: {
        alignSelf: "start",
        width: 50,
        height: 50,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
      },
      appName : {
        fontFamily: "Bayon-Regular",
        fontSize: 22,
        marginLeft: 8,
        color: "rgb(2,29,70)"
     }

});

export default MainNavigator;
