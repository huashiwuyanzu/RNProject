import {View} from 'react-native';
import React from 'react';
import {
  useLinkBuilder,
  useTheme,
  createStaticNavigation,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {Text, PlatformPressable, Button} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/**
    // 其他配置：https://reactnavigation.org/docs/bottom-tab-navigator#props
 * RN里面是不是没有DOM的？
 */

const HomeScreen = () => {
  React.useEffect(() => {
    console.log('HomeScreen mounted');
    return () => console.log('HomeScreen unmounted');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('HomeScreen FOCUSED');
      return () => console.log('HomeScreen BLURRED');
    }, []),
  );
  const [count, setCount] = React.useState(0);

  const navigation = useNavigation();
  return (
    <View style={{paddingTop: 100}}>
      <Text>HomeScreen</Text>
      <Button onPressIn={() => setCount(count + 1)}>{count}</Button>
      <Button onPressIn={() => navigation.navigate('HiddenScreen')}>
        Go to HiddenScreen
      </Button>
    </View>
  );
};

const ProfileScreen = () => {
  React.useEffect(() => {
    console.log('ProfileScreen mounted');
    return () => console.log('ProfileScreen unmounted');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log('ProfileScreen FOCUSED');
      return () => console.log('ProfileScreen BLURRED');
    }, []),
  );
  const isFocused = useIsFocused();

  return (
    <View style={{paddingTop: 100}}>
      <Text>ProfileScreen</Text>
      <Text>聚焦状态: {isFocused ? '已聚焦' : '未聚焦'}</Text>
    </View>
  );
};

const SettingsScreen = () => {
  React.useEffect(() => {
    console.log('SettingsScreen mounted');
    return () => console.log('SettingsScreen unmounted');
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      console.log('SettingsScreen FOCUSED');
      return () => console.log('SettingsScreen BLURRED');
    }, []),
  );
  return (
    <View style={{paddingTop: 100}}>
      <Text>SettingsScreen</Text>
    </View>
  );
};

const HiddenScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is a Hidden Page!</Text>
    </View>
  );
};

/**
 *
 * 请注意， 你不能在 tabBar 中使用 useNavigation 钩子，因为 useNavigation 仅在屏幕内可用。
 */

function MyTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.title;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={{flex: 1}}
            key={route.key}>
            <View style={{height: 100}}>
              <Text style={{color: isFocused ? colors.primary : colors.text}}>
                {label}
              </Text>
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const MyTabs = createBottomTabNavigator({
  tabBar: props => <MyTabBar {...props} />,
  detachInactiveScreens: true,
  screens: {

    Home: {
      screen: HomeScreen,
      options: {title: 'Home页'},
    },
    Profile: {
      screen: ProfileScreen,
      options: {title: 'Profile页'},
    },
    Settings: {
      screen: SettingsScreen,
      options: {title: 'Settings页'},
    },
    HiddenScreen: {
      screen: HiddenScreen,
      options: {
        tabBarButton: () => null,
        tabBarStyle: { display: 'none' }, // 彻底移除占位空间
      },
    },
  },
});
const AppNavigator = createStaticNavigation(MyTabs);

export default function TabRouteDemo() {
  return <AppNavigator />;
}
