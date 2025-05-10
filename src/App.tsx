import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/tab.tsx';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
