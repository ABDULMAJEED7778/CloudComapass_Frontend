import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SettingsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Notification Settings</Text>
        <Button title="Edit" onPress={() => navigation.navigate('NotificationSettings')} />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Account Settings</Text>
        <Button title="Edit" onPress={() => navigation.navigate('AccountSettings')} />
      </View>
      {/* Add more settings as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
});

export default SettingsPage;
