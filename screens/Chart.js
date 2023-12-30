import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const defaultColors = {
  Food: "#F8EDFF",
  Transport: "#D8D9DA",
  Entertainment: "#BACDDB",
  Shopping: "#6096B4",
  Rent: "#205375",
};

const Chart = ({expenses}) => {
  const [data, setData] = useState([]);
  const screenWidth = Dimensions.get('window').width;

  const calculateTotalExpenseByCategory = (category) => {
    const newTotalExpense = expenses
      .filter(expense => expense.categoriesExpenses === category)
      .reduce((total, expense) => total + parseFloat(expense.value || 0), 0);
    const existingDataIndex = data.findIndex((expense) => expense.name === category);
    if (existingDataIndex !== -1) {
      setData(prevData => {
        const newData = [...prevData];
        newData[existingDataIndex].population = newTotalExpense;
        return newData;
      });
    } else {
      setData(prevData => [
        ...prevData,
        {
          name: category,
          population: newTotalExpense,
          color: defaultColors[category] || "#000000",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ]);
    }

    // console.log("newTotalExpense", newTotalExpense);
    return newTotalExpense;
  };
  useEffect(() => {
    // setData([]);
    if (expenses && expenses.length > 0) {
      setData(prevData => {
        const newData = expenses.reduce((acc, expense) => {
          const existingDataIndex = acc.findIndex((d) => d.name === expense.categoriesExpenses);

          if (existingDataIndex !== -1) {
            acc[existingDataIndex].population = calculateTotalExpenseByCategory(expense.categoriesExpenses);
          } else {
            const newCategoryData = {
              name: expense.categoriesExpenses,
              population: calculateTotalExpenseByCategory(expense.categoriesExpenses),
              color: expense.color || defaultColors[expense.categoriesExpenses] || "#000000",
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
    // console.log("dataExpense", data);
    
  }, [expenses]);

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
      <View>
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
});

export default Chart;