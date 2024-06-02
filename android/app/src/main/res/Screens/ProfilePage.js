import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfilePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileDetail}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John Doe</Text>
      </View>
      <View style={styles.profileDetail}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>john.doe@example.com</Text>
      </View>
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
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
  profileDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
  },
});

export default ProfilePage;
