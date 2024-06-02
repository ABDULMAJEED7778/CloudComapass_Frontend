import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FAQPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FAQ</Text>
      <Text style={styles.question}>1. What is Cloud Compass?</Text>
      <Text style={styles.answer}>Cloud Compass is an app that helps you manage and analyze your cloud service usage and costs.</Text>
      <Text style={styles.question}>2. How do I add a new cloud provider?</Text>
      <Text style={styles.answer}>Go to the Add Provider page from the main menu and follow the instructions.</Text>
      {/* Add more FAQs as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  answer: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default FAQPage;
