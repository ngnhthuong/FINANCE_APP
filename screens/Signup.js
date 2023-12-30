import React, { useState,useContext } from 'react';
import { 
    View, 
    Image,
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from './AuthContext'
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Feather from 'react-native-vector-icons/Feather';
const Signup = () => {
  const navigation = useNavigation();
  const {id ,email , setEmail,password,setId, setPassword,isAuthenticated,setisAuthenticated, updateData, setUpdateData} = useContext(AuthContext);
  // const [username, setUsername] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const handleSignup = () => {
    if ( email === '' || password === '' || confirm === '') {
      Alert.alert('Warning', 'Please fill in all fields.');
    } else if (password !== confirm) {
      Alert.alert('Warning', 'Password and confirm password do not match.');
    } else if (password == confirm  && email !== '' && password !== '' && confirm !== '' ){
     
      const request = {
        email: email,
        password: password,
        confirmpassword: confirm
      }
      // 
      axios.post(`http://134.209.108.2:3002/api/register`,request, {
        headers: {
          'Content-Type': 'application/json',
        },}
    )
        .then(response => {
          Alert.alert('Created an account!')
          console.log('Dữ liệu nhận được sau khi gửi POST request:', response.data);

        })
        .catch(error => {
          // hien thi o day
          Alert.alert('Warning', 'incorrect.');
        });
        // 

    }

  };
  const handleOnPressLogin =() =>{
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#FDCEDF' barStyle="light-content"/>
      <LinearGradient
                    colors={['#FDCEDF', '#BEADFA']}
                    style={styles.header}
        >
            <Text style={styles.text_header}>Sign up now !</Text>
      </LinearGradient>
      <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
          <ScrollView>
          <View style={styles.actions}>
            <Text style={styles.text_footer}>Your email</Text>
            <View style={styles.action}>
                <Feather 
                    name="mail"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
            </View>
            </View>

            <View style={styles.actions}>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                />
                <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
            </View>
            </View>

            <View style={styles.actions}>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={confirm}
                    onChangeText={setConfirm}
              />
                <Feather 
                    name="eye"
                    color="grey"
                    size={20}
                />
            </View>
            </View>

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={handleSignup}
                >
                <LinearGradient
                    colors={['#F875AA', '#BEADFA']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={handleOnPressLogin}>
                <Text style={styles.signUpText}>Login now!</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </Animatable.View>     
    </View>
  );
};
export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#BEADFA'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: Platform.OS === 'ios' ? 3 : 5,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 0
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -5,
      paddingLeft: 10,
      color: '#05375a',
  },
  button: {
      alignItems: 'center',
      marginTop: 30
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20
  },
  color_textPrivate: {
      color: 'grey'
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  textI: {
    flex: 1,
    marginLeft: 10,
  },
  containerTextInput: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 5,
    flexDirection: 'row',
  },
  imageTextInput: {
    width: 27,
    height: 27,
    marginTop: 11,
    marginLeft: 12,
  },
  textLogin: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
  },

  signUpContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'center',
  },
  signUpText: {
    color: '#ED5AB3',
    fontWeight:'bold',
  },
});


