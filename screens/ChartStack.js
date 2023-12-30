import { createStackNavigator } from '@react-navigation/stack'
import ChartYear from './ChartYear'
import ChartMonth from './ChartMonth';

const Stack = createStackNavigator()
const ChartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChartMonth"
        component={ChartMonth}
      />
      <Stack.Screen
        name="ChartYear"
        component={ChartYear}
      />
    </Stack.Navigator>
  );
}
export default  ChartStack;