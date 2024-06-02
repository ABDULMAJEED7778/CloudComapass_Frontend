import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import { Header, Card, Icon, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';
import CloudAccountsTabs from './../navigation/CloudAccountsTabs';
import MeterCategoryChart from './../component/MeterCategoryChart';
import CostByMonthChart from './../component/CostByMonthChart';



const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["All", "Azure", "AWS", "Google Cloud"],
  data: [0.4, 0.6, 0.8, 0.2]
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const data2 = [
  { name: 'VMs', value: 52, color: '#176ba0' },
  { name: 'Storage', value: 13, color: '#19aade' },
  { name: 'Security Center', value: 10, color: '#1ac9e6' },
  { name: 'Service', value: 10, color: '#1de4bd' },
  { name: 'Container Registry', value: 3, color: '#c0f002' },
  { name: 'App Gateway', value: 2, color: '#c7f9ee' },
  { name: 'Load Balancer', value: 2, color: '#021D46' },
];
const Dashboard = () => {
    StatusBar.setBackgroundColor('#021D46', true);

  return (
     <SafeAreaView style={{flex:1}}>
    <ScrollView style={styles.container}>
        <CloudAccountsTabs />


      <View style={styles.totalCost}>
        <Text style={styles.totalCostTitle}>Total Cost:</Text>
        <Text style={styles.totalCostAmount}>$450</Text>
        <Icon name="menu-up" type={"material-community"} size={35} color={"#C21807"} style={styles.totalCostIndicator}/>
        <Text style={styles.totalCostChangePercentage}>6.05%</Text>
      </View>
      <Card containerStyle={styles.card}>
             <MeterCategoryChart data={data2} />
      </Card>
       <Card containerStyle={styles.card}>
              <CostByMonthChart />
       </Card>
      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Budget Overview</Text>
          <Icon name="pencil" type={"material-community"} style={styles.budgetEditIcon}/>
        </View>
        <View style={styles.budgetDetails}>
          <View style={styles.budgetItem}>
            <Text style={styles.budgetLabel}>Budgeted</Text>
            <Text style={styles.budgetValue}>$3500</Text>
          </View>
          <View style={styles.budgetItem}>
            <Text style={styles.budgetLabel}>Spent</Text>
            <Text style={styles.budgetValue}>$1400</Text>
          </View>
          <View style={styles.budgetItem}>
            <Text style={styles.budgetLabel}>Left</Text>
            <Text style={styles.budgetValue}>$2100</Text>
          </View>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Daily Spending Overview</Text>
          <Icon name="more-vert" />
        </View>
        <LineChart
          data={{
            labels: ["Feb 1", "Feb 8", "Feb 15", "Feb 22"],
            datasets: [
              {
                data: [0,50,60,20,50,20,90,100, 45, 28, 80]
              }
            ]
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces:0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(2, 50, 70, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              backgroundColor:"#ffffff"
            },
          }}
          bezier
          style={{
            marginVertical: 15,
            marginRight:12,
            borderRadius: 16
          }}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Cost anomalies</Text>
          <Icon name="more-vert" />
        </View>
        <View style={styles.costAnomalies}>
          <Text style={styles.costAnomaliesText}>VM_Backend</Text>
          <View style={styles.redAlertView}>
                      <Text style={styles.redCostAnomaliesAmount}>- $100  </Text>

            <Icon name={"alert"} type={"material-community"} style={styles.redAlertIcon} color={"#C21807"} />
          </View>
        </View>
        <View style={styles.costAnomalies}>
          <Text style={styles.costAnomaliesText}>DB_STORAGE</Text>
          <View style={styles.yellowAlertView}>
             <Text style={styles.yellowCostAnomaliesAmount}>- $20  </Text>
             <Icon name={"alert"} type={"material-community"} style={styles.yellowAlertIcon} color={"#F7B102"} />
          </View>
        </View>
      </Card>
    </ScrollView>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEF3F2',
  },
  totalCost: {
    backgroundColor: "none",
    flexDirection: "row",
    padding: 20,
    alignItems: 'center',
  },
  totalCostTitle: {
    color: '#021D46',
    fontFamily:"Bayon-Regular",
    fontSize: 22,
    marginRight: 16
  },
  totalCostAmount: {
    color: '#021D46',
    fontSize: 36,
    fontFamily:"Bayon-Regular",
  },
  totalCostIndicator: {
    color: "#000000",
  },
  totalCostChangePercentage: {
    color:"#C21807",
    fontFamily:"Bayon-Regular"
  },
  card: {
    borderRadius: 10,
    padding: 16,
    paddingTop: 8,
    margin: 10,
    borderWidth: 1,
//    borderColor: "#021D46",
    backgroundColor: "#F5FCFF"
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetEditIcon: {
    paddingTop: -5,
    top: -2
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily:"Bayon-Regular",
    marginBottom: 10,
    color: '#000000',
  },
  budgetDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetItem: {
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 16,
    color: '#757575',
  },
  budgetValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  costAnomalies: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  costAnomaliesText: {
    fontSize: 16,
    fontFamily:"Roboto-Regular"
  },
  redCostAnomaliesAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#C21807"
  },
   yellowCostAnomaliesAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color:"#F7B102"
    },
    redAlertView: {
        flexDirection:"row"
    },
    yellowAlertView: {
            flexDirection:"row"
        }

});

export default Dashboard;