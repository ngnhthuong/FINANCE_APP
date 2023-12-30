
import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');

const splashImages = [
  require('../assets/3.png'),
  require('../assets/2.png'),
  require('../assets/1.png'),
];

const Welcome = ({navigation}) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = event => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(slideIndex);
  };

  const handleSlideChange = index => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: index * screenWidth, animated: true });
    }
  };

  const skipSplashScreen = () => {
    onSkip();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {splashImages.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[styles.image, { resizeMode: 'cover' }]}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {splashImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: currentIndex === index ? '#333' : '#ccc' },
            ]}
            onTouchEnd={() => handleSlideChange(index)}
          />
        ))}
      </View>

      <TouchableOpacity 
          onPress={()=>navigation.navigate('Login')}
      >
          <LinearGradient
                colors={['#F875AA', '#BEADFA']}
                style={styles.button}
          >
                <Text style = {styles.skipButton}>Skip</Text>
          </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  skipButton: {
  },
  button:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 0,
    width: '30%',
    height: 50,
    color: '#ECF2FF',
    zIndex: 1,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
  },
});

export default Welcome;
