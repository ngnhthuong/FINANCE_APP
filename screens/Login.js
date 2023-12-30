import React, { useState, useContext} from 'react';
import { StatusBar } from 'react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from './AuthContext';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import { set } from 'date-fns';
const Login = () => {
  const { colors } = useTheme();

  const navigation = useNavigation();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const {id ,email , setEmail,password,setId, setPassword,isAuthenticated,setisAuthenticated, updateData, setUpdateData, setIsPremium, isPremium}= useContext(AuthContext);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleLogin = (email, password) => {
    if (!isValidEmail(email)) {
      Alert.alert('Warning', 'Please enter a valid email address.');
      return;
    }
  
    // if (email === '20522134@gm.uit.edu.vn' && password === 'huynhthibichtuyen') {
    //     setisAuthenticated(true);
    // } else {
    //     Alert.alert('Warning', 'incorrect email or password.');
    // };
    // nhập thonog tin đăng nhập -> gửi lên server -> database -> gửi về cho front end 
    // 1 sai mk, mail
    const request = {
      "email": email,
      "password": password
    }
        axios.post(`http://134.209.108.2:3002/api/login`,request, {
        headers: {
          'Content-Type': 'application/json',
        },}
    )
        .then(response => {
        let data = response.data.user;
        setEmail(data.email);
        setPassword(data.password);
        setId(data._id);
        setisAuthenticated(true);
        setUpdateData(!updateData);
        setIsValidPassword(!isValidPassword);
        setIsPremium(data.premium);
        })
        .catch(error => {
          setIsValidPassword(!isValidPassword);
          Alert.alert('Warning', 'incorrect email or password.');
        });
  };
  const handleOnPressSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#FDCEDF' barStyle="light-content"/>
       <LinearGradient
                    colors={['#FDCEDF', '#BEADFA']}
                    style={styles.header}
        >
          <Text style={styles.text_header}>Welcome!</Text>
        </LinearGradient>
      <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
      > 
         <Text style={[styles.text_footer, {
                color: colors.text
          }]}>Email
          </Text>
          <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                
            <TextInput
                    placeholder="Your email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    // secureTextEntry={!isEmailVisible}
            />
            <Animatable.View animation="bounceIn">
              {email.length > 10 && (
                  <Feather name="check-circle" color="green" size={20} />
                )}
              </Animatable.View>
        </View>
    
      <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
          <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
       <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        {isPasswordVisible ? (
          <Feather name="eye" color="grey" size={20} />
        ) : (
          <Feather name="eye-off" color="grey" size={20} />
        )}
      </TouchableOpacity>

      </View>

      <TouchableOpacity>
          <Text style={{color: '#009387', marginTop:30, marginLeft:250}}>Forgot password?</Text>
      </TouchableOpacity>
      
      <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => handleLogin(email, password)}
                >
                  <LinearGradient
                      colors={['#F875AA', '#BEADFA']}
                      style={styles.signIn}
                  >
                      <Text style={[styles.textSign, {
                          color:'#fff'
                      }]}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>

            </View>

            <Text style={styles.text}> Or login with</Text>

            <View style={styles.imageContainer}>
              <Image
                style={styles.imageLogo}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' }}
              />
              <Image
                style={styles.imageLogo}
                source={{ uri: 'https://logowik.com/content/uploads/images/gmail-new-icon5198.jpg' }}
              />
            </View>

            <View style={styles.signUpContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={handleOnPressSignup}>
                <Text style={styles.signUpText}>Sign up.</Text>
              </TouchableOpacity>
            </View>

      </Animatable.View>
  </View>

);
};

const styles = StyleSheet.create({ 

text: {
  alignSelf: 'center',
  marginTop: 20,
  fontSize: 20,
  fontWeight: 'bold',
},
imageContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
},
imageLogo: {
  width: 35,
  height: 35,
  borderRadius: 25,
  margin: 5,
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
    flex: 3,
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
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
},
textInput: {
    flex: 1,
    marginTop: -5,
    paddingLeft: 10,
    color: '#05375a',
},
errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
button: {
    alignItems: 'center',
    marginTop: 15
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
}
})
export default Login;


