import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Setting Screen"
        onPress={() => navigation.navigate('SettingScreen')}
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function SettingScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is a Setting Screen (No TabBar Space!)</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{title: 'Home'}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{title: 'Profile'}}
        name="Profile"
        component={ProfileScreen}
      />
      {/* 不在这里添加 HiddenPage！ */}
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{headerShown: false}} // 隐藏 Stack 的头部
        />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
