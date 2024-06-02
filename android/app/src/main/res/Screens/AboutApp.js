import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Cloud Compass</Text>
      <Text style={styles.content}>
        Cloud Compass is a cutting-edge app designed to help you manage and analyze your cloud service usage and costs efficiently.
        Our goal is to provide comprehensive insights and recommendations to optimize your cloud expenses and performance.
      </Text>
      <Text style={styles.content}>
        Version: 1.0.0
      </Text>
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
  content: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default AboutApp;
