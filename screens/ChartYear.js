
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const ChartYear = ({navigation}) => {
  const [dataChartYearExpenses, setDataChartYearExpenses] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  });
  const [dataChartYearIncome, setDataChartYearIncome] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  });
  const { updateData, setUpdateData, id } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`http://134.209.108.2:3002/api/getTotalExpensesMonthByYear/${id}/2023`, {
      headers: {
        'Content-Type': 'application/json',
      },}
      )
      .then(response => {
      let data = response.data;
      setDataChartYearExpenses(data);
      })
      .catch(error => {
      });

      axios.get(`http://134.209.108.2:3002/api/getTotalIncomesMonthByYear/${id}/2023`, {
      headers: {
        'Content-Type': 'application/json',
      },}
      )
      .then(response => {
      let data = response.data;
      setDataChartYearIncome(data);
      })
      .catch(error => {
      });
  },[updateData]);
    
    const { width: screenWidth } = Dimensions.get('window');
    return (
      <ScrollView>
        <View style = {styles.container}>
        <View style = {styles.chartline1}>
          <Text style = {styles.text}>Yearly chart of expenses</Text>
        {dataChartYearExpenses? (
            <LineChart
              data={dataChartYearExpenses}
              width={screenWidth}
              height={256}
              verticalLabelRotation={0}
              chartConfig={{
                backgroundColor: "#ffff",
                backgroundGradientFrom: "#F78CA2",
                backgroundGradientTo: "#A367B1",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#DA0C81"
                }
              }}
              bezier
            />
            ) : (
              <Text>Loading or No Data Available</Text>
            )}
        </View>
        <View style = {styles.chartline}>
          <Text style = {styles.text}>Yearly chart of income</Text>
            {dataChartYearIncome? (
            <LineChart
              data={dataChartYearIncome}
              width={screenWidth}
              height={256}
              verticalLabelRotation={0}
              chartConfig={{
                backgroundColor: "#ffff",
                backgroundGradientFrom: "#F78CA2",
                backgroundGradientTo: "#A367B1",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#DA0C81"
                }
              }}
              bezier
            />
            ) : (
              <Text>Loading or No Data Available</Text>
            )}
        </View>
      </View>
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
container: {
  flex: 1,
  marginVertical: 10,
},
chartline: {
  marginTop: 10,
  marginRight: 20,
    },
chartline1: {
  marginRight: 20,
}
, text: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  marginVertical: 5,
  color: '#000000',
}
});
  export default ChartYear;