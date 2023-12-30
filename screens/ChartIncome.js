
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, View , Text} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';

const defaultColors = {
  Salary: "#1A5D1A",
  Bonus: "#7A9D54",
  Allowance: "#597E52",
  Investment: "#C1F2B0",
};

const ChartIncome = ({incomes}) => {
  const [data, setData] = useState([]);
  const screenWidth = Dimensions.get('window').width;

  const calculateTotalIncomeByCategory = (category) => {
    const newTotalIncome = incomes
      .filter(income => income.categoriesIncome === category)
      .reduce((total, income) => total + parseFloat(income.value || 0), 0);
    const existingDataIndex = data.findIndex((income) => income.name === category);
    if (existingDataIndex !== -1) {
      setData(prevData => {
        const newData = [...prevData];
        newData[existingDataIndex].population = newTotalIncome;
        return newData;
      });
    } else {
      setData(prevData => [
        ...prevData,
        {
          name: category,
          population: newTotalIncome,
          color: defaultColors[category] || "#000000",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ]);
    }

    // console.log("newTotalIncome", newTotalIncome);
    return newTotalIncome;
  };
  useEffect(() => {
    // setData([]);
    if (incomes && incomes.length > 0) {
      setData(prevData => {
        const newData = incomes.reduce((acc, income) => {
          const existingDataIndex = acc.findIndex((d) => d.name === income.categoriesIncome);

          if (existingDataIndex !== -1) {
            acc[existingDataIndex].population = calculateTotalIncomeByCategory(income.categoriesIncome);
          } else {
            const newCategoryData = {
              name: income.categoriesIncome,
              population: calculateTotalIncomeByCategory(income.categoriesIncome),
              color: income.color || defaultColors[income.categoriesIncome] || "#000000",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            };
            acc.push(newCategoryData);
          }
          return acc;
        }, []);
        return newData;
      });
    }
    // console.log("dataIncome", data);
    
  }, [incomes]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={370}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"#ffffff"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FCE9F1',
  },
  chartContainer:{
    borderRadius: 10,
  }
});

export default ChartIncome;