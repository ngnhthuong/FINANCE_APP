import React, { useState,  useContext  } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, ScrollView, Button } from 'react-native';
import IonIcon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Premium = ({navigation}) => {
   const onPressChangeViewHandle = () => {
    console.log('Pressed');
    navigation.navigate('VnPayWebView');
   }

return (

<ScrollView>
<View style = {styles.container}>
        <View style = {styles.header}>
            <Image source={require('../assets/crown.png')} />
            <Text style = {{fontSize: 25, fontWeight: 'bold', color: '#80489C'}}>Premium with MaMa</Text>
        </View>
        <View style = {styles.informationHeader}>
            <View style = {styles.information}>
                <IonIcon name="checkmark-outline" size={25} color="#5D9C59" />
                <Text style = {{fontSize: 20, fontWeight: '500', marginLeft: 10, color: '#C499F3'}}>No ads</Text>
            </View>
            <View style = {styles.information}>
                <IonIcon name="checkmark-outline" size={25} color="#5D9C59" />
                <Text style = {{fontSize: 20, fontWeight: '500', marginLeft: 10, color: '#C499F3'}}>Unlock chart year</Text>
            </View>
            <View style = {styles.information}>
                <IonIcon name="checkmark-outline" size={25} color="#5D9C59" />
                <Text style = {{fontSize: 20 , fontWeight: '500', marginLeft: 10, color: '#C499F3'}}>Unlimited storage data</Text>
            </View>
        </View>
        <View style = {styles.body}>
                  <TouchableOpacity onPress = {onPressChangeViewHandle}> 
                      <LinearGradient
                      colors={['#E26EE5', '#7E30E1']}  style={styles.priceBox} >
                          <View>
                              <IonIcon name="medal-outline" size={30} color="#fff" />
                          </View>
                          <View >
                              <Text style = {styles.text1}>12 Months</Text>
                              <Text style = {styles.text2}>BEST VALUE</Text>
                          </View>
                          <View>
                              <Text style = {styles.text1}>25.000 đ</Text>
                              <Text style = {styles.text2}>per month</Text>
                          </View>
                      </LinearGradient>
                  </TouchableOpacity>
 
                <LinearGradient
                    colors={['#FECDA6', '#F55050']}  style={styles.priceBox} >
                        <View>
                            <Feather name="heart" size={25} color="#fff" />
                        </View>
                        <View>
                            <Text style = {styles.text1}>6 Months</Text>
                            <Text style = {styles.text2}>MOST POPULAR</Text>
                        </View>
                        <View>
                            <Text style = {styles.text1}>40.000 đ</Text>
                            <Text style = {styles.text2}>per month</Text>
                        </View>
                </LinearGradient>
                <LinearGradient
                    colors={['#64CCC5', '#088395']}  style={styles.priceBox} >
                        <View>
                             <Feather name="smile" size={25} color="#fff" />
                        </View>
                        <View>
                            <Text style = {styles.text1}>1 Month</Text>
                            <Text style = {styles.text2}>OKAY</Text>
                        </View>
                        <View>
                            <Text style = {styles.text1}>55.000 đ</Text>
                            <Text style = {styles.text2}>per month</Text>
                        </View>
                </LinearGradient>
        </View>
        <View>
            <TouchableOpacity 
                style={styles.button} onPress={() => navigation.navigate('User')}
            >
                <Text style= {{color: '#7B8FA1', fontWeight: '700', marginBottom: 30}}>NOT NOW</Text>
            </TouchableOpacity>
        </View>
      <Text></Text>
    </View>
</ScrollView>

  );
};
const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
      },
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: 'auto',
      },
      header:{
        flex: 1,
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom: 20,
      },
      body: {
        flexDirection:'column',
        marginLeft: 20,
        marginRight: 20,
        color: '#FFFFFF',
      },
      priceBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:15,
        paddingLeft:25,
        paddingRight:20,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 35,
      },
      text1: {
        fontWeight:'bold',
        fontSize: 18,
        color: '#FFFFFF',
      },
      text2:{
        fontSize: 12,
        color: '#FFFFFF',
      },
      informationHeader:{
        flexDirection:'column',
        justifyContent:'flex-start',
        // alignItems:'center',
        marginLeft: 90,
        marginBottom: 20,
      },
      information:{
        flexDirection:'row',
        fontSize: 22,
        marginBottom: 10,
      },
      button:{
        justifyContent:'center',
        alignItems:'center',
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        height: 50,
        color: '#ECF2FF'
      },
});
export default Premium;