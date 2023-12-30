import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AuthProvider} from './screens/AuthContext'
import AppNavigator from './screens/AppNavigator'

export default function App() {
  return (
    <AuthProvider>
         <AppNavigator />
    </AuthProvider>
  );
}




