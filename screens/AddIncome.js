import React,{useState,  useEffect, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,Alert, ScrollView } from 'react-native';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { format } from 'date-fns';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
const data = [
  { label: 'Salary', value: '0' },
  { label: 'Allowance', value: '0' },
  { label: 'Bonus', value: '0'},
  { label: 'Investment', value: '0' },
];
const AddIncome = ({ navigation }) => {
  const {id, updateData, setUpdateData} = useContext(AuthContext);
  const [isAddExpensesSelected, setIsAddExpensesSelected] = useState(false);
  const [isAddIncomeSelected, setIsAddIncomeSelected] = useState(true);
  const [day, setDay] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [numberIncome, setNumberIncome] = React.useState('');
  const [note,  setNote] = React.useState('');
  const [income, setIncome] =useState([]);
  const [incomeCategory, setIncomeCategory] = useState(data[0].label);
  const [selectedIncomeDate, setSelectedIncomeDate] = useState(new Date());

  const handleSubmitIncome = () => {
    if ((numberIncome.trim() === '')){
      Alert.alert('Please type your income!');
      return;
    }
    const newIncome = { numberIncome, note, day, incomeCategory };
    setIncome([...income, newIncome]);
    setNumberIncome('');
    setNote('');

    const objectIncome = {
      "categoriesIncome": incomeCategory ,
      "date": day ,
      "value": numberIncome,
      "userId": id,
      "note": note
     }
     axios.post(`http://134.209.108.2:3002/api/addIncome`, objectIncome, {
    headers: {
      'Content-Type': 'application/json',
    },}
)
    .then(response => {
    setUpdateData(!updateData);
    navigation.navigate('Home')
    })
    .catch(error => {
      console.log(error);
    });
  }

  const nav = useNavigation();
    useFocusEffect(() => {
      setIsAddExpensesSelected(false);
      setIsAddIncomeSelected(true);
  });

useEffect(() => {
  setSelectedIncomeDate(new Date());
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
    setSelectedIncomeDate(selectedIncomeDate);
    setDay(formattedDate);
  }
};

const handleDropdownFocus = () => {
};

const handleDropdownBlur = () => {
};
const handleCategoryPress = (category) => {
  setIncomeCategory(category);
};
const renderItem = ({ item }) => (
  <TouchableOpacity
    style={[styles.categoryItem, item === incomeCategory ? styles.selectedCategoryItem : {}]}
    onPress={() => handleCategoryPress(item)}
  >
    <Text style={styles.categoryText}>{item}</Text>
  </TouchableOpacity>
);
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
            navigation.navigate('AddExpenses');
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
          }}
        >
        <Text style={[styles.buttonText, isAddIncomeSelected ? styles.selectedText : {}]}>Income</Text>
        </TouchableOpacity>
      </View>
      
      {!isAddExpensesSelected ? (
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
                    selectedDayColor="#66ff33"
                    selectedDayTextColor="#000000"
                    scaleFactor={375}
                    textStyle={{
                      color: '#000000',
                    }}
                    selected={selectedIncomeDate}
                    onDateChange={onDateChange}
                  />
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.expenseContainer}>
        <View style = {styles.expense}>
            <Text style={styles.text}>Expense money</Text>
            <TextInput
                placeholder='0'
                value={numberIncome}
                style={styles.input}
                onChangeText={(numberIncome) => setNumberIncome(numberIncome)}
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
                  value={note}
                  onChangeText={(note) => setNote(note)}
                  style= {styles.input}
            />
        </View>
        <View style={styles.categoryContainer}>
                <Text style= {{fontSize : 18, marginRight: 8, paddingBottom: 6}}>Category</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder={incomeCategory}
                  label={incomeCategory}
                  onFocus={handleDropdownFocus}
                  onBlur={handleDropdownBlur}
                  onChange={(item) => {
                    setIncomeCategory(item.label);
                  }}
                />
        </View>
    </View>
  </View> 
    ) : null}
        <TouchableOpacity
              onPress={handleSubmitIncome}
          >
            <LinearGradient
                colors={['#F875AA', '#BEADFA']}
                style= {styles.buttonAdd}
            >
            <Text style={{ color: '#ffffff', fontSize: 19, textAlign: 'center'}}>Enter your income</Text>        
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
  horizontalLine: {
    marginVertical: 8,
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
  addContainer: {
    padding: 10,
    borderRadius: 10,
  },
  dateTimeNow:{
      padding: 7,
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
    fontSize: 17
  },
  input:{
    textAlign: 'center',
    fontSize: 17
  },
  buttonAdd:{
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
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

  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
  },

  arrowButton: {
    padding: 10,
  },
  dropdown: {
    width: 150,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  calendarView:{
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 0,
  },
  expenseContainer:{
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
});


export default AddIncome;