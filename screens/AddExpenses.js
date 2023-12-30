import React,{useState,  useEffect, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView , Alert} from 'react-native';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import { Button } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { format } from 'date-fns';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
const data = [
  { label: 'Food', value: '0' },
  { label: 'Rent', value: '0' },
  { label: 'Shopping', value: '0'},
  { label: 'Entertainment', value: '0' },
  { label: 'Transport', value: '0'}
];
  const AddExpenses = ({ navigation }) => {
    const {id, updateData, setUpdateData,updateDataExpenses, setUpdateDataExpenses} = useContext(AuthContext);
      const [isAddExpensesSelected, setIsAddExpensesSelected] = useState(true);
      const [isAddIncomeSelected, setIsAddIncomeSelected] = useState(false);
      const [number, setNumber] = React.useState('');
      const [text, setText] = React.useState('');
      const [expenses, setExpenses] =useState([]);
      const [selectedCategory, setSelectedCategory] = useState(data[0].label);
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [day, setDay] = useState(format(new Date(), 'yyyy-MM-dd'));


      const initialCategoryValues = {
        'Food': 0,
        'Rent': 0,
        'Shopping': 0,
        'Entertainment': 0,
        'Transportation': 0,
      };
      
      useEffect(() => {
        setSelectedDate(new Date());
      }, []);
      const onDateChange = (date, type) => {
        if (type === 'DATE_NOW') {
          return;
        } else {
          const selectedDate = date.toDate();
          const day = selectedDate.getDate();
          const month = selectedDate.getMonth() + 1; 
          const year = selectedDate.getFullYear();
          const formattedDate = `${year}-${month}-${day}`;
          setSelectedDate(selectedDate);
          setDay(formattedDate);
        }
      };
    
      const handleCategoryPress = (category) => {
        setSelectedCategory(category);
      };
      const renderItem = ({ item }) => (
        <TouchableOpacity
          style={[styles.categoryItem, item === selectedCategory ? styles.selectedCategoryItem : {}]}
          onPress={() => handleCategoryPress(item)}
        >
          <Text style={styles.categoryText}>{item}</Text>
        </TouchableOpacity>
      );
      
      const handleSubmit = () => {
        if ((number.trim() === '')) {
            Alert.alert('Please type your expense!');
            return;
        }
        const newExpense = { number, text, day, category: selectedCategory }; 
        setExpenses([...expenses, newExpense]); 
        setNumber('');
        setText('');
        // navigation.navigate('Home', { expenses: [ newExpense,...expenses] });
        // console.log(id);
        // console.log(day);
        // console.log(number);
        // console.log(text);
        // console.log(selectedCategory)
         const objectExpenses = {
          "categoriesExpenses": selectedCategory ,
          "date": day,
          "value": number,
          "userId": id,
          "note": text
         }
         axios.post(`http://134.209.108.2:3002/api/addExpenses`, objectExpenses, {
        headers: {
          'Content-Type': 'application/json',
        },}
    )
        .then(response => {
        setUpdateData(!updateData);
        // setUpdateDataExpenses(!updateDataExpenses);
        navigation.navigate('Home')
        })
        .catch(error => {
          console.log(error);
          // hien thi o da
        });
        // tao 1 cai object de gui len server
      }
      const nav = useNavigation();
      useFocusEffect(() => {
        setIsAddExpensesSelected(true);
        setIsAddIncomeSelected(false);
      });

      const handleDropdownFocus = () => {
      };
    
      const handleDropdownBlur = () => {
      };
    return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
           <TouchableOpacity
                style={[
                  styles.button,
                  isAddExpensesSelected ? styles.selectedButton : {},
                ]}
                onPress={() => {
                  setIsAddExpensesSelected(true);
                  setIsAddIncomeSelected(false);
                }}
            >
            <Text style={[styles.buttonText, isAddExpensesSelected ? styles.selectedText : {}]}>Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              isAddIncomeSelected ? styles.selectedButton : {},
            ]}
            onPress={() => {
              setIsAddExpensesSelected(false);
              setIsAddIncomeSelected(true);
              navigation.navigate('AddIncome');
            }}
          >
            <Text style={[styles.buttonText, isAddIncomeSelected ? styles.selectedText : {}]}>Income</Text>
          </TouchableOpacity>
      </View>
        {isAddExpensesSelected ? (
        <View style= {styles.addContainer} >
          <View style= {styles.calendarView}>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={false}
                    minDate={new Date(2018, 1, 1)}
                    maxDate={new Date(2050, 6, 3)}
                    weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                    months={[
                      'January',
                      'Febraury',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ]}
                    previousTitle="Previous"
                    nextTitle="Next"
                    todayBackgroundColor="#e6ffe6"
                    selectedDayColor='#BEADFA'
                    selectedDayTextColor="#000000"
                    scaleFactor={375}
                    textStyle={{
                      color: '#000000',
                    }}
                    selected={selectedDate}
                    onDateChange={onDateChange}
                  />
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.expenseContainer}>
          <View style={[styles.expense, {borderTopLeftRadius: 20, borderTopRightRadius: 20}]}>
                <Text style={styles.text}>Expense money</Text>
                <TextInput
                    placeholder='000'
                    value={number}
                    style={styles.input}
                    onChangeText={(number) => setNumber(number)}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.expense}>
                <Text style={styles.text}>Date</Text>
                <View>
                    <Text style={[styles.dateTimeNow, styles.input]}>{day}</Text>
                </View>
            </View>
            <View style={styles.expense}>
                <Text style={styles.text}>Note</Text>
                <TextInput
                      placeholder='Typing note'
                      value={text}
                      onChangeText={(text) => setText(text)}
                      style= {styles.input}
                />
            </View>
            <View style={[styles.categoryContainer, {borderBottomLeftRadius:20,borderBottomRightRadius:20, paddingBottom: 6}]}>
                <Text style= {{fontSize : 18, marginRight: 8}}>Category</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder={selectedCategory}
                  label={selectedCategory}
                  onFocus={handleDropdownFocus}
                  onBlur={handleDropdownBlur}
                  onChange={(item) => {
                    setSelectedCategory(item.label);
                  }}
                />
            </View>
        </View>
    </View> 
        ) : null}
         <TouchableOpacity
              onPress={handleSubmit}
          >
            <LinearGradient
                colors={['#F875AA', '#BEADFA']}
                style= {styles.buttonAdd}
            >
            <Text style={{ color: '#ffffff', fontSize: 19, textAlign: 'center'}}>Enter your expense</Text>        
            </LinearGradient>
          </TouchableOpacity> 
      </View>
  </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCE9F1'
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginLeft: 16,
      marginTop: 50,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 2,
      marginVertical: 2,
      borderRadius: 15,
      backgroundColor: '#ffffff',
      marginLeft:10,
      marginRight:10,
    },
    button: {
      flex: 1,
      borderRadius: 15,
      marginTop: 5,
      marginBottom: 5,
      textAlign: 'center',
      justifyContent:'center', 
    },
    selectedButton: {
      borderRadius: 15,
      backgroundColor: '#ED9ED6',
    },
    buttonText: {
      textAlign: 'center',
      justifyContent:'center', 
      fontSize: 18,
    },
    selectedText: {
      color: 'white',
      paddingTop: 15,
      paddingBottom: 15,
    },
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    textContainer: {
      marginLeft: 16,
    },
    lastMessage: {
      fontSize: 16,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14
    },
    dateTimeNow:{
        padding: 7,
        // backgroundColor: '#B4B4B3',
        borderRadius: 10,
    },
    addContainer: {
        padding: 10,
        borderRadius: 10,
    },
    expense: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        // marginBottom: 5,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
    },
    text:{
      marginRight: 10,
      fontSize: 17,
    },
    input:{
      textAlign: 'center',
      fontSize: 17,    
    },
    buttonAdd:{
      marginTop: 0,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 15,
      marginBottom: 30,
      paddingBottom: 10,
      paddingTop: 12,
    },
    categoryItem: {
      padding: 10,
      marginRight: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ccc',
    },
    categoryText: {
      fontSize: 17,
    },
    dropdown: {
      width: 150,
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      
    },
  
    toggleCategoriesButton: {
      backgroundColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    flatList: {
      marginTop: 10,
    },
    toggleCategoriesButton: {
      backgroundColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    horizontalLine: {
      marginVertical: 8,
      },
    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingLeft: 10,
      paddingRight: 10,
    },
    expenseContainer:{
      flexDirection: 'column',
      backgroundColor: '#ffffff'
    },
    arrowButton: {
      padding: 10,
    },
    calendarView:{
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 0,
    },
  
  });
  export default AddExpenses;