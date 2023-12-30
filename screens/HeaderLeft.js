import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
const HeaderLeft = () => {

    const navigation = useNavigation();
    const handlerDraw = () => {
        navigation.openDrawer();
    };
    return (
    <View style={styles.header}>
        <TouchableOpacity
            style={styles.header_btn}
            onPress={() => handlerDraw()}
        >
            <FontAwesome
                name='bars'
                size={30}
                style={styles.icon}
            />
        </TouchableOpacity>
    </View> 
    );
}

export default HeaderLeft

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header_btn: {
    width: 'auto',
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#000',
    fontWeight: '800',
  },
});

