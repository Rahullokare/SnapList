import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import AddLinkScreen from '../screens/AddLinkScreen';
import SearchScreen from '../screens/SearchScreen';
import CategoryViewScreen from '../screens/CategoryViewScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  HomeTab: undefined;
  Search: undefined;
  AddLink: undefined;
  Category: {category: string};
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'magnify' : 'magnify';
            } else if (route.name === 'AddLink') {
              iconName = focused ? 'plus-box' : 'plus-box-outline';
            }

            return (
              <MaterialCommunityIcons
                name={iconName || 'home'}
                size={size}
                color={color}
              />
            );
          },
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="AddLink" component={AddLinkScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Category"
        component={CategoryViewScreen}
        options={({route}) => ({
          headerTitle: route.params.category,
        })}
      />
    </Stack.Navigator>
  );
};
