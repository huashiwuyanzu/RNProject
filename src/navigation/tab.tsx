/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TaskListScreen from '../modules/tasks/screens/list';
import CreateTaskScreen from '../modules/tasks/screens/create';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          title: '任务列表',
          tabBarIcon: ({color, size}) => (
            <Icon name="list-outline" size={size} color={color} />
          ),
        }}
        name="tabList"
        component={TaskListScreen}
      />
      <Tab.Screen
        options={{
          title: '新建任务',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-person" size={size} color={color} />
          ),
        }}
        name="tabCreate"
        component={CreateTaskScreen}
      />
    </Tab.Navigator>
  );
}
