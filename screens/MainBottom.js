import React from 'react';
import IonIcon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home';
import ChartStack from './ChartStack';
import AccountStack from './AccountStack';
import AddStack from './AddStack';

const Bottom = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  return (
    <IonIcon name={name} size={25} color={focused ? "#4390f7" : "#000"} />
  );
};

const homeScreenOptions = (headerShown, name, iconName) => {
  return {
    headerShown,
    tabBarLabel: name,
    tabBarIcon: ({ focused }) => <TabIcon name={iconName} focused={focused} />,
  };
};

const MainBottom = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name="Home" component={Home} options={homeScreenOptions(false, "Home", "home-outline")} />
      <Bottom.Screen name="Chart" component={ChartStack} options={homeScreenOptions(false, "Chart", "cellular-outline")} />
      <Bottom.Screen name="Add" component={AddStack} options={homeScreenOptions(false, "Add", "add-circle-outline")} />
      <Bottom.Screen name="Account" component={AccountStack} options={homeScreenOptions(false, "Account", "person-outline")} />
    </Bottom.Navigator>
  );
};

export default MainBottom;
