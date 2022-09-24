import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Users from '../views/Users';
import BookmarkedUsers from '../views/BookmarkedUsers';
import Colors from '../constants/Colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Users') {
              iconName = focused ? 'users' : 'users';
            } else if (route.name === 'Selected') {
              iconName = focused ? 'user' : 'user';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.WHITE,
          tabBarInactiveTintColor: 'gray',
          tabBarAllowFontScaling: true,
          tabBarActiveBackgroundColor: Colors.HEADER_BACKGROUND,
          tabBarItemStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 10,
            paddingTop: 10,
          },
        })}>
        <Tab.Screen
          name="users"
          component={Users}
          options={({navigation, route}) => ({
            title: 'Users',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Colors.WHITE,
              fontFamily: 'Syne-Medium',
              fontStyle: 'normal',
            },
            headerStyle: {
              backgroundColor: Colors.HEADER_BACKGROUND,
              elevation: 0,
            },
          })}
        />
        <Tab.Screen
          name="Selected"
          component={BookmarkedUsers}
          options={({navigation, route}) => ({
            title: 'Selected Users',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Colors.WHITE,
              fontFamily: 'Syne-Medium',
              fontStyle: 'normal',
            },
            headerStyle: {
              backgroundColor: Colors.HEADER_BACKGROUND,
              elevation: 0,
            },
          })}
        />
      </Tab.Navigator>
      {/* <stack.Navigator>
        <stack.Screen
          name="users"
          component={Users}
          options={({navigation, route}) => ({
            title: 'Users',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Colors.WHITE,
              fontFamily: 'Syne-Medium',
              fontStyle: 'normal',
            },
            headerStyle: {
              backgroundColor: Colors.HEADER_BACKGROUND,
              elevation: 0,
            },
          })}
        />
        <stack.Screen
          name="BookmarkedUsers"
          component={BookmarkedUsers}
          options={({navigation, route}) => ({
            title: 'Selected Users',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Colors.WHITE,
              fontFamily: 'Syne-Medium',
              fontStyle: 'normal',
            },
            headerStyle: {
              backgroundColor: Colors.HEADER_BACKGROUND,
              elevation: 0,
            },
          })}
        />
      </stack.Navigator> */}
    </NavigationContainer>
  );
}
