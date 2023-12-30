import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
const data = [
  { label: 'Japan', value: 'JPY' },
  { label: 'Viet Nam', value: 'VND' },
  { label: 'America', value: 'USD' },
  { label: 'Korea', value: 'KRW' },
  { label: 'Chinese', value: 'CNY' }
];

const Activities = () => {
  const [value, setValue] = useState('VND');
  const [value2, setValue2] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({}); 

  useEffect(() => {
    const apiKey = 'd8f8aa5acc61369e652ccbd43d49e7eb';
    const apiUrl = `https://open.er-api.com/v6/latest/${value}`;

    axios
      .get(apiUrl, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        setExchangeRates(response.data.rates);
      })
      .catch(error => console.error('Error fetching exchange rates:', error));
  }, [value, setExchangeRates]);

  const convertCurrency = () => {
    const exchangeRate = exchangeRates[value2];
    const result = (parseFloat(amount) * exchangeRate).toFixed(2);
    setConvertedAmount(result);
  };

  const handleDropdownFocus = () => {
  };

  const handleDropdownBlur = () => {
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style = {{fontSize: 17,  textAlign: 'center',}}>Enter amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder=" 1.000.000 đ"
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <View style={styles.horizontalLine} />
        <Text style = {{marginBottom: 10, fontSize: 17}}>Select from currency:</Text>
          <Dropdown
            style={styles.dropdown}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={!value ? 'Select item' : '...'}
            value={value}
            onFocus={handleDropdownFocus}
            onBlur={handleDropdownBlur}
            onChange={item => {
              setValue(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                name="Safety"
                size={20}
              />
            )}
          />
       </View>
      <Text style = {{marginBottom: 10, fontSize: 17}}>Select to currency:</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!value2 ? 'Select item' : '...'}
        value={value2}
        onFocus={handleDropdownFocus}
        onBlur={handleDropdownBlur}
        onChange={item => {
          setValue2(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            name="Safety"
            size={20}
          />
        )}
      />
        <LinearGradient
            colors={['#F875AA', '#BEADFA']}
          style={styles.button}
        >
        <TouchableOpacity onPress={convertCurrency}>
          <Text style = {{color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>Convert</Text>
        </TouchableOpacity>
        </LinearGradient>
      

      {convertedAmount && (
        <Text style= {styles.trong}>
          {amount} {value} is equal to {convertedAmount} {value2}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    fontSize: 18,
    height: '100%',
  },
  header: {
    marginTop: 10, 
    textAlign: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,

  },
  icon: {
    marginRight: 5
  },
  input: {
    fontSize: 17, 
    textAlign: 'center',
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
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  trong: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Activities;
