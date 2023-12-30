import User from './User'
import { createStackNavigator } from '@react-navigation/stack'
import ChangeMoney from './ChangeMoney';
import Premium from './Premium';
import VnPayWebView from './VnPayWebView';
import FailedPayment from './FailedPayment';
import SucessPayment from './SucessPayment';
const Stack = createStackNavigator()
const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={User}
      />
      <Stack.Screen
        name="ChangeMoney"
        component={ChangeMoney}
      />
      <Stack.Screen
        name="Premium"
        component={Premium}
      />
      <Stack.Screen
        name="VnPayWebView"
        component={VnPayWebView}
      />
      <Stack.Screen
        name="SucessPayment"
        component={SucessPayment}
      />
      <Stack.Screen
        name="FailedPayment"
        component={FailedPayment}
      />
    </Stack.Navigator>
  );
}
export default AccountStack;