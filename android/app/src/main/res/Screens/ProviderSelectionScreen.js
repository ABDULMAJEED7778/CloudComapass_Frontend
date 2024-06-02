import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProviderSelectionScreen = ({navigation}) => {
    const [selectedProviders, setSelectedProviders] = useState([]);
      const route = useRoute();

  const { providers, index } = route.params || { providers: [], index: 0 }; // Default to empty array and 0 if not provided


    const toggleProvider = (provider) => {
       if (selectedProviders.includes(provider)) {
           setSelectedProviders(selectedProviders.filter(item => item !== provider));
       } else {
         setSelectedProviders([...selectedProviders, provider]);
       }
    };

     const handleContinue = () => {
        if (selectedProviders.length === 0) {
          Alert.alert('No Selection', 'Please select at least one cloud provider.');
          return;
        }
       const firstProvider = selectedProviders[0];
       navigation.navigate(`${firstProvider}Login`, { providers: selectedProviders, index: 0 });
      };


  const handleLoginSuccess = async () => {
    // Check if there's another provider to log in to
    const nextIndex = index + 1;
    if (nextIndex < providers.length) {
      const nextProvider = providers[nextIndex];
      navigation.replace(`${nextProvider}Login`, { providers, index: nextIndex });
    } else {
      // If no more providers, navigate to the dashboard or another appropriate screen
      await AsyncStorage.setItem('isFirstLogin', 'false');
      navigation.replace('MainTabs');
    }
  };

       const providersList = [
          { id: 'AWS', logo: require('./../../../../../../assets/images/aws_logo.png'), name: 'AWS' },
          { id: 'Azure', logo: require('./../../../../../../assets/images/Microsoft_Azure_logo.png'), name: 'Azure' },
          { id: 'GoogleCloud', logo: require('./../../../../../../assets/images/google_cloud_logo.png'), name: 'Google Cloud' },
          { id: 'Alibaba', logo: require('./../../../../../../assets/images/Alibaba_cloud_logo.png'), name: 'Alibaba Cloud' }
        ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Providers</Text>
        <TouchableOpacity>
          <Image source={require('./../../../../../../assets/images/only-logo.png')} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Choose your cloud service: </Text>
      <ScrollView contentContainerStyle={styles.grid}>
         {providersList.map(provider => (
                  <TouchableOpacity
                    key={provider.id}
                    style={[styles.card, selectedProviders.includes(provider.id) && styles.selectedCard]}
                    onPress={() => toggleProvider(provider.id)}>
                    <Image source={provider.logo} style={styles.logo} />
                    {selectedProviders.includes(provider.id) && (
                        <Icon name="check" size={24} color="#00ab41" style={styles.checkIcon} />
                      )}
                  </TouchableOpacity>
                ))}
        <TouchableOpacity style={styles.button} onPress={handleContinue} >
                <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEF3F2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  headerTitle: {
    fontSize: 22,
    color:'#021D46',
    fontFamily: "Bayon-Regular",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'left',
    marginTop: 20,
    fontSize:24,
    color: '#021D46',
    fontFamily: "Roboto-Light",
    marginLeft:10,
    marginBottom: 6
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    width: '45%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#F3F1F1',
    borderRadius: 10,
    elevation: 3,
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#021D46'
    },

    selectedCard: {
        borderColor: '#00ab41',
        borderWidth: 2,// Green border for selected
      },
      checkIcon: {
          position: 'absolute',
          top: 10,
          right: 10,
        },
  logo: {
    width: '80%',
    height: 100,
    resizeMode: 'contain'
  },
  button: {
      width: '80%',
      padding: 15,
      backgroundColor: '#021D46',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 20,
      align: 'bottom'
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
});

export default ProviderSelectionScreen;
