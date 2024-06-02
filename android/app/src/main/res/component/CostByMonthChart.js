import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Defs, LinearGradient, Stop, Circle, G, Line, Text as SvgText, Path } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const CostByMonthChart = () => {
  const data = [0, 500, 300, 350, 400, 500, 1000, 1500, 2000];
  const labels = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];


  const Gradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0'} y1={'0'} x2={'0'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={'rgba(2, 29, 70, 0.8)'} />
        <Stop offset={'100%'} stopColor={'rgba(2, 29, 70, 0.2)'} />
      </LinearGradient>
    </Defs>
  );

   const Shadow = ({ line }) => (
      <Path
        key={'shadow'}
        y={2}
        d={line}
        fill={'none'}
        strokeWidth={4}
        stroke={'rgba(2, 29, 70, 0.2)'}
      />
    );

    const Decorator = ({ x, y, data }) => {
        return data.map((value, index) => (
          <G key={index}>
            <Circle
              cx={x(index)}
              cy={y(value)}
              r={4}
              stroke={'rgb(134, 65, 244)'}
              fill={'white'}
            />
            <SvgText
              x={x(index)}
              y={y(value) - 10}
              fontSize={10}
              fill={'black'}
              alignmentBaseline={'middle'}
              textAnchor={'middle'}
            >
              {value}
            </SvgText>
          </G>
        ));
      };

  return (
     <View style={styles.container}>
          <Text style={styles.title}>Total Cost By Month</Text>
          <View style={{ flexDirection: 'row' }}>
            <YAxis
              data={data}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{
                fill: 'black',
                fontSize: 10,
              }}
              numberOfTicks={6}
              formatLabel={(value) => `$${value}`}
            />
            <View>
              <LineChart
                style={styles.chart}
                data={data}
                svg={{
                  strokeWidth: 2,
                  stroke: 'url(#gradient)',
                }}
                contentInset={{ top: 20, bottom: 20 }}
                curve={shape.curveNatural}
              >
                <Grid />
                <Gradient />
                <Shadow />
                <Decorator />
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -10,marginTop:8 }}
                data={data}
                formatLabel={(value, index) => labels[index]}
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 12, fill: 'black' }}
              />
            </View>
          </View>
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 8,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Bayon-Regular"
  },
  chart: {
    height: 280,
    width: screenWidth - 90,
    borderRadius: 16,
    backgroundColor: "#F5FCFF"
  },
});

export default CostByMonthChart;
