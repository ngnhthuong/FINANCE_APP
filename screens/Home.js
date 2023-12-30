import {View, Text , StyleSheet, SafeAreaView, FlatList, ScrollView} from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";
const Home = ({ route }) => {
    const {updateData, setUpdateData, id, setIsPremium} = useContext(AuthContext);
    const [selectedtDate, setSelectedDate] = useState(new Date());
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] =useState([]);
    useEffect(() => {
      // console.log(id);
      axios.get(`http://134.209.108.2:3002/api/getUser/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then(response => {
        console.log('premium',response.data.data.premium);
        setIsPremium(response.data.data.premium)}
      )
      .catch(error => console.log(error));

      axios.get(`http://134.209.108.2:3002/api/getExpenses/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },}
    )
        .then(response => {
        const reversedExpenses = response.data.reverse();
        setExpenses(reversedExpenses);
        })
        .catch(error => {
          console.log(error);
          // hien thi o da
        });
    }, [updateData])

    useEffect(() => {
      console.log(id);
      axios.get(`http://134.209.108.2:3002/api/getIncomes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          const reversedIncome = response.data.reverse();
          setIncome(reversedIncome);
        })
        .catch(error => {
          console.log(error);
        });
    }, [updateData])
    
    useEffect(() => {
      if (route.params && route.params.expenses) {
        setExpenses(route.params.expenses);
      }
    }, [route.params]);

    useEffect(() => {
      setSelectedDate(new Date());
    }, []);
// income
const calculateTotalIncomeByCategory = (category) => {
  let totalIncome = 0;
  income.forEach((income) => {
    if (income.categoriesIncome === category) {
      const number = parseFloat(income.value || 0);
      totalIncome += number;
    }
  });
  return totalIncome;
};
const totalSalary = calculateTotalIncomeByCategory('Salary');
const totalBonus = calculateTotalIncomeByCategory('Bonus');
const totalAllowance = calculateTotalIncomeByCategory('Allowance');
const totalInvestment = calculateTotalIncomeByCategory('Investment');

 const calculateTotalIncome = () => {
      let totalIncome = 0;
      income.forEach((income) => {
        const numberIncome = parseFloat(income.value || 0);
        totalIncome += numberIncome;
      });
      return totalIncome;
 };
  useEffect(() => {
      if (route.params && route.params.income) {
        setIncome(route.params.income);
      }
    }, [route.params]);

//Tinh tong tien tung expense
    const calculateTotalExpenseByCategory = (category) => {
      let totalExpense = 0;
      expenses.forEach((expense) => {
        if (expense.categoriesExpenses === category) {
          const number = parseFloat(expense.value || 0);
          totalExpense += number;
        }
      });
      return totalExpense;
    };
  
    const totalFoodExpense = calculateTotalExpenseByCategory('Food');
    const totalRentExpense = calculateTotalExpenseByCategory('Rent');
    const totalShoppingExpense = calculateTotalExpenseByCategory('Shopping');
    const totalEntertainmentExpense = calculateTotalExpenseByCategory('Entertainment');
    const totalTransportExpense = calculateTotalExpenseByCategory('Transport');

    const calculateTotalExpense = () => {
      let totalExpense = 0;
      expenses.forEach((expense) => {
        const number = parseFloat(expense.value || 0);
        totalExpense += number;
      });
      return totalExpense;
    };
    return (
<ScrollView>
<SafeAreaView style={styles.container}>
    <LinearGradient
                    colors={['#FDCEDF', '#BEADFA']}
                    style={styles.header}
    >
    <Text style={[styles.titleStyle, {marginBottom: 30, fontWeight: 'bold', color: '#674188', fontSize: 23}]}> Statistic Results</Text>
    <View style = {styles.textheader}>
        <View style={styles.rowContainer}>
            <Text style={styles.label}>Income:</Text>
            <Text style={styles.value}>{calculateTotalIncome()} đ</Text>
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.label}>Expenses:</Text>
            <Text style={styles.value}>{calculateTotalExpense()} đ</Text>
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.label}>Residual amount:</Text>
            <Text style={styles.value}>
              {calculateTotalIncome() - calculateTotalExpense()} đ
            </Text>
        </View>
    </View>
</LinearGradient>
<LinearGradient
        colors={['#BEADFA', '#FDCEDF']}
        style={styles.body}
>
    <View style={styles.expenseDetail}>
      <Text style={styles.expenseHeader}>Expenses</Text>
      {expenses.length > 0 ? (
        <>
          {expenses.map((expense, index) => (
            <View key={index} style={styles.expenseRow}>
              <View style={styles.expenseCategory}>
                <Text style= {{fontWeight: 'bold'}}>{expense.categoriesExpenses}</Text>
                <Text style= {{fontSize: 10}}>{expense.note}</Text>
              </View>
                <View style={styles.expenseDetails}>
                  <Text style= {{color: '#D80032', fontWeight: 'bold', fontSize: 17}}>- {parseFloat(expense.value || 0)} đ</Text>
                  <Text style= {{fontSize: 12}}>{expense.date}</Text>
              </View>
              {index < expenses.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </>
      ) : (
        <Text>No expenses</Text>
      )}
    </View>

    <View style={styles.expenseDetail}>
      <Text style={styles.expenseHeader}>Income</Text>
      {income.length > 0 ? (
        <>
          {income.map((income, index) => (
            <View key={index} style={styles.expenseRow}>
               <View style={styles.expenseCategory}>
                  <Text style= {{fontWeight: 'bold'}}>{income.categoriesIncome}</Text>
                  <Text style= {{fontSize: 10}}>{income.note}</Text>
              </View>
              <View style={styles.expenseDetails}>
                  <Text style= {{color: '#1F8A70', fontWeight: 'bold', fontSize: 17}}>+ {parseFloat(income.value || 0)} đ</Text>
                  <Text style= {{fontSize: 12}}>{income.date}</Text>
              </View>
              {index < income.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </>
      ) : (
        <Text>No income</Text>
      )}
    </View>
  </LinearGradient>
</SafeAreaView>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#FCE9F1',
  padding: 15,
  },
header:{
  backgroundColor: '#BEADFA',
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
  paddingHorizontal: 20,
  paddingVertical: 20,
  // borderBottomLeftRadius: 20,
  // borderBottomRightRadius: 20,
},
textheader:{
  backgroundColor: '#ffffff',
  borderRadius: 15,
  paddingHorizontal: 20,
  paddingVertical: 20
},
titleStyle: {
  textAlign: 'center',
  fontSize: 20,
  marginBottom: 20,
},
horizontalLine: {
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 10,
},
body:{
  marginTop: 10,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  // borderRadius: 20,
},
rowContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
},
label: {
  fontWeight: 'bold',
  textAlign:'center'
},
value: {
  color: 'green',
},
expenseDetail: {
  margin: 12,
  backgroundColor: '#ffffff',
  padding: 20,
  // borderRadius: 20,
},
expenseHeader: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 10,
  textAlign:'center'
},
expenseRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  // alignItems: 'center',
  alignItems: 'center',
  marginBottom: 5,
  marginTop: 5,
},
expenseCategory: {
  flex: 1,
  // marginRight: 130,
  // justifyContent: 'space-between',
  // alignItems: 'center',
},
expenseDetails: {
  flex: 1,
  // flexDirection: 'column',
  marginLeft: 170,
},
divider: {
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 5,
},
chartContainer: {
  marginTop: 10,
  backgroundColor: 'white',
  borderRadius: 10,
  width: '100%',
  alignSelf: 'center',
    }
});
export default Home;
