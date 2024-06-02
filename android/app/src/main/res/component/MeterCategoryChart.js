import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';


const screenWidth = Dimensions.get('window').width;

const MeterCategoryChart = ({ data }) => {

     const chartData = data.map((item, index) => ({
        name: item.name,
        population: item.value,
        color:item.color,
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      }));

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Cost by Meter Category</Text>
          <PieChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="12"
            center={[10, 0]}
            absolute
            avoidFalseZero= "true"
          />
        </View>
      );
    };


const chartConfig = {
  backgroundGradientFrom: '#021D46',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#000000',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 0, 146, ${opacity})`,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Bayon-Regular"
  },
});


export default MeterCategoryChart;
