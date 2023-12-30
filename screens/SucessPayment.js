import React, {useContext} from 'react';
import { View, Image, StyleSheet, Text ,  Dimensions, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');

const SucessPayment = ({ navigation }) => {
  const onPressHandle = () => {
    navigation.navigate('User');
  }
  return (
  <View style = {styles.container}>
      <View>
          <Image source={require('../assets/sucess2.png')} style={[styles.image, { resizeMode: 'cover' }]}/>
      </View>
      <View>
          <TouchableOpacity onPress={onPressHandle} style= {styles.button}>
            <Text style = {{fontSize: 22, fontWeight: 'bold', color:'#fff'}}>Done</Text>
          </TouchableOpacity>
      </View>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    width: '50%', 
    height: 50,
    backgroundColor: '#EF4040',
    zIndex: 1,
    position: 'absolute',
    bottom: 60,
    right: 100,
    borderRadius: 50,
    fontSize: 20,

  },
});

export default SucessPayment;