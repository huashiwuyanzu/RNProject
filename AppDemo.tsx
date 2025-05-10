import * as React from 'react';
import {View, Text} from 'react-native';
import {createStaticNavigation, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const VideoScreen = () => {
  return <Text>视频页面</Text>;
};
const ShoppingScreen = () => {
  return <Text>购物页面</Text>;
};

const MyTabs = createBottomTabNavigator({
  screens: {
    Video: VideoScreen,
    Shopping: ShoppingScreen,
  },
});

const HomeScreen = () => {
  const navigation = useNavigation();
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    console.log('HomeScreen mounted');
    return () => {
      console.log('HomeScreen unmounted');
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', e => {
      console.log('进入了', e.target, e.data.closing);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={() => setCount(count + 1)}>{count}</Button>
      <Button onPress={() => navigation.navigate('Setting')}>
        Go to Setting
      </Button>
      <Button onPress={() => navigation.navigate('Detail')}>
        Go to Detail
      </Button>
    </View>
  );
};
const SettingScreen = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', e => {
      console.log('进入了', e.target);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Setting Screen</Text>
      <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
      <Button onPress={() => navigation.navigate('Detail')}>
        Go to Detail
      </Button>
      <Button onPress={() => navigation.goBack()}>Back</Button>
    </View>
  );
};
const DetailScreen = ({route}) => {
  const navigation = useNavigation();
  // 获取路由参数
  console.log(route.params?.itemId, route.params?.itemName);
  // 携带参数的跳转
  const toOtherDetailScreen = () => {
    navigation.push('Detail', {
      itemId: 86,
      itemName: 'another item',
    });
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Setting Screen</Text>
      <Button onPress={() => navigation.goBack()}>Back</Button>
      <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
      <Button onPress={() => toOtherDetailScreen()}>Go to Detail Again</Button>
    </View>
  );
};

const RootStack = createNativeStackNavigator({
  // 应用首页
  initialRouteName: 'Home',
  // 通用配置
  screenOptions: {
    headerStyle: {backgroundColor: 'tomato'},
  },
  // 屏幕配置
  screens: {
    Home: {screen: HomeScreen, options: {title: 'Home页'}},
    Setting: {screen: SettingScreen, options: {title: '设置页'}},
    Detail: {
      screen: DetailScreen,
      options: {title: '详情页'},
      initialParams: {itemId: NaN, itemName: ''}, // 初始参数
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
