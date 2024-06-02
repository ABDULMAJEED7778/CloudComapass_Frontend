import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Drawer, DrawerItem, DrawerContentScrollView } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { Button , View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProviderPage from './../Screens/ProviderSelectionScreen';
import SignUpScreen from './../Screens/SignUpScreen';
import Dashboard from './../Screens/Dashboard';
import LoginScreen from './../Screens/LoginScreen';
import StartingScreen from './../Screens/StartingScreen';
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
import { useNavigation } from '@react-navigation/native';





//const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProviderPage" component={ProviderPage} options={{ headerShown: false }} />
    <Stack.Screen name="MainTabs" component={DrawerNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);


const MainTabs = ({navigation}) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') {
          iconName = 'view-dashboard';
        } else if (route.name === 'Recommendation') {
          iconName = 'notification-clear-all';
        } else if (route.name === 'FutureAnalysis') {
          iconName = 'google-analytics';
        } else if (route.name === 'CompassAI') {
          iconName = 'robot-excited';
        }
        return <Icon name={iconName} type="material-community" color={color} size={size} />;
      },
      headerLeft: () => (
              <Button
                icon={<Icon name="menu" size={25} color="black" />}
                onPress={() => navigation.openDrawer()}
                type="clear"
              />
            ),
    })}
    tabBarOptions={{
      activeTintColor: '#6200EE',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    <Tab.Screen name="Recommendation" component={RecommendationPage} />
    <Tab.Screen
      name="AddProvider"
      component={ProviderPage}
      options={{
        tabBarIcon: () => (
          <Icon name="add-circle" type="material" color="#6200EE" size={50} />
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen name="FutureAnalysis" component={FutureAnalysis} />
    <Tab.Screen name="CompassAI" component={CompassAI} />
  </Tab.Navigator>
);

const DrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        <Avatar.Image size={50} source={{ uri: 'https://static.thenounproject.com/png/363640-200.png' }} />
        <Title>User Name</Title>
        <Caption>@username</Caption>
      </View>
      <Drawer.Section>
        <DrawerItem
          label="Home"
          icon={({ color, size }) => <Icon name="home" color={color} size={size} />}
          onPress={() => navigation.navigate('Dashboard')}
        />
        <DrawerItem
          label="Profile"
          icon={({ color, size }) => <Icon name="account" color={color} size={size} />}
          onPress={() => navigation.navigate('ProfilePage')}
        />
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => <Icon name="settings" color={color} size={size} />}
          onPress={() => navigation.navigate('SettingsPage')}
        />
        <DrawerItem
          label="FAQ"
          icon={({ color, size }) => <Icon name="help-circle" color={color} size={size} />}
          onPress={() => navigation.navigate('FAQPage')}
        />
        <DrawerItem
          label="About App"
          icon={({ color, size }) => <Icon name="information" color={color} size={size} />}
          onPress={() => navigation.navigate('AboutApp')}
        />
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => <Icon name="logout" color={color} size={size} />}
          onPress={() => {
            AsyncStorage.removeItem('isLoggedIn');
            navigation.navigate('Login');
          }}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Dashboard" component={MainTabs} />
    <Drawer.Screen name="ProfilePage" component={ProfilePage} />
    <Drawer.Screen name="SettingsPage" component={SettingsPage} />
    <Drawer.Screen name="FAQPage" component={FAQPage} />
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
        <Stack.Screen name="MainTabs" component={DrawerNavigator} />
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

export default MainNavigator;
