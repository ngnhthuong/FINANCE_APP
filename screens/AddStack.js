import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import AddExpenses from './AddExpenses';
import AddIncome from './AddIncome';

const Stack = createStackNavigator();
const AddStack = ()  => {
  return (
    <Stack.Navigator>
         <Stack.Screen 
            name="AddExpenses" 
            component={AddExpenses} 
            options={{headerShown:false}}
        />
        <Stack.Screen 
            name="AddIncome" 
            component={AddIncome} 
            options={{headerShown:false}}
        />
    </Stack.Navigator>
  );
}
export default AddStack;