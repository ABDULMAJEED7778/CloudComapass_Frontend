import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing, Image } from 'react-native';

const RecommendationScreen = () => {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    )
  ).start();

  // Second interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerContent}>
        <Animated.Image
          style={[styles.image, { transform: [{ rotate: spin }] }]}
          source={ require('./../../../../../../assets/images/developmentIcon.png')}
        />
        <Text style={styles.title}>Still Under Development</Text>
        <Text style={styles.subtitle}>We are working hard to get this feature ready for you!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#DEF3F2",
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily:"Bayon-Regular",
    color: '#021D46',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginTop:100,
  },
});

export default RecommendationScreen;
