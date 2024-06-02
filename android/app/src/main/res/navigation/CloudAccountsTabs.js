import React, { useState } from 'react';
import { View, StyleSheet, Text , SafeAreaView  } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const CloudAccountsTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleIndexChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>
      <SegmentedControlTab
        values={['AWS', 'Azure', 'Google Cloud']}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexChange}
        tabsContainerStyle={styles.tabsContainer}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabTextStyle={styles.activeTabTextStyle}
      />
    </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
safeContainer: {
    flex: 1,
    backgroundColor: '#DEF3F2',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'left',
    backgroundColor: '#F5FCFF',
  },
  tabsContainer: {
    height: 50,
    backgroundColor: '#DEF3F2',
    borderRadius:10,
    padding:6,
    paddingTop: 10
  },
  tabStyle: {
    borderColor: '#F7B102',
    backgroundColor: "#F3F1F1",

  },
  activeTabStyle: {
    backgroundColor: '#F7B102',
  },
  tabTextStyle: {
    color: '#021D46',
    fontFamily: "Roboto-Regular"
  },
  activeTabTextStyle: {
    color: '#021D46',
    fontFamily: "Roboto-Regular"
  },
});

export default CloudAccountsTabs;
