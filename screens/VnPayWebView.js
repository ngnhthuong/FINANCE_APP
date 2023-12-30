import React, { useEffect, useContext } from 'react';
import { WebView } from 'react-native-webview';
import { Keyboard , TouchableWithoutFeedback, ScrollView} from 'react-native';
import {AuthContext} from './AuthContext';
import axios from 'axios';
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomNumberWithLength(length) {
  let randomNumber = '';
  for (let i = 0; i < length; i++) {
    const digit = getRandomInt(0, 9);
    randomNumber += digit;
  }
  return randomNumber;
}

const VnPayWebView = ({ navigation }) => {
  const {isPremium, setIsPremium, id,updateData, setUpdateData} = useContext(AuthContext);
  const randomOrderId = generateRandomNumberWithLength(10);
  const paymentUrl = `http://134.209.108.2:8888/order/create_payment_url?amount=300000&orderId=${randomOrderId}`;

  const handleNavigation = (event) => {
    const { url } = event;
    Keyboard.dismiss();
    if (url.includes('success=ok')) {
      axios.put(`http://134.209.108.2:3002/api/updateUser/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {console.log(response)
        setUpdateData(!updateData);
        navigation.navigate('SucessPayment');
        console.log('success')})
      .catch(error => console.log(error));
    } else if (url.includes('success=error')) {
      navigation.navigate('FailedPayment');
      console.log('error')
    }
  };

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
    <WebView
      source={{ uri: paymentUrl }}
      onNavigationStateChange={handleNavigation}
    />
    </ScrollView>
  );
};

export default VnPayWebView;